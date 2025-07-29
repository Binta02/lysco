import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const DomiciliationPricing = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const [engagementSociete, setEngagementSociete] = useState(false);
  const [engagementAuto, setEngagementAuto] = useState(false);
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

  const handleAddToCart = (offer: {
    id: string;
    title: string;
    price: string;
  }) => {
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
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Société */}
      <Card>
        <CardHeader>
          <CardTitle>Sociétés - Artisans - Commerçants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">
              {engagementSociete ? "18€" : "36€"}
              <span className="text-base font-normal">/mois</span>
            </p>
            <p className="text-sm text-gray-600">
              Pour un engagement de plus de 6 mois, bénéficiez de 50% de
              réduction sur votre premier trimestre.
            </p>
            {engagementSociete && (
              <p className="font-medium text-green-600">
                Soit 18€ vos 3 premiers mois !
              </p>
            )}
            <div className="flex items-center gap-2">
              <Checkbox
                id="engagementSociete"
                checked={engagementSociete}
                onCheckedChange={(checked) =>
                  setEngagementSociete(checked === true)
                }
              />
              <label
                htmlFor="engagementSociete"
                className="text-sm cursor-pointer"
              >
                Je m'engage pour plus de 6 mois
              </label>
            </div>
            {session ? (
              <Button
                className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                onClick={() =>
                  handleAddToCart({
                    id: engagementSociete
                      ? "domiciliation-mensuel-societe-reduit"
                      : "domiciliation-mensuel-societe-normal",
                    title: "Domiciliation Mensuelle - Société",
                    price: engagementSociete ? "18,00" : "36,00",
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
          </div>
        </CardContent>
      </Card>

      {/* Auto-entrepreneur */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Entrepreneurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">
              {engagementAuto ? "12€" : "24€"}
              <span className="text-base font-normal">/mois</span>
            </p>
            <p className="text-sm text-gray-600">
              Pour un engagement de plus de 6 mois, bénéficiez de 50% de
              réduction sur votre premier trimestre.
            </p>
            {engagementAuto && (
              <p className="font-medium text-green-600">
                Soit 12€ vos 3 premiers mois !
              </p>
            )}
            <div className="flex items-center gap-2">
              <Checkbox
                id="engagementAuto"
                checked={engagementAuto}
                onCheckedChange={(checked) =>
                  setEngagementAuto(checked === true)
                }
              />
              <label
                htmlFor="engagementAuto"
                className="text-sm cursor-pointer"
              >
                Je m'engage pour plus de 6 mois
              </label>
            </div>
            {session ? (
              <Button
                className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                onClick={() =>
                  handleAddToCart({
                    id: engagementAuto
                      ? "domiciliation-mensuel-auto-entreprise-reduit"
                      : "domiciliation-mensuel-auto-entrepreneur-normal",
                    title: "Domiciliation Mensuelle - Auto Entrepreneur",
                    price: engagementAuto ? "12,00" : "24,00",
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
          </div>
        </CardContent>
      </Card>

      {/* Associations */}
      <Card>
        <CardHeader>
          <CardTitle>Associations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">
              15€<span className="text-base font-normal">/mois</span>
            </p>
            <p className="text-sm text-gray-600">
              Tarif spécial pour les associations.
            </p>
            {session ? (
              <Button
                className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                onClick={() =>
                  handleAddToCart({
                    id: "domiciliation-mensuel-association",
                    title: "Domiciliation Mensuelle - Association",
                    price: "15,00",
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomiciliationPricing;
