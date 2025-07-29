// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, User, ShoppingCart, List, FileText } from "lucide-react";
import { humanizeReservationType } from "@/utils/humanize";
import AdminDashboard from "./AdminDashboard";
import { configureNotifications, updateBadge } from "@/utils/notifications";
import { addToCalendar } from "@/utils/calendar";
import { toZonedTime } from "date-fns-tz";

const setBadge = (count: number) => {
  document.addEventListener("deviceready", () => {
    const badgePlugin = window.cordova?.plugins?.notification?.badge;
    if (!badgePlugin) {
      console.warn("Badge plugin not loaded.");
      return;
    }

    badgePlugin.requestPermission(() => {
      badgePlugin.set(count);
    });
  });
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [stripeSubscriptions, setStripeSubscriptions] = useState<any[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const {
    profile,
    loading: userDataLoading,
    updateProfile,
    error,
  } = useUserData();

  const [reservations, setReservations] = useState<any[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erreur récupération profil:", error.message);
        setIsAdmin(false);
      } else {
        setIsAdmin(data?.is_admin ?? false);
      }
    };

    fetchProfile();
  }, []);

  // Récupérer les documents envoyés à l'utilisateur (widget "Mes documents")
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!profile?.id || isAdmin) {
        // Si pas connecté ou si admin, on ne charge pas ici
        return;
      }
      setLoadingDocuments(true);

      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", profile.id)
        .order("uploaded_at", { ascending: false });

      if (error) {
        console.error("Erreur chargement documents utilisateur :", error);
      } else {
        setDocuments(data || []);
      }
      setLoadingDocuments(false);
    };

    fetchDocuments();
  }, [profile, isAdmin]);

  // Récupérer les réservations de l'utilisateur
  useEffect(() => {
    const fetchReservations = async () => {
      if (!profile?.id) {
        return;
      }
      setLoadingReservations(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", profile.id)
        .order("reservation_date", { ascending: false });

      if (error) {
        console.error("❌ Erreur lors du fetch reservations :", error);
      }
      setReservations(data || []);
      setLoadingReservations(false);
    };
    fetchReservations();
  }, [profile]);

  useEffect(() => {
    if (profile?.deleted_at) {
      navigate("/reactiver-mon-compte");
    }
  }, [profile]);

  // useEffect(() => {
  //   if (documents.length > 0) {
  //     setBadge(documents.length);
  //   } else {
  //     // Si aucun document : réinitialiser le badge
  //     const badgePlugin = window.cordova?.plugins?.notification?.badge;
  //     if (badgePlugin) {
  //       badgePlugin.clear();
  //     }
  //   }
  // }, [documents]);

  // useEffect(() => {
  //   requestNotificationPermission();

  //   if (!loadingReservations && reservations.length > 0) {
  //     reservations.forEach((res) => {
  //       if (res.status === "confirmed") {
  //         notifyReservationConfirmed(
  //           humanizeReservationType(res.reservation_type),
  //           formatDate(res.reservation_date)
  //         );

  //         if (res.start_time) {
  //           scheduleReminderNotification(
  //             humanizeReservationType(res.reservation_type),
  //             res.reservation_date,
  //             res.start_time
  //           );
  //         }
  //       }
  //     });
  //   }
  // }, [loadingReservations, reservations]);

  useEffect(() => {
    configureNotifications();

    if (documents.length > 0) {
      updateBadge(documents.length);
    } else {
      updateBadge(0);
    }
  }, [documents]);
  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "⚠️ Voulez-vous vraiment supprimer votre compte ? Il sera désactivé pendant 30 jours."
    );

    if (!confirm) {
      console.log("❌ Annulation de l'utilisateur.");
      return;
    }

    if (!profile?.id || !profile?.email) {
      console.log("❌ Données utilisateur manquantes :", profile);
      return;
    }
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
            frontendUrl: window.location.origin, // 🔥 c’est ici
          }),
        }
      );
      if (!res.ok) {
        console.error("❌ Erreur API :", await res.text());
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la désactivation.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Compte désactivé",
        description: "Un e-mail de confirmation vous a été envoyé.",
      });

      // ✅ Déconnexion
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("❌ Erreur de déconnexion :", error.message);
      }

      navigate("/login");
    } catch (error) {
      console.error("❌ Erreur réseau :", error);
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    }
  };

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
          toast({
            title: "Erreur",
            description: "Le remboursement ou l'envoi de mails a échoué.",
            variant: "destructive",
          });
          return;
        }
      } catch (err) {
        toast({
          title: "Erreur",
          description: "Erreur lors du remboursement ou de l'envoi de mails.",
          variant: "destructive",
        });
        return;
      }
    }

    // Suppression en base de données
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réservation en base.",
        variant: "destructive",
      });
      return;
    }

    setReservations((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Réservation annulée et remboursée" });
  };

  // Vérifier la session utilisateur et rediriger si nécessaire
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          toast({
            title: "Accès non autorisé",
            description:
              "Veuillez vous connecter pour accéder à votre tableau de bord",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

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
        toast({
          title: "Erreur",
          description: "Impossible d'obtenir l'URL du portail Stripe.",
          variant: "destructive",
        });
        return;
      }
      window.location.href = data.url;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue avec le portail client.",
        variant: "destructive",
      });
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
        return <Badge className="bg-green-500">Actif</Badge>;
      case "option":
        return <Badge className="bg-amber-500">En option</Badge>;
      case "pending":
        return <Badge className="bg-blue-500">En attente</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
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
