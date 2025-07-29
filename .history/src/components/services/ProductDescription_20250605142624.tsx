import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProductDescription = () => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const location = useLocation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  // Fonction pour déterminer le nom et l'ID du produit en fonction de l'URL
  const determineProductInfo = () => {
    const path = location.pathname;
    let name = "";
    let id = "";

    if (path.includes("/domiciliation/3-mois-entreprise")) {
      name = "Domiciliation 3 mois – Entreprise";
      id = "domiciliation-3mois-entreprise";
    } else if (path.includes("/domiciliation/3-mois-micro-entreprise")) {
      name = "Domiciliation 3 mois – Micro Entreprise";
      id = "domiciliation-3mois-micro";
    } else if (path.includes("/domiciliation/6-mois-entreprise")) {
      name = "Domiciliation 6 mois – Entreprise";
      id = "domiciliation-6mois-entreprise";
    } else if (path.includes("/domiciliation/6-mois-micro-entreprise")) {
      name = "Domiciliation 6 mois – Micro Entreprise";
      id = "domiciliation-6mois-micro";
    } else if (path.includes("/domiciliation/1-an-entreprise")) {
      name = "Domiciliation 1 an – Entreprise";
      id = "domiciliation-1an-entreprise";
    } else if (path.includes("/domiciliation/pack-domicilie")) {
      name = "Pack domicilié";
      id = "pack-domicilie";
    } else {
      // Fallback pour les autres pages
      const pathParts = path.split("/");
      const lastPart = pathParts[pathParts.length - 1];
      name = lastPart
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      id = lastPart;
    }

    return { name, id };
  };

  // Fonction pour charger les avis
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const { name, id } = determineProductInfo();

      if (!id) return;

      // First, fetch reviews without joining profiles
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Then for each review, fetch the profile separately if needed
      const formattedReviews = await Promise.all(
        data.map(async (review) => {
          let userName = "Client";

          if (review.user_id) {
            // const { data: profileData, error: profileError } = await supabase
            //   .from('profiles')
            //   .select('first_name, last_name')
            //   .eq('id', review.user_id)
            //   .single();
            const { data: profileData, error: profileError } = await supabase
              .from("profiles_public")
              .select("first_name, last_name")
              .eq("id", review.user_id)
              .single();

            if (!profileError && profileData) {
              const firstName = profileData.first_name || "";
              const lastName = profileData.last_name || "";
              if (firstName || lastName) {
                userName = `${firstName} ${lastName}`.trim();
              }
            }
          }

          return {
            ...review,
            user_name: userName,
          };
        })
      );

      setReviews(formattedReviews);
    } catch (error) {
      console.error("Erreur lors du chargement des avis:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les avis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer un avis
  const handleDeleteReview = async (reviewId: string) => {
    setReviewToDelete(reviewId);
    setIsDeleteDialogOpen(true);
  };

  // Fonction pour confirmer la suppression d'un avis
  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewToDelete)
        .eq("user_id", currentUserId); // S'assurer que l'utilisateur ne peut supprimer que ses propres avis

      if (error) throw error;

      toast({
        title: "Avis supprimé",
        description: "Votre avis a été supprimé avec succès",
      });

      // Recharger les avis après la suppression
      fetchReviews();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'avis",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setReviewToDelete(null);
    }
  };

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setCurrentUserId(data.session?.user?.id || null);
    };

    checkAuthStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setCurrentUserId(session?.user?.id || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Charger les détails du produit et les avis
  useEffect(() => {
    const { name, id } = determineProductInfo();
    setProductName(name);
    setProductId(id);

    fetchReviews();
  }, [location.pathname]);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
    <div className="mt-16">
      <Card>
        <CardContent className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Avis ({reviews.length})
            </h3>
            <ReviewsList
              reviews={reviews}
              isLoading={isLoading}
              currentUserId={currentUserId}
              onDeleteReview={handleDeleteReview}
            />
          </div>

          {isLoggedIn ? (
            <div className="mt-8 border-t pt-6">
              <ReviewForm
                productName={productName}
                productId={productId}
                onReviewSubmitted={handleReviewSubmitted}
              />
            </div>
          ) : (
            <div className="mt-8 border-t pt-6 text-center">
              <p className="text-gray-600">
                Vous devez être connecté pour laisser un avis.
              </p>
              <Button
                className="mt-4 bg-lysco-turquoise hover:bg-lysco-turquoise/90"
                asChild
              >
                <Link
                  to={`/login?redirect=${encodeURIComponent(
                    location.pathname
                  )}`}
                >
                  Se connecter
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Boîte de dialogue de confirmation pour la suppression d'un avis */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteReview}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductDescription;
