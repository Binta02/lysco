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

export function useUserData() {
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

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      // Fetch user profile from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError) throw profileError;

      setProfile({
        id: profileData?.id || session.user.id,
        email: session.user.email || "",
        first_name: profileData?.first_name || "",
        last_name: profileData?.last_name || "",
        company_name: profileData?.company_name || "",
        phone: profileData?.phone || "",
        created_at: profileData?.created_at || session.user.created_at,
      });

      // Récupérer les informations de domiciliation depuis Supabase
      const { data: domiciliationData, error: domiciliationError } =
        await supabase
          .from("user_domiciliations")
          .select("*")
          .eq("user_id", session.user.id)
          .maybeSingle();

      if (domiciliationError && domiciliationError.code !== "PGRST116") {
        // Si c'est une erreur autre que "No rows found"
        console.error(
          "Erreur lors de la récupération des informations de domiciliation:",
          domiciliationError
        );
      }

      // Si un enregistrement de domiciliation est trouvé, utilisez-le
      if (domiciliationData) {
        // Assurons-nous que le statut correspond aux valeurs attendues
        const typedStatus = domiciliationData.status as
          | "active"
          | "inactive"
          | "pending";

        setDomiciliation({
          id: domiciliationData.id,
          user_id: domiciliationData.user_id,
          status: typedStatus,
          address: domiciliationData.address ?? "", // fallback à string vide
          renewal_date: domiciliationData.renewal_date ?? "", // fallback à string vide
          plan_type: domiciliationData.plan_type ?? "", // fallback à string vide
          duration: domiciliationData.duration ?? "", // fallback à string vide
          created_at: domiciliationData.created_at ?? "", // fallback à string vide
        });
      } else {
        // Sinon, utilisez des valeurs par défaut
        // console.log('Aucune information de domiciliation trouvée, utilisation des valeurs par défaut');
        setDomiciliation({
          user_id: session.user.id,
          status: "pending",
          address: "En attente de validation",
          renewal_date: new Date().toISOString(),
        });
      }

      // Récupérer les services de l'utilisateur depuis Supabase
      const { data: servicesData, error: servicesError } = await supabase
        .from("user_services")
        .select("*")
        .eq("user_id", session.user.id);

      if (servicesError) {
        console.error(
          "Erreur lors de la récupération des services:",
          servicesError
        );
      }

      // Si des services sont trouvés, utilisez-les
      if (servicesData && servicesData.length > 0) {
        setUserServices(
          servicesData.map((service) => ({
            id: service.id,
            user_id: service.user_id,
            name: service.name,
            // Assurons-nous que le statut correspond aux valeurs attendues
            status: service.status as
              | "active"
              | "inactive"
              | "pending"
              | "option",
            price: service.price || undefined,
            renewal_date: service.renewal_date ?? undefined,
            // Assurons-nous que la catégorie correspond aux valeurs attendues
            category: service.category as
              | "domiciliation"
              | "admin"
              | "marketing"
              | "complementary",
            created_at: service.created_at,
            updated_at: service.updated_at,
          }))
        );
      } else {
        // Loggez que nous n'avons pas trouvé de services
        // console.log("Aucun service trouvé pour cet utilisateur");
        setUserServices([]);
      }

      // Pour les fonctionnalités qui ne sont pas encore implémentées dans la base de données,
      // nous utilisons des données temporaires
      setMails([
        {
          id: "1",
          user_id: session.user.id,
          subject: "Impôts - Déclaration TVA",
          received_at: new Date().toISOString(),
          status: "new",
        },
        {
          id: "2",
          user_id: session.user.id,
          subject: "Facture Électricité",
          received_at: new Date(Date.now() - 86400000).toISOString(),
          status: "new",
        },
        {
          id: "3",
          user_id: session.user.id,
          subject: "Contrat Fournisseur",
          received_at: new Date(Date.now() - 172800000).toISOString(),
          status: "new",
        },
      ]);

      setNotifications([
        {
          id: "1",
          user_id: session.user.id,
          message: "Nouveau courrier reçu",
          created_at: new Date().toISOString(),
          read: false,
        },
        {
          id: "2",
          user_id: session.user.id,
          message: "Document numérisé disponible",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          read: false,
        },
      ]);

      setActivities([
        {
          id: "1",
          user_id: session.user.id,
          type: "mail",
          title: "Nouveau courrier reçu",
          description: "Impôts - Déclaration TVA",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          user_id: session.user.id,
          type: "document",
          title: "Document numérisé",
          description: "Contrat_Prestation_2025.pdf",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          user_id: session.user.id,
          type: "message",
          title: "Message de votre assistant",
          description: "Mise à jour de vos documents légaux",
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ]);

      setDocuments([
        {
          id: "1",
          user_id: session.user.id,
          name: "Facture_Mars2025.pdf",
          created_at: "2025-04-01T10:00:00Z",
          type: "Comptabilité",
        },
        {
          id: "2",
          user_id: session.user.id,
          name: "PV_AG_2025.pdf",
          created_at: "2025-03-15T14:30:00Z",
          type: "Juridique",
        },
      ]);

      // Filtrer les services administratifs depuis les userServices
      const adminServicesList = userServices
        .filter((service) => service.category === "admin")
        .map((service) => ({
          id: service.id,
          user_id: service.user_id,
          service: service.name,
          next_processing:
            service.renewal_date ||
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: service.status as "pending" | "active" | "completed",
        }));

      setAdminServices(
        adminServicesList.length > 0
          ? adminServicesList
          : [
              {
                id: "1",
                user_id: session.user.id,
                service: "Déclaration TVA",
                next_processing: "2025-05-05T00:00:00Z",
                status: "pending",
              },
              {
                id: "2",
                user_id: session.user.id,
                service: "Gestion comptable",
                next_processing: "2025-04-30T00:00:00Z",
                status: "active",
              },
              {
                id: "3",
                user_id: session.user.id,
                service: "Secrétariat juridique",
                next_processing: "2025-05-15T00:00:00Z",
                status: "active",
              },
            ]
      );
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Erreur", "Impossible de récupérer les données utilisateur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to update user profile
  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      if (!profile?.id) {
        throw new Error("L'ID du profil est manquant.");
      }

      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", profile.id);

      if (error) throw error;

      // Refresh data
      Alert.alert("Succès", "Votre profil a été mis à jour");

      await fetchUserData();
      return true;
    } catch (err: any) {
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
