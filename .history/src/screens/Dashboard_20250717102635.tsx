// Dashboard.tsx
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import type { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [stripeSubscriptions, setStripeSubscriptions] = useState<any[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<any[]>([]);

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
              navigation.navigate("Login");
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
          navigation.navigate("Login");
          return;
        }
      } catch (error) {
        navigation.navigate("login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigation.navigate("Login");
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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">
          Une erreur est survenue lors du chargement de vos données
        </p>
        <Button onClick={() => navigate("/login")}>
          Retourner à l'accueil
        </Button>
      </div>
    );
  }

  if (isEditingProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <ProfileEditForm
            profile={profile}
            onUpdate={updateProfile}
            onCancel={() => setIsEditingProfile(false)}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">
            Bienvenue sur votre espace personnel Lys&Co,{" "}
            {profile?.first_name || profile?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Profil utilisateur */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center">
                <User className="mr-2 h-5 w-5 text-lysco-turquoise" />
                Mon Profil
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(true)}
              >
                Modifier mon profil
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
                    <p className="font-medium">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
                    <p className="font-medium">
                      {profile?.company_name || "Non renseigné"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">
                      {profile?.phone || "Non renseigné"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="border-t pt-4">
              <div className="mt-6">
                <h3 className="text-red-600 font-semibold mb-2">
                  Suppression de compte
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Cette action est irréversible. Toutes vos données seront
                  supprimées.
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Supprimer définitivement mon compte
                </Button>
              </div>
            </CardContent>
          </Card>

          {isAdmin ? (
            <AdminDashboard />
          ) : (
            <>
              {/* Mes documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-lysco-turquoise" />
                    Mes documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingDocuments ? (
                    <p>Chargement des documents…</p>
                  ) : documents.length === 0 ? (
                    <p>Aucun document disponible.</p>
                  ) : (
                    <ul className="space-y-4">
                      {documents.map((doc) => (
                        <li
                          key={doc.id}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row
                                     justify-between items-start sm:items-center shadow-sm"
                        >
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">
                              {doc.file_name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(doc.uploaded_at).toLocaleDateString(
                                "fr-FR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                            >
                              Télécharger
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Mes réservations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-lysco-turquoise" />
                    Mes réservations de salles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingReservations ? (
                    <div>Chargement…</div>
                  ) : reservations.length === 0 ? (
                    <div>Aucune réservation trouvée.</div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {reservations.map((res) => (
                        <div
                          key={res.id}
                          className="border rounded-xl p-4 shadow-sm bg-white"
                        >
                          <p className="mb-1">
                            Date : {formatDate(res.reservation_date)}
                          </p>
                          <p className="mb-1">
                            Heure :{" "}
                            {res.start_time
                              ? `${res.start_time} - ${res.end_time}`
                              : "Journée/Demi-journée"}
                          </p>
                          <p className="mb-1">
                            Type :{" "}
                            {humanizeReservationType(res.reservation_type)}
                          </p>
                          <div className="mb-1 flex items-center gap-2">
                            <span>Statut :</span>
                            {getStatusBadge(res.status)}
                          </div>
                          <div className="flex flex-col gap-2 w-max">
                            {res.status !== "cancelled" &&
                              canCancel(
                                res.reservation_date,
                                res.start_time
                              ) && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleCancelReservation(
                                      res.id,
                                      res.payment_intent_id,
                                      profile?.email,
                                      res.reservation_date,
                                      res.reservation_type
                                    )
                                  }
                                >
                                  Annuler
                                </Button>
                              )}
                            {res.status !== "cancelled" &&
                              !canCancel(
                                res.reservation_date,
                                res.start_time
                              ) && (
                                <span className="text-xs text-gray-500">
                                  Annulation impossible (moins de 48h)
                                </span>
                              )}
                            <Button
                              onClick={async () => {
                                setCalendarError(null);
                                try {
                                  console.log(
                                    "=== 🕵️ Début bouton calendrier ==="
                                  );

                                  const rawPeriod = res.period;
                                  console.log("rawPeriod:", rawPeriod);

                                  const [startStr, endStr] = rawPeriod
                                    .replace(/^\[|\)$|\"/g, "")
                                    .split(",");
                                  console.log("startStr brut:", startStr);
                                  console.log("endStr brut:", endStr);

                                  const safeStartStr = startStr
                                    .trim()
                                    .replace(" ", "T")
                                    .replace("+00", "Z");
                                  const safeEndStr = endStr
                                    .trim()
                                    .replace(" ", "T")
                                    .replace("+00", "Z");

                                  const startDate = new Date(safeStartStr);
                                  const endDate = new Date(safeEndStr);

                                  if (
                                    isNaN(startDate.getTime()) ||
                                    isNaN(endDate.getTime())
                                  ) {
                                    throw new Error(
                                      "La date de réservation est invalide"
                                    );
                                  }
                                  if (startDate >= endDate) {
                                    throw new Error(
                                      "La date de fin doit être postérieure au début"
                                    );
                                  }

                                  console.log("✅ Dates sans décalage :");
                                  console.log(
                                    "Start UTC:",
                                    startDate.toISOString()
                                  );
                                  console.log(
                                    "End UTC:",
                                    endDate.toISOString()
                                  );

                                  await addToCalendar({
                                    title: `Réservation ${humanizeReservationType(
                                      res.reservation_type
                                    )}`,
                                    startDate, // directement les Date en UTC, sans modifier
                                    endDate,
                                    location: "Lys&Co",
                                    notes: `Type: ${res.reservation_type}`,
                                    alarm: true,
                                  });

                                  toast({
                                    title: "✅ Ajouté au calendrier",
                                    description:
                                      "La réservation a été enregistrée dans votre calendrier",
                                  });
                                } catch (error) {
                                  console.error("💥 ERREUR CATCH:", error);
                                  let errorMessage =
                                    "Une erreur inattendue est survenue";
                                  if (error instanceof Error) {
                                    errorMessage = error.message;
                                    if (
                                      error.message.includes(
                                        "must be JavaScript Date Objects"
                                      )
                                    ) {
                                      errorMessage =
                                        "Format de date incompatible avec le calendrier";
                                    }
                                  }
                                  setCalendarError(errorMessage);
                                  toast({
                                    title: "❌ Erreur d'ajout au calendrier",
                                    description: errorMessage,
                                    variant: "destructive",
                                  });
                                }
                              }}
                              disabled={!res.reservation_date}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Ajouter au calendrier
                            </Button>
                          </div>
                          {calendarError && (
                            <div style={{ color: "red", marginTop: "8px" }}>
                              {calendarError}
                            </div>
                          )}
                          <div>
                            Cordova détecté :{" "}
                            {String(!!(window as any).cordova)}
                          </div>
                          <div>
                            Plugin calendar :{" "}
                            {String(!!(window as any).plugins?.calendar)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Abonnements Stripe */}
              {stripeSubscriptions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                      <List className="w-5 h-5 text-lysco-turquoise" />
                      Mes abonnements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {stripeSubscriptions.map((sub) => (
                        <div
                          key={sub.id}
                          className="border rounded-xl p-4 shadow-sm bg-white"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <span>Statut :</span>
                            {getStatusBadge(sub.status)}
                          </div>
                          <p className="mb-1">
                            Début : {formatDate(sub.start_date * 1000)}
                          </p>
                          {sub.cancel_at && (
                            <p className="mb-1">
                              Fin prévue : {formatDate(sub.cancel_at * 1000)}
                            </p>
                          )}
                          {sub.items?.data?.length > 0 &&
                            sub.items.data.map((item) => (
                              <p key={item.id} className="mb-1">
                                Produit :{" "}
                                <span className="font-medium">
                                  {item.product_name || "Nom inconnu"}
                                </span>
                              </p>
                            ))}
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4" onClick={handleOpenStripePortal}>
                      Gérer mes abonnements
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Factures Stripe */}
              {stripeInvoices.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-lysco-turquoise" />
                      Mes factures d'abonnement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {stripeInvoices.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="border rounded-xl p-4 shadow-sm bg-white"
                        >
                          <p className="mb-1">
                            Montant payé :{" "}
                            <strong>
                              {(invoice.amount_paid / 100).toFixed(2)} €
                            </strong>
                          </p>
                          <p className="mb-1">
                            🗓 Date : {formatDate(invoice.created * 1000)}
                          </p>
                          {invoice.lines?.data?.length > 0 &&
                            invoice.lines.data.map((line) => (
                              <p key={line.id} className="mb-1">
                                🏷 Produit :{" "}
                                <span className="font-medium">
                                  {line.product_name || "Nom inconnu"}
                                </span>
                              </p>
                            ))}
                          <a
                            href={invoice.invoice_pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Télécharger la facture
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
