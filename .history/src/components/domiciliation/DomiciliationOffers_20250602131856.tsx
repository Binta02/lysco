import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface OfferProps {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  isPromo?: boolean;
  link: string;
}

const offers: OfferProps[] = [
  {
    id: "domiciliation-1an-entreprise",
    title: "Domiciliation 1 an – Entreprise",
    price: "361,80",
    originalPrice: "432,00",
    isPromo: true,
    link: "/domiciliation/1-an-entreprise",
  },
  {
    id: "domiciliation-3mois-entreprise",
    title: "Domiciliation 3 mois – Entreprise",
    price: "108,00",
    link: "/domiciliation/3-mois-entreprise",
  },
  {
    id: "domiciliation-3mois-micro",
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: "72,00",
    link: "/domiciliation/3-mois-micro-entreprise",
  },
  {
    id: "domiciliation-6mois-entreprise",
    title: "Domiciliation 6 mois – Entreprise",
    price: "162,00",
    originalPrice: "216,00",
    isPromo: true,
    link: "/domiciliation/6-mois-entreprise",
  },
  {
    id: "domiciliation-6mois-micro",
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: "108,00",
    originalPrice: "144,00",
    isPromo: true,
    link: "/domiciliation/6-mois-micro-entreprise",
  },
  {
    id: "pack-domicilie",
    title: "Pack domicilié",
    price: "1514,00",
    link: "/domiciliation/pack-domicilie",
  },
];

const DomiciliationOffers = () => {
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

  const handleAddToCart = (offer: OfferProps) => {
    addItem({
      id: offer.id,
      title: offer.title,
      price: parseFloat(offer.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${offer.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Nos offres de domiciliation
          </h2>
          <p className="mb-8 text-gray-600">
            Pour plus de flexibilité, optez pour nos forfaits prépayés de 3
            mois, 6 mois ou 1 an
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                {offer.isPromo && (
                  <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Promo !
                  </div>
                )}
                <CardTitle className="text-xl">
                  <Link
                    to={offer.link}
                    className="hover:text-lysco-turquoise transition-colors"
                  >
                    {offer.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  {offer.isPromo && offer.originalPrice && (
                    <p className="text-lg line-through text-gray-500">
                      {offer.originalPrice} €
                    </p>
                  )}
                  <p className="text-2xl font-semibold text-lysco-turquoise">
                    {offer.price} €
                  </p>
                </div>

                <div className="flex flex-col space-y-2 mt-4">
                  {/* <Button
                    className="w-full flex items-center justify-center gap-2 bg-lysco-turquoise hover:bg-opacity-90"
                    onClick={() => handleAddToCart(offer)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter au panier
                  </Button> */}
                  {session ? (
                    <Button
                      className="w-full flex items-center justify-center gap-2 bg-lysco-turquoise hover:bg-opacity-90"
                      onClick={() => handleAddToCart(offer)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Ajouter au panier
                    </Button>
                  ) : (
                    <Button
                      className="w-full flex items-center justify-center gap-2 bg-gray-400"
                      onClick={() => (window.location.href = "/login")}
                    >
                      Connectez-vous
                    </Button>
                  )}
                  <Link to={offer.link} className="w-full">
                    <Button variant="outline" className="w-full">
                      Voir les détails
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/demande-devis">
            <Button className="bg-lysco-pink hover:bg-opacity-90 px-8">
              Demander un devis personnalisé
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DomiciliationOffers;
