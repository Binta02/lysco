import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, FileText, Package } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const ComplementaryServices = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleAddToCart = (service: {
    id: string;
    title: string;
    price: string;
  }) => {
    addItem({
      id: service.id,
      title: service.title,
      price: parseFloat(service.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Service ajouté au panier",
      description: `${service.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Nos Services Complémentaires
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Optimisez votre temps avec nos services supplémentaires !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service de réexpédition */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Mail className="h-10 w-10 text-lysco-turquoise mb-2" />
              <CardTitle className="text-xl text-center">REEX</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  Service de réexpédition hebdomadaire de votre courrier, envois
                  chaque mardi.
                </p>
                <p className="text-2xl font-semibold text-lysco-turquoise">
                  10€<span className="text-base font-normal">/mois</span>
                </p>
                <p className="text-xs text-gray-500 italic">
                  Hors frais de timbres
                </p>
              </div>
              <div className="space-y-2 mt-4">
                {/* <Button
                  className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                  onClick={() =>
                    handleAddToCart({
                      id: "service-reexpedition",
                      title: "Service de réexpédition de courrier",
                      price: "10,00",
                    })
                  }
                >
                  Ajouter au panier
                </Button> */}
                {session ? (
                  <Button
                    className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                    onClick={() =>
                      handleAddToCart({
                        id: "service-reexpedition",
                        title: "Service de réexpédition de courrier",
                        price: "10,00",
                      })
                    }
                  >
                    Ajouter au panier
                  </Button>
                ) : (
                  <Button
                    className="w-full flex items-center justify-center bg-gray-400"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Connectez-vous
                  </Button>
                )}
                <Link
                  to="/services/reexpedition-courrier"
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Scan de courrier */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <FileText className="h-10 w-10 text-lysco-turquoise mb-2" />
              <CardTitle className="text-xl text-center">
                Scan de courrier
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  Numérisation de vos courriers dès réception pour un accès
                  immédiat à vos documents.
                </p>
                <p className="text-2xl font-semibold text-lysco-turquoise">
                  5€<span className="text-base font-normal">/mois</span>
                </p>
              </div>
              <div className="space-y-2 mt-4">
                {/* <Button
                  className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                  onClick={() =>
                    handleAddToCart({
                      id: "service-scan",
                      title: "Service de numérisation de courrier",
                      price: "5,00",
                    })
                  }
                >
                  Ajouter au panier
                </Button> */}
                {session ? (
                  <Button
                    className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                    onClick={() =>
                      handleAddToCart({
                        id: "service-scan",
                        title: "Service de numérisation de courrier",
                        price: "5,00",
                      })
                    }
                  >
                    Ajouter au panier
                  </Button>
                ) : (
                  <Button
                    className="w-full flex items-center justify-center bg-gray-400"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Connectez-vous
                  </Button>
                )}
                <Link to="/services/scan-courrier" className="block w-full">
                  <Button variant="outline" className="w-full">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Service Colis */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Package className="h-10 w-10 text-lysco-turquoise mb-2" />
              <CardTitle className="text-xl text-center">
                Service Colis
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  Réception et gestion de vos colis professionnels.
                </p>
                <p className="text-2xl font-semibold text-lysco-turquoise">
                  6€<span className="text-base font-normal">/mois</span>
                </p>
              </div>
              <div className="space-y-2 mt-4">
                {/* <Button
                  className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                  onClick={() =>
                    handleAddToCart({
                      id: "service-colis",
                      title: "Service de gestion de colis",
                      price: "6,00",
                    })
                  }
                >
                  Ajouter au panier
                </Button> */}
                {session ? (
                  <Button
                    className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                    onClick={() =>
                      handleAddToCart({
                        id: "service-colis",
                        title: "Service de gestion de colis",
                        price: "6,00",
                      })
                    }
                  >
                    Ajouter au panier
                  </Button>
                ) : (
                  <Button
                    className="w-full flex items-center justify-center bg-gray-400"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Connectez-vous
                  </Button>
                )}
                <Link to="/services/reception-colis" className="block w-full">
                  <Button variant="outline" className="w-full">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/services-complementaires">
          <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
            Découvrir tous nos services supplémentaires
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ComplementaryServices;
