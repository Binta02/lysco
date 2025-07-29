import { supabase } from "@/integrations/supabase/client";
import serviceData from "@/src/data/data";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

const ProductDescription = () => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();

  // Fonction pour charger les avis
  // const fetchReviews = async () => {
  //   try {
  //     setIsLoading(true);
  //     if (!productId) return;

  //     const { data, error } = await supabase
  //       .from("reviews")
  //       .select("*")
  //       .eq("product_id", productId)
  //       .order("created_at", { ascending: false });

  //     if (error) throw error;

  //     const formattedReviews = await Promise.all(
  //       data.map(async (review: any) => {
  //         let userName = "Client";

  //         if (review.user_id) {
  //           const { data: profileData } = await supabase
  //             .from("profiles_public")
  //             .select("first_name, last_name")
  //             .eq("id", review.user_id)
  //             .single();

  //           if (profileData) {
  //             const firstName = profileData.first_name || "";
  //             const lastName = profileData.last_name || "";
  //             if (firstName || lastName) {
  //               userName = `${firstName} ${lastName}`.trim();
  //             }
  //           }
  //         }

  //         return { ...review, user_name: userName };
  //       })
  //     );

  //     setReviews(formattedReviews);
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Erreur",
  //       text2: "Impossible de charger les avis",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    const path = (route as any).name;
    const idParam = (route.params as any)?.id;

    let finalId = "";
    let finalName = "";

    if (idParam && serviceData[idParam]) {
      // Si on passe par les params (comme avec serviceData)
      finalId = idParam;
      finalName = serviceData[idParam]?.title ?? "Nom inconnu";
    } else if (path) {
      // Sinon, on tente de déduire par le nom de la route
      if (path.includes("3-mois-entreprise")) {
        finalName = "Domiciliation 3 mois – Entreprise";
        finalId = "domiciliation-3mois-entreprise";
      } else if (path.includes("3-mois-micro-entreprise")) {
        finalName = "Domiciliation 3 mois – Micro Entreprise";
        finalId = "domiciliation-3mois-micro";
      } else if (path.includes("6-mois-entreprise")) {
        finalName = "Domiciliation 6 mois – Entreprise";
        finalId = "domiciliation-6mois-entreprise";
      } else if (path.includes("6-mois-micro-entreprise")) {
        finalName = "Domiciliation 6 mois – Micro Entreprise";
        finalId = "domiciliation-6mois-micro";
      } else if (path.includes("1-an-entreprise")) {
        finalName = "Domiciliation 1 an – Entreprise";
        finalId = "domiciliation-1an-entreprise";
      } else {
        finalId = path;
        finalName = path
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l: any) => l.toUpperCase());
      }
    }

    setProductId(finalId);
    setProductName(finalName);

    if (finalId) {
      fetchReviews(finalId); // <-- passe le productId en paramètre
    }
  }, [route]);

  const fetchReviews = async (id: string) => {
    try {
      setIsLoading(true);
      setReviews([]);

      if (!id) {
        console.warn("⚠️ Aucun productId fourni !");
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .ilike("product_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Erreur lors de la récupération des avis :", error);
        throw error;
      }
      const formattedReviews = await Promise.all(
        data.map(async (review) => {
          let userName = "Client";

          if (review.user_id) {
            const { data: profileData, error: profileError } = await supabase
              .from("profiles_public")
              .select("first_name, last_name")
              .eq("id", review.user_id)
              .single();

            if (profileError) {
              console.warn("⚠️ Erreur profil :", profileError);
            }

            if (profileData) {
              const firstName = profileData.first_name || "";
              const lastName = profileData.last_name || "";
              userName = `${firstName} ${lastName}`.trim() || "Client";
            }
          }

          return { ...review, user_name: userName };
        })
      );

      setReviews(formattedReviews);
    } catch (error) {
      console.error("💥 Erreur fetchReviews :", error);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Impossible de charger les avis",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    return new Promise<void>((resolve) => {
      Alert.alert(
        "Confirmer la suppression",
        "Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible.",
        [
          { text: "Annuler", style: "cancel", onPress: () => resolve() },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: async () => {
              await confirmDeleteReview(reviewId);
              resolve();
            },
          },
        ]
      );
    });
  };

  const confirmDeleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", currentUserId ?? "");

      if (error) throw error;

      Toast.show({
        type: "success",
        text1: "Avis supprimé",
        text2: "Votre avis a été supprimé avec succès",
      });

      fetchReviews(productId);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Impossible de supprimer l'avis",
      });
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setCurrentUserId(data.session?.user?.id || null);
    };

    checkAuthStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setCurrentUserId(session?.user?.id || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleReviewSubmitted = () => {
    fetchReviews(productId);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Avis ({reviews.length})</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#06b6d4" />
      ) : (
        <ReviewsList
          reviews={reviews}
          isLoading={isLoading}
          currentUserId={currentUserId}
          onDeleteReview={handleDeleteReview}
        />
      )}

      {isLoggedIn ? (
        <View style={styles.reviewFormContainer}>
          <ReviewForm
            productName={productName}
            productId={productId}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </View>
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>
            Vous devez être connecté pour laisser un avis.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  reviewFormContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
  },
  loginPrompt: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
    alignItems: "center",
  },
  loginText: {
    color: "#6b7280",
    marginBottom: 8,
  },
  loginButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ProductDescription;
