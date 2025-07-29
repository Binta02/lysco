// Dashboard.tsx
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/src/components/ui/button";
import { useUserData } from "@/src/hooks/useUserData";
import type { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [setProfile] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [stripeSubscriptions, setStripeSubscriptions] = useState<any[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<any[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const {
    profile,
    loading: userDataLoading,
    error,
    updateProfile,
  } = useUserData();

  // Charger le profil utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erreur récupération profil:", error.message);
      } else {
        setProfile(data);
        setIsAdmin(data?.is_admin ?? false);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Charger les documents
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!profile?.id || isAdmin) return;
      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", profile.id)
        .order("uploaded_at", { ascending: false });

      if (error) {
        console.error("Erreur chargement documents:", error);
      } else {
        setDocuments(data || []);
      }
    };

    fetchDocuments();
  }, [profile, isAdmin]);

  // Charger les réservations
  useEffect(() => {
    const fetchReservations = async () => {
      if (!profile?.id) return;
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", profile.id)
        .order("reservation_date", { ascending: false });

      if (error) {
        console.error("Erreur chargement reservations:", error);
      } else {
        setReservations(data || []);
      }
    };

    fetchReservations();
  }, [profile]);

  // Supprimer le compte
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment désactiver votre compte ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: async () => {
            if (!profile?.id || !profile?.email) return;

            try {
              const res = await fetch(
                "https://mon-backend-node.vercel.app/api/disable-account",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: profile.id,
                    email: profile.email,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    frontendUrl: process.env.EXPO_PUBLIC_APP_URL,
                  }),
                }
              );

              if (!res.ok) {
                Alert.alert("Erreur", "Problème lors de la désactivation.");
                return;
              }

              Alert.alert("Succès", "Votre compte a été désactivé.");
              await supabase.auth.signOut();
              navigation.navigate("Login", { redirect: "Dashboard" });
            } catch (err) {
              console.error(err);
              Alert.alert("Erreur", "Impossible de contacter le serveur.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00bcd4" />
      </View>
    );
  }

  const canCancel = (reservationDate: string, startTime: string) => {
    const dateTime = new Date(`${reservationDate}T${startTime || "09:00:00"}`);
    const now = new Date();
    const diff = dateTime.getTime() - now.getTime();
    return diff > 48 * 60 * 60 * 1000; // 48h en ms
  };

  const handleCancelReservation = async (
    id: string,
    paymentIntentId?: string,
    userEmail?: string,
    reservationDate?: string,
    reservationType?: string
  ) => {
    if (!window.confirm("Confirmer l'annulation de cette réservation ?")) {
      return;
    }

    // Partie remboursement Stripe + envoi mails
    if (paymentIntentId && userEmail) {
      try {
        const res = await fetch(
          "https://mon-backend-node.vercel.app/api/refund-stripe-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntentId,
              userEmail,
              reservationDate,
              reservationType,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok || !data.success) {
          Alert.alert(
            "Erreur",
            "Le remboursement ou l'envoi de mails a échoué."
          );
          return;
        }
      } catch (err) {
        Alert.alert(
          "Erreur",
          "Erreur lors du remboursement ou de l'envoi de mails."
        );

        return;
      }
    }

    // Suppression en base de données
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) {
      Alert.alert("Erreur", "Impossible de supprimer la réservation.");

      return;
    }

    setReservations((prev) => prev.filter((r) => r.id !== id));
    Alert.alert("Succès", "Réservation annulée et remboursée.");
  };

  // Vérifier la session utilisateur et rediriger si nécessaire
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          Alert.alert(
            "Accès non autorisé",
            "Veuillez vous connecter pour accéder."
          );
          navigation.navigate("Login", { redirect: "Dashboard" });
          return;
        }
      } catch (error) {
        navigation.navigate("Login", { redirect: "Dashboard" });
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigation.navigate("Login", { redirect: "Dashboard" });
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigation]);

  // Récupérer les abonnements et factures Stripe
  useEffect(() => {
    if (!profile?.id) return;
    const fetchStripeData = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", profile.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "❌ Erreur Supabase lors de la récupération du profil :",
          profileError
        );
        return;
      }

      if (!profileData?.stripe_customer_id) {
        return;
      }

      try {
        const res = await fetch(
          "https://mon-backend-node.vercel.app/api/get-stripe-data",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              stripeCustomerId: profileData.stripe_customer_id,
            }),
          }
        );
        const stripeData = await res.json();
        setStripeSubscriptions(stripeData.subscriptions || []);
        setStripeInvoices(stripeData.invoices || []);
      } catch (error) {
        console.error("❌ Erreur lors de l'appel à Stripe :", error);
      }
    };

    fetchStripeData();
  }, [profile]);

  const handleOpenStripePortal = async () => {
    if (!profile?.id) return;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", profile.id)
      .maybeSingle();

    if (profileError) {
      console.error("Erreur lors de la récupération du profil :", profileError);
      return;
    }
    if (!profileData?.stripe_customer_id) return;

    try {
      const res = await fetch(
        "https://mon-backend-node.vercel.app/api/create-stripe-portal-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stripeCustomerId: profileData.stripe_customer_id,
          }),
        }
      );
      const data = await res.json();
      if (!data.url) {
        Alert.alert("Erreur", "Impossible d'obtenir l'URL du portail Stripe.");

        return;
      }
      window.location.href = data.url;
    } catch (error) {
      alert("Une erreur est survenue avec le portail client.");
    }
  };

  const formatDate = (dateInput: string | number): string => {
    try {
      const date = new Date(dateInput);
      return format(date, "dd/MM/yyyy", { locale: fr });
    } catch {
      return String(dateInput);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Text
            style={{
              backgroundColor: "green",
              color: "white",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 4,
              overflow: "hidden",
              fontSize: 12,
            }}
          >
            Actif
          </Text>
        );
      case "option":
        return (
          <Text
            style={{
              backgroundColor: "orange",
              color: "white",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 4,
              overflow: "hidden",
              fontSize: 12,
            }}
          >
            En option
          </Text>
        );
      case "pending":
        return (
          <Text
            style={{
              backgroundColor: "blue",
              color: "white",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 4,
              overflow: "hidden",
              fontSize: 12,
            }}
          >
            En attente
          </Text>
        );
      default:
        return (
          <Text
            style={{
              backgroundColor: "gray",
              color: "white",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 4,
              overflow: "hidden",
              fontSize: 12,
            }}
          >
            {status}
          </Text>
        );
    }
  };

  if (loading || userDataLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00bcd4" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex flex-col items-center justify-center h-screen">
        <Text className="text-red-500 text-xl mb-4">
          Une erreur est survenue lors du chargement de vos données
        </Text>
        <Button
          onPress={() =>
            navigation.navigate("Login", { redirect: "Dashboard" })
          }
        >
          Retourner à l'accueil
        </Button>
      </View>
    );
  }

  if (isEditingProfile) {
    return (
      <View className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <TextrofileEditForm
            profile={profile}
            onUpdate={updateProfile}
            onCancel={() => setIsEditingProfile(false)}
          />
        </main>
        <Footer />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tableau de bord</Text>
      <Text style={styles.subtitle}>
        Bienvenue sur votre espace personnel Lys&Co,{" "}
        {profile?.first_name || profile?.email}
      </Text>

      {/* Mon Profil */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mon Profil</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile?.email}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Entreprise</Text>
            <Text style={styles.value}>
              {profile?.company_name || "Non renseigné"}
            </Text>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>
              {profile?.phone || "Non renseigné"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => setIsEditingProfile(true)}
        >
          <Text style={styles.buttonOutlineText}>Modifier mon profil</Text>
        </TouchableOpacity>

        <Text style={styles.dangerTitle}>Suppression de compte</Text>
        <Text style={styles.smallText}>
          Cette action est irréversible. Toutes vos données seront supprimées.
        </Text>
        <TouchableOpacity
          style={styles.buttonDanger}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>
            Supprimer définitivement mon compte
          </Text>
        </TouchableOpacity>
      </View>

      {/* Documents */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mes documents</Text>
        {loadingDocuments ? (
          <ActivityIndicator />
        ) : documents.length === 0 ? (
          <Text>Aucun document disponible.</Text>
        ) : (
          documents.map((doc) => (
            <View key={doc.id} style={styles.item}>
              <Text>{doc.file_name}</Text>
              <Text>{new Date(doc.uploaded_at).toLocaleDateString()}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(doc.file_url)}>
                <Text style={styles.link}>Télécharger</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Réservations */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mes réservations de salles</Text>
        {loadingReservations ? (
          <ActivityIndicator />
        ) : reservations.length === 0 ? (
          <Text>Aucune réservation trouvée.</Text>
        ) : (
          reservations.map((res) => (
            <View key={res.id} style={styles.item}>
              <Text>Date: {formatDate(res.reservation_date)}</Text>
              <Text>
                Heure:{" "}
                {res.start_time
                  ? `${res.start_time} - ${res.end_time}`
                  : "Journée/Demi-journée"}
              </Text>
              <Text>Type: {humanizeReservationType(res.reservation_type)}</Text>
              <Text>Statut: {getStatusBadge(res.status)}</Text>
              {res.status !== "cancelled" &&
                canCancel(res.reservation_date, res.start_time) && (
                  <TouchableOpacity
                    style={styles.buttonDanger}
                    onPress={() =>
                      handleCancelReservation(
                        res.id,
                        res.payment_intent_id,
                        profile?.email,
                        res.reservation_date,
                        res.reservation_type
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                )}
            </View>
          ))
        )}
      </View>

      {/* Abonnements Stripe */}
      {stripeSubscriptions.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mes abonnements</Text>
          {stripeSubscriptions.map((sub) => (
            <View key={sub.id} style={styles.item}>
              <Text>Statut: {getStatusBadge(sub.status)}</Text>
              <Text>Début: {formatDate(sub.start_date * 1000)}</Text>
              {sub.cancel_at && (
                <Text>Fin prévue: {formatDate(sub.cancel_at * 1000)}</Text>
              )}
              {sub.items?.data?.map((item) => (
                <Text key={item.id}>
                  Produit: {item.product_name || "Nom inconnu"}
                </Text>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleOpenStripePortal}
          >
            <Text style={styles.buttonText}>Gérer mes abonnements</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Factures Stripe */}
      {stripeInvoices.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mes factures d'abonnement</Text>
          {stripeInvoices.map((invoice) => (
            <View key={invoice.id} style={styles.item}>
              <Text>
                Montant payé: {(invoice.amount_paid / 100).toFixed(2)} €
              </Text>
              <Text>Date: {formatDate(invoice.created * 1000)}</Text>
              {invoice.lines?.data?.map((line) => (
                <Text key={line.id}>
                  Produit: {line.product_name || "Nom inconnu"}
                </Text>
              ))}
              <TouchableOpacity
                onPress={() => Linking.openURL(invoice.invoice_pdf)}
              >
                <Text style={styles.link}>Télécharger la facture</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  column: { flex: 1 },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 16, fontWeight: "500", marginBottom: 8 },
  buttonPrimary: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonOutline: {
    borderColor: "#4f46e5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonDanger: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  buttonOutlineText: {
    color: "#4f46e5",
    textAlign: "center",
    fontWeight: "bold",
  },
  item: { marginBottom: 12 },
  link: { color: "#2563eb", textDecorationLine: "underline" },
  dangerTitle: { color: "#dc2626", fontWeight: "bold", marginTop: 12 },
  smallText: { fontSize: 12, color: "#666", marginBottom: 8 },
});

export default DashboardScreen;
