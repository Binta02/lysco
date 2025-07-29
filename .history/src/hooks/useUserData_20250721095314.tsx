// src/hooks/useUserData.tsx

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) {
        console.log("❌ Pas de session fournie au hook");
        setLoading(false);
        return;
      }

      console.log("✅ Session reçue dans useUserData :", session);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProfile({
          id: data.id,
          email: data.email || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          created_at: data.created_at || "",
          company_name: data.company_name || "",
          phone: data.phone || "",
          deleted_at: data.deleted_at,
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, [session]);

  return { profile, loading, error };

  async function ensureProfileExists(session: any) {
    console.log("🔍 Vérification du profil pour user_id :", session.user.id);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      console.error(
        "❗ Erreur lors de la récupération du profil :",
        profileError
      );
      throw profileError;
    }

    if (!profileData) {
      console.log("⚠ Aucun profil trouvé, création d'une nouvelle entrée");

      const { error: insertError } = await supabase.from("profiles").insert({
        id: session.user.id,
        email: session.user.email || "",
        first_name: "",
        last_name: "",
        company_name: "",
        phone: "",
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error("❗ Erreur lors de la création du profil :", insertError);
        throw insertError;
      }

      console.log("✅ Profil créé avec succès");
    } else {
      console.log("✅ Profil déjà existant :", profileData);
    }
  }

  // src/hooks/useUserData.tsx
  import { supabase } from "@/integrations/supabase/client";
  import { useEffect, useState } from "react";

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

  export function useUserData(session: any) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [domiciliation, setDomiciliation] =
      useState<UserDomiciliation | null>(null);
    const [userServices, setUserServices] = useState<UserService[]>([]);
    const [mails, setMails] = useState<UserMail[]>([]);
    const [notifications, setNotifications] = useState<UserNotification[]>([]);
    const [activities, setActivities] = useState<UserActivity[]>([]);
    const [documents, setDocuments] = useState<UserDocument[]>([]);
    const [adminServices, setAdminServices] = useState<UserAdminService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUserData = async () => {
        if (!session) {
          console.log("❌ Pas de session fournie au hook");
          setLoading(false);
          return;
        }

        console.log("✅ Session reçue dans useUserData :", session);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setProfile({
            id: data.id,
            email: data.email || "",
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            created_at: data.created_at || "",
            company_name: data.company_name || "",
            phone: data.phone || "",
            deleted_at: data.deleted_at,
          });
        }
        setLoading(false);
      };

      fetchUserData();
    }, [session]);

    return { profile, loading, error };
  }

  async function ensureProfileExists(session: any) {
    console.log("🔍 Vérification du profil pour user_id :", session.user.id);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      console.error(
        "❗ Erreur lors de la récupération du profil :",
        profileError
      );
      throw profileError;
    }

    if (!profileData) {
      console.log("⚠ Aucun profil trouvé, création d'une nouvelle entrée");

      const { error: insertError } = await supabase.from("profiles").insert({
        id: session.user.id,
        email: session.user.email || "",
        first_name: "",
        last_name: "",
        company_name: "",
        phone: "",
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error("❗ Erreur lors de la création du profil :", insertError);
        throw insertError;
      }

      console.log("✅ Profil créé avec succès");
    } else {
      console.log("✅ Profil déjà existant :", profileData);
    }
  }
}
