import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Session } from "@supabase/supabase-js";

import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ProfileEditForm from "../../src/components/dashboard/ProfileEditForm";
import Footer from "../../src/components/Footer";
import { Button } from "../../src/components/ui/button";
import { useUserData } from "../../src/hooks/useUserData";
import { supabase } from "../../src/integrations/supabase/client";
import type { RootStackParamList } from "../../src/navigation/types";
import { humanizeReservationType } from "../../src/utils/humanize";
import AdminDashboard from "./AdminDashboard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [stripeSubscriptions, setStripeSubscriptions] = useState<any[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<any[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(true);
  // const [session, setSession] = useState<Session | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  // const session = useSession();
  // const [session, setSession] = useState<any>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  const {
    profile,
    loading: userDataLoading,
    error: userDataError,
    updateProfile,
  } = useUserData(session);

  // Chargement initial (documents + réservations)
  const loadInitialData = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // console.log("👤 Profil récupéré :", profileData);

      if (profileError) throw profileError;

      setIsAdmin(profileData?.is_admin ?? false);

      await Promise.all([loadDocuments(userId), loadReservations(userId)]);
    } catch (error) {
      console.error("Error loading initial data:", error);
      throw error;
    }
  };

  const loadDocuments = async (userId: string) => {
    if (isAdmin) return;

    setLoadingDocuments(true);
    try {
      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", userId)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const loadReservations = async (userId: string) => {
    setLoadingReservations(true);
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", userId)
        .order("reservation_date", { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } finally {
      setLoadingReservations(false);
    }
  };

  // // Vérification de la session et chargement initial
  // useEffect(() => {
  //   const checkAndLoadData = async () => {
  //     try {
  //       if (!session) {
  //         router.push("/(app)/Login?redirect=Dashboard");
  //         return;
  //       }

  //       await loadInitialData(session.user.id);
  //     } catch (error) {
  //       console.error("Initial load error:", error);
  //       router.push("/(app)/Login?redirect=Dashboard");
  //     } finally {
  //       setInitialLoadComplete(true);
  //     }
  //   };

  //   checkAndLoadData();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event) => {
  //     if (event === "SIGNED_OUT") {
  //       router.push("/(app)/Login?redirect=Dashboard");
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [navigation, session]);

  // // Session listener
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // Vérification de la session et chargement initial
  useEffect(() => {
    const checkAndLoadData = async () => {
      if (!sessionChecked) return; // ⛔️ Attendre que la session soit vérifiée

      try {
        if (!session) {
          router.push("/(app)/Login?redirect=Dashboard");
          return;
        }

        await loadInitialData(session.user.id);
      } catch (error) {
        console.error("Initial load error:", error);
        router.push("/(app)/Login?redirect=Dashboard");
      } finally {
        setInitialLoadComplete(true);
      }
    };

    checkAndLoadData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.push("/(app)/Login?redirect=Dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [sessionChecked, session]);

  // Récupération initiale de la session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionChecked(true); // ✅ Session bien vérifiée
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 🎯 Stripe uniquement déclenché par profile
  // useEffect(() => {
  //   const fetchStripeData = async () => {
  //     if (!profile?.id) return;

  //     const { data: profileData, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("stripe_customer_id")
  //       .eq("id", profile.id)
  //       .maybeSingle();

  //     if (profileError) {
  //       console.error(
  //         "❌ Erreur Supabase lors de la récupération du profil :",
  //         profileError
  //       );
  //       return;
  //     }

  //     if (!profileData?.stripe_customer_id) {
  //       console.warn("⚠️ Aucun stripe_customer_id trouvé");
  //       return;
  //     }

  //     try {
  //       const res = await fetch(
  //         "https://mon-backend-node.vercel.app/api/get-stripe-data",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             stripeCustomerId: profileData.stripe_customer_id,
  //           }),
  //         }
  //       );
  //       const stripeData = await res.json();
  //       // console.log("📦 Données Stripe reçues :", stripeData);
  //       setStripeSubscriptions(stripeData.subscriptions || []);
  //       setStripeInvoices(stripeData.invoices || []);
  //     } catch (error) {
  //       console.error("❌ Erreur lors de l'appel à Stripe :", error);
  //     }
  //   };

  //   fetchStripeData();
  // }, [profile]);

  useEffect(() => {
    console.log(
      "📌 useEffect Stripe déclenché avec profile?.id =",
      profile?.id
    );

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
        console.warn("⚠️ Aucun stripe_customer_id trouvé");
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
  }, [profile?.id]);

  type Profile = {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };

  const handleDeleteAccount = useCallback(() => {
    if (!profile || !profile.id || !profile.email) {
      // console.log("❌ [handleDeleteAccount] Profil incomplet ou null");
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Impossible de récupérer votre profil.",
      });
      return;
    }

    setShowConfirmModal(true);
  }, [profile]);

  const confirmDeleteAccount = async (profile: any) => {
    try {
      const payload = {
        id: profile.id,
        email: profile.email,
        first_name: profile.first_name || undefined,
        last_name: profile.last_name || undefined,
        frontendUrl: process.env.EXPO_PUBLIC_APP_URL || undefined,
        // frontendUrl: window.location.origin, // 🔥 c’est ici
      };
      const res = await fetch(
        "https://mon-backend-node.vercel.app/api/disable-account",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to disable account");

      await supabase.auth.signOut();

      Toast.show({
        type: "success",
        text1: "Compte désactivé",
        text2: "Vous avez été déconnecté.",
      });

      router.push("/(app)/Login?redirect=Dashboard");
    } catch (err) {
      console.error("❗ Erreur dans confirmDeleteAccount :", err);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Une erreur est survenue pendant la suppression.",
      });
    }
  };

  const canCancel = useCallback(
    (reservationDate: string, startTime: string) => {
      const dateTime = new Date(
        `${reservationDate}T${startTime || "09:00:00"}`
      );
      const now = new Date();
      const diff = dateTime.getTime() - now.getTime();
      return diff > 48 * 60 * 60 * 1000; // 48h en ms
    },
    []
  );

  const handleCancelReservation = useCallback(
    async (
      id: string,
      paymentIntentId?: string,
      userEmail?: string,
      reservationDate?: string,
      reservationType?: string
    ) => {
      Alert.alert(
        "Confirmation",
        "Voulez-vous vraiment annuler cette réservation ?",
        [
          { text: "Non", style: "cancel" },
          {
            text: "Oui",
            onPress: async () => {
              try {
                // Partie remboursement Stripe
                if (paymentIntentId && userEmail) {
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

                  if (!res.ok) {
                    throw new Error("Refund failed");
                  }
                }

                // Suppression en base
                const { error } = await supabase
                  .from("reservations")
                  .delete()
                  .eq("id", id);

                if (error) throw error;

                setReservations((prev) => prev.filter((r) => r.id !== id));
                Alert.alert("Succès", "Réservation annulée");
              } catch (error) {
                console.error("Cancel error:", error);
                Alert.alert("Erreur", "Une erreur est survenue");
              }
            },
          },
        ]
      );
    },
    []
  );

  const handleOpenStripePortal = useCallback(async () => {
    if (!profile?.id) return;

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", profile.id)
        .single();

      if (profileError || !profileData?.stripe_customer_id) {
        throw new Error("No Stripe customer ID");
      }

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
        throw new Error("No portal URL");
      }

      await Linking.openURL(data.url);
    } catch (error) {
      console.error("Stripe portal error:", error);
      Alert.alert("Erreur", "Impossible d'ouvrir le portail Stripe");
    }
  }, [profile]);

  const formatDate = useCallback((dateInput: string | number): string => {
    try {
      const date = new Date(dateInput);
      return format(date, "dd/MM/yyyy", { locale: fr });
    } catch {
      return String(dateInput);
    }
  }, []);

  const getStatusBadge = useCallback((status: string) => {
    const statusStyles = {
      active: { backgroundColor: "green", text: "Actif" },
      option: { backgroundColor: "orange", text: "En option" },
      pending: { backgroundColor: "blue", text: "En attente" },
      default: { backgroundColor: "gray", text: status },
    };

    const style =
      statusStyles[status as keyof typeof statusStyles] || statusStyles.default;

    return (
      <Text
        style={{
          backgroundColor: style.backgroundColor,
          color: "white",
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 4,
          overflow: "hidden",
          fontSize: 12,
        }}
      >
        {style.text}
      </Text>
    );
  }, []);

  if (!initialLoadComplete || userDataLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#5cb9bc" />
      </SafeAreaView>
    );
  }

  if (userDataError) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "red", fontSize: 18, marginBottom: 20 }}>
          Une erreur est survenue lors du chargement de vos données
        </Text>
        <Button onPress={() => router.push("/(app)/Login?redirect=Dashboard")}>
          Retourner à l'accueil
        </Button>
      </SafeAreaView>
    );
  }

  if (isEditingProfile) {
    return (
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView
          style={styles.container1}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <ProfileEditForm
            profile={
              profile
                ? {
                    first_name: profile.first_name || "",
                    last_name: profile.last_name || "",
                    company_name: profile.company_name || "",
                    phone: profile.phone || "",
                  }
                : null
            }
            onUpdate={updateProfile}
            onCancel={() => setIsEditingProfile(false)}
          />
          <Footer />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView
        style={styles.container1}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View style={{ padding: 16 }}>
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
              Cette action est irréversible. Toutes vos données seront
              supprimées.
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
          {isAdmin && (
            <View style={{ marginTop: 32 }}>
              <AdminDashboard />
            </View>
          )}
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
                  <TouchableOpacity
                    onPress={() => Linking.openURL(doc.file_url)}
                  >
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
                  <Text>
                    Type: {humanizeReservationType(res.reservation_type)}
                  </Text>
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
                  {sub.items?.data?.map((item: any) => (
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
                  {invoice.lines?.data?.map((line: any) => (
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
        </View>

        <Footer />
      </ScrollView>
      {showConfirmModal && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Confirmation
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Voulez-vous vraiment désactiver votre compte ?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ padding: 10, marginRight: 10 }}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={{ color: "#4f46e5" }}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setShowConfirmModal(false);
                  confirmDeleteAccount(profile);
                }}
              >
                <Text style={{ color: "#dc2626" }}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  buttonPrimary: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  buttonOutline: {
    borderColor: "#4f46e5",
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  buttonDanger: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonOutlineText: {
    color: "#4f46e5",
    fontWeight: "bold",
  },
  item: {
    marginBottom: 12,
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
  dangerTitle: {
    color: "#dc2626",
    fontWeight: "bold",
    marginTop: 12,
  },
  smallText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 9999,
  },
  menuContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  menuCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  menuCloseIcon: {
    fontSize: 28,
    color: "#333",
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  menuAuthSection: {
    marginTop: 30,
  },
  menuButton: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
  },
  menuButtonText: {
    fontWeight: "bold",
  },
});

export default Dashboard;
