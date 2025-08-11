// src/hooks/useUserData.tsx
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  company_name?: string;
  phone?: string;
  deleted_at?: string | null; // Date when the user was deleted, if applicable
  stripe_customer_id?: string; // ✅ Ajoute cette ligne
}

export interface UserDomiciliation {
  id?: string;
  user_id?: string;
  status: "active" | "inactive" | "pending";
  address: string;
  renewal_date: string;
  created_at?: string;
  plan_type?: string; // Type de plan: 'société', 'auto-entrepreneur', 'association'
  duration?: string; // '1 mois', '3 mois', '6 mois', '1 an'
}

export interface UserService {
  id: string;
  user_id?: string;
  name: string;
  status: "active" | "inactive" | "pending" | "option";
  price?: number;
  renewal_date?: string;
  category: "domiciliation" | "admin" | "marketing" | "complementary";
  created_at?: string;
  updated_at?: string;
}

export interface UserMail {
  id: string;
  user_id?: string;
  subject: string;
  received_at: string;
  status: "new" | "read";
}

export interface UserNotification {
  id: string;
  user_id?: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface UserActivity {
  id: string;
  user_id?: string;
  type: "mail" | "document" | "message";
  title: string;
  description: string;
  created_at: string;
}

export interface UserDocument {
  id: string;
  user_id?: string;
  name: string;
  created_at: string;
  type: string;
}

export interface UserAdminService {
  id: string;
  user_id?: string;
  service: string;
  next_processing: string;
  status: "pending" | "active" | "completed";
}

export function useUserData(session: any) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [domiciliation, setDomiciliation] = useState<UserDomiciliation | null>(
    null
  );
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [mails, setMails] = useState<UserMail[]>([]);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [adminServices, setAdminServices] = useState<UserAdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     console.log("🚀 [fetchUserData] Démarrage");
  //     if (!session) {
  //       console.log("❌ [fetchUserData] Pas de session fournie au hook");
  //       setLoading(false);
  //       return;
  //     }

  //     console.log("✅ [fetchUserData] Session reçue :", session);
  //     console.log("🔍 session.user.id avant requête:", session?.user?.id);

  //     try {
  //       const { data, error } = await supabase
  //         .from("profiles")
  //         .select("*")
  //         .eq("id", session.user.id)
  //         .limit(1)
  //         .maybeSingle();
  //       console.log("🔍 session.user.id avant requête:", session?.user?.id);

  //       if (error) {
  //         console.error("❌ [fetchUserData] Erreur Supabase :", error);
  //         setError(error.message);
  //       } else {
  //         console.log("✅ [fetchUserData] Profil récupéré :", data);
  //         if (!data) {
  //           console.warn(
  //             "⚠️ Aucun profil trouvé pour l’utilisateur :",
  //             session.user.id
  //           );
  //           setProfile(null);
  //         } else {
  //           setProfile({
  //             id: data.id,
  //             email: data.email || "",
  //             first_name: data.first_name || "",
  //             last_name: data.last_name || "",
  //             created_at: data.created_at || "",
  //             company_name: data.company_name || "",
  //             phone: data.phone || "",
  //             deleted_at: data.deleted_at,
  //           });
  //         }
  //       }
  //     } catch (err) {
  //       console.error("❗ [fetchUserData] Exception attrapée :", err);
  //       setError(String(err));
  //     } finally {
  //       setLoading(false);
  //       console.log("🏁 [fetchUserData] Fin de chargement");
  //     }
  //   };

  //   fetchUserData();
  // }, [session]);

  async function ensureProfileExists(session: any) {
    console.log("🟡 [ensureProfileExists] START");
    console.log("🔑 session.user.id:", session?.user?.id);
    console.log("📧 session.user.email:", session?.user?.email);

    try {
      // 1️⃣ On s’assure que le client porte bien la session active
      if (session?.access_token && session?.refresh_token) {
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
        console.log("✅ Session Supabase réhydratée dans le client");
      } else {
        console.warn("⚠️ Pas de access_token/refresh_token dispo dans session");
      }

      console.log("➡️ Vérification si profil existe...");
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      console.log("✅ Résultat SELECT:", profileData);
      console.log("❌ Erreur SELECT:", profileError);

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      if (!profileData) {
        console.log("⚠️ Aucun profil trouvé, préparation INSERT");
        const newProfile = {
          id: session.user.id,
          email: session.user.email || "",
          first_name: "",
          last_name: "",
          company_name: "",
          phone: "",
          created_at: new Date().toISOString(),
        };

        console.log("📦 Données à insérer:", newProfile);

        const { data: insertData, error: insertError } = await supabase
          .from("profiles")
          .insert(newProfile)
          .select();

        console.log("📥 Résultat INSERT:", insertData);
        console.log("❌ Erreur INSERT:", insertError);

        if (insertError) {
          console.error("❗ insertError.message:", insertError.message);
          throw insertError;
        }

        console.log("✅ Profil inséré avec succès:", insertData);
      } else {
        console.log("✅ Profil déjà existant, rien à faire");
      }
    } catch (err) {
      console.error("💥 Exception attrapée dans ensureProfileExists:", err);
      throw err;
    }

    console.log("🎉 [ensureProfileExists] FIN");
  }

  const fetchUserData = async () => {
    console.log("🟡 [fetchUserData] START");
    setLoading(true);
    setError(null);

    try {
      if (!session) {
        console.log("❌ Pas de session active !");
        setLoading(false);
        return;
      }

      console.log("✅ Session reçue:", session);

      await ensureProfileExists(session);

      console.log("➡️ Lecture du profil depuis Supabase...");
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      console.log("✅ Résultat SELECT profil:", profileData);
      console.log("❌ Erreur SELECT profil:", profileError);

      if (profileError) throw profileError;
      if (!profileData) {
        console.warn("⚠ Aucun profil trouvé pour user:", session.user.id);
        return;
      }

      setProfile({
        id: profileData.id,
        email: profileData.email || "",
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        company_name: profileData.company_name || "",
        phone: profileData.phone || "",
        created_at: profileData.created_at || "",
      });
      console.log("✅ Profil mis à jour dans state");

      // Ajoute ici des console.log sur tous les fetch suivants si tu veux !
    } catch (err: any) {
      console.error("💥 Exception attrapée dans fetchUserData:", err);
      setError(err.message);
      Alert.alert("Erreur", "Impossible de récupérer les données utilisateur");
    } finally {
      setLoading(false);
      console.log("🏁 [fetchUserData] FIN");
    }
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  // Function to update user profile
  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    console.log(
      "🛠️ [updateProfile] Tentative de mise à jour :",
      updatedProfile
    );
    try {
      if (!profile?.id) {
        console.log("❌ [updateProfile] profile.id est null");
        throw new Error("L'ID du profil est manquant.");
      }

      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", profile.id);

      if (error) {
        console.error("❌ [updateProfile] Erreur Supabase :", error);
        throw error;
      }

      console.log("✅ [updateProfile] Profil mis à jour avec succès");
      await fetchUserData();
      return true;
    } catch (err) {
      console.error("❗ [updateProfile] Exception attrapée :", err);
      Alert.alert("Erreur", "Impossible de mettre à jour le profil");
      return false;
    }
  };

  // Function to update domiciliation information
  const updateDomiciliation = async (
    updatedDomiciliation: Partial<UserDomiciliation>
  ) => {
    try {
      if (domiciliation?.id) {
        // Mise à jour d'une domiciliation existante
        const { error } = await supabase
          .from("user_domiciliations")
          .update({
            ...updatedDomiciliation,
            updated_at: new Date().toISOString(),
          })
          .eq("id", domiciliation.id);

        if (error) throw error;
      } else {
        if (!profile?.id) {
          throw new Error(
            "profile.id est requis pour insérer une domiciliation"
          );
        }
        // Création d'une nouvelle domiciliation
        const { error } = await supabase.from("user_domiciliations").insert({
          ...updatedDomiciliation,
          address: updatedDomiciliation.address || "En attente de validation",
          user_id: profile?.id,
        });

        if (error) throw error;
      }

      Alert.alert("Succès", "Domiciliation mise à jour avec succès");

      await fetchUserData();
      return true;
    } catch (err: any) {
      Alert.alert("Erreur", "Impossible de mettre à jour la domiciliation");
      return false;
    }
  };

  // Add or update a user service
  const updateUserService = async (service: Partial<UserService>) => {
    try {
      if (service.id) {
        // Mise à jour d'un service existant
        const { error } = await supabase
          .from("user_services")
          .update({
            ...service,
            updated_at: new Date().toISOString(),
          })
          .eq("id", service.id);

        if (error) throw error;
      } else {
        if (!profile?.id) {
          throw new Error("profile.id est requis pour insérer une service");
        }
        // Création d'un nouveau service
        const { error } = await supabase.from("user_services").insert({
          name: service.name || "",
          category: service.category || "domiciliation",
          status: service.status || "active",
          user_id: profile?.id,
        });

        if (error) throw error;
      }

      Alert.alert("Succès", "Service mis à jour avec succès");

      await fetchUserData();
      return true;
    } catch (err: any) {
      Alert.alert(
        "Erreur",
        err.message || "Impossible de mettre à jour le service"
      );
      return false;
    }
  };

  // Function to mark mail as read
  const markMailAsRead = async (mailId: string) => {
    try {
      // In a production app, we would update the mail in Supabase
      // For now, we'll just update the state
      setMails((prev) =>
        prev.map((mail) =>
          mail.id === mailId ? { ...mail, status: "read" } : mail
        )
      );

      return true;
    } catch (err: any) {
      Alert.alert("Erreur", "Impossible de marquer le courrier comme lu");
      return false;
    }
  };

  // Function to mark notification as read
  const markNotificationAsRead = async (notificationId: string) => {
    try {
      // In a production app, we would update the notification in Supabase
      // For now, we'll just update the state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );

      return true;
    } catch (err: any) {
      Alert.alert("Erreur", "Impossible de marquer la notification comme lue");
      // Alternatively, you could
      return false;
    }
  };

  return {
    profile,
    domiciliation,
    userServices,
    mails,
    notifications,
    activities,
    documents,
    adminServices,
    loading,
    error,
    updateProfile,
    updateDomiciliation,
    updateUserService,
    markMailAsRead,
    markNotificationAsRead,
    refreshUserData: fetchUserData,
  };
}
