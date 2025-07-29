import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ServiceData {
  title: string;
  price: string;
  description: string;
  priceUnit?: string;
  originalPrice?: string;
  isPromo?: boolean;
  note?: string;
}
const serviceData: Record<string, ServiceData> = {
  "vtc-creation": {
    title: "Accompagnement création VTC – Driel",
    price: "900,00",
    note: "*hors coûts organismes",
    description:
      "Notre service d’accompagnement pour l’ouverture de votre société VTC offre une assistance professionnelle et personnalisée pour simplifier le processus de création et de lancement de votre entreprise. En partenariat avec notre expert-comptable spécialisé, nous vous guidons à travers toutes les étapes, depuis l’enregistrement de votre société jusqu’à l’obtention des licences nécessaires. De plus, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux.",
  },
  "bank-account": {
    title: "Accompagnement ouverture de compte bancaire en ligne",
    price: "150,00",
    description:
      "Notre service d’Accompagnement à l’Ouverture de Compte est conçu pour faciliter et accélérer le processus d’ouverture de compte bancaire pour les entreprises et les particuliers. Grâce à une assistance personnalisée, nous guidons nos clients à travers chaque étape, depuis la préparation des documents nécessaires jusqu’à l’obtention de leur nouveau compte bancaire, en veillant à simplifier les démarches et à répondre à toutes les exigences des institutions financières.",
  },
  "company-creation": {
    title: "Accompagnement ouverture de votre société",
    price: "600,00",
    description:
      "Notre service d’accompagnement à l’ouverture de société vous offre une assistance professionnelle et complète en partenariat avec notre expert-comptable qualifié. Nous vous guidons à travers toutes les étapes de création de votre entreprise, en veillant à ce que toutes les exigences légales soient respectées. De plus, nous vous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre société chez nous, ce qui vous permet de bénéficier d’un avantage financier supplémentaire. Avec notre service, vous pouvez démarrer votre entreprise en toute confiance, sachant que vous bénéficiez du soutien nécessaire pour réussir.",
  },
  "micro-company": {
    title: "Accompagnement ouverture micro entreprise",
    price: "150,00",
    description:
      "Notre service d’accompagnement à l’ouverture de micro-entreprise offre une assistance professionnelle et complète pour vous guider à travers toutes les étapes nécessaires pour démarrer votre activité avec succès. De la consultation initiale à l’assistance à la constitution du dossier et au suivi continu, notre équipe expérimentée est là pour vous fournir les conseils, les ressources et le soutien dont vous avez besoin pour lancer votre micro-entreprise en toute confiance",
  },
  "company-transfer": {
    title: "Accompagnement transfert de société",
    price: "600,00",
    note: "*hors coûts organismes",
    description:
      "Notre service d’accompagnement pour le transfert de votre société offre une assistance professionnelle et personnalisée pour simplifier le processus de transfert de propriété ou de siège social de votre entreprise. En partenariat avec notre expert-comptable expérimenté, nous vous guidons à travers toutes les étapes, depuis la préparation de la documentation jusqu’à la finalisation du transfert. De plus, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux.",
  },
  "share-transfer": {
    title: "Cession de parts",
    price: "200,00",
    description:
      "Le service de cession de parts de notre société offre une assistance professionnelle et complète pour faciliter le transfert de propriété dans les sociétés. De la consultation sur les aspects juridiques et fiscaux à la négociation d’accords personnalisés et à l’obtention des approbations nécessaires, notre équipe expérimentée est là pour accompagner les associés, les investisseurs et les entreprises tout au long du processus de cession. Notre objectif est de simplifier et d’accélérer le processus, tout en veillant à ce que les intérêts de toutes les parties concernées soient pris en compte de manière équitable et professionnelle.",
  },
  "commercial-ad": {
    title: "Création annonce commerciale pour site d'annonces",
    price: "15,00",
    description:
      "Notre service de création d’annonces commerciales pour sites d’annonces vous aide à maximiser la visibilité et l’efficacité de vos annonces en ligne. Nous pensons soigneusement chaque annonce pour qu’elle soit vendeuse et optimisée avec les bons mots-clés, ce qui augmente vos chances d’attirer l’attention de votre public cible. Avec notre équipe expérimentée, vous pouvez être sûr que vos annonces seront convaincantes et captivantes, vous permettant de générer plus de trafic et de prospects pour votre entreprise.",
  },
  "quote-creation": {
    title: "Création devis ou service",
    price: "15,00",
    description:
      "Notre service de création de devis et services offre une solution professionnelle pour la conception et la présentation de vos devis et documents de services. Avec votre logo fourni, nous travaillons en étroite collaboration avec vous pour créer des devis personnalisés qui mettent en valeur les avantages de vos produits ou services. Nous nous assurons que chaque devis est clair, complet et professionnel, vous permettant de présenter votre entreprise de manière convaincante à vos clients.",
  },
  "annual-accounts": {
    title: "Dépôt des comptes annuels",
    price: "300,00",
    note: "*hors coûts organismes",
    description:
      "Le service de dépôt des comptes annuels de notre société offre une assistance complète pour aider les entreprises à respecter leurs obligations légales en matière de transparence financière et de conformité réglementaire. De la préparation des états financiers annuels à la soumission auprès des autorités compétentes, en passant par la gestion de toute correspondance avec les organismes de régulation, notre équipe dévouée est là pour simplifier et faciliter ce processus complexe. Notre objectif est de garantir que le dépôt des comptes annuels se déroule de manière fluide et sans accroc, offrant aux entreprises la tranquillité d’esprit nécessaire pour se concentrer sur leurs activités principales.",
  },
  "company-modification": {
    title: "Modification société",
    price: "900,00",
    note: "*hors coûts organismes",
    description:
      "Notre service d’accompagnement pour les modifications de société offre une assistance professionnelle et complète pour faciliter les changements au sein de votre entreprise. En partenariat avec notre expert-comptable, nous vous guidons à travers chaque étape du processus, depuis la préparation de la documentation jusqu’à la soumission auprès des autorités compétentes. Notre objectif est de vous offrir une assistance personnalisée et professionnelle, garantissant une transition fluide et conforme à toutes les exigences légales. De plus, nous proposons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux.",
  },
};

const services = [
  "vtc-creation",
  "bank-account",
  "company-creation",
  "micro-company",
  "company-transfer",
  "share-transfer",
  "commercial-ad",
  "quote-creation",
  "annual-accounts",
  "company-modification",
];

const AdminServiceOffers = () => {
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

  const handleAddToCart = (id: string) => {
    const service = serviceData[id];
    if (!service) return;

    addItem({
      id: `service-${id}`,
      title: service.title,
      price: parseFloat(service.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${service.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="w-10 h-10 text-lysco-turquoise" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Services administratifs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((id) => {
            const service = serviceData[id];
            if (!service) return null;
            return (
              <Card key={id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-lysco-turquoise">
                      {service.price} €
                    </p>
                    {service.note && (
                      <p className="text-sm text-gray-500 italic">
                        {service.note}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    {/* <Button
                      className="w-full flex items-center justify-center gap-2 bg-lysco-turquoise hover:bg-opacity-90 text-white"
                      onClick={() => handleAddToCart(id)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Ajouter au panier
                    </Button> */}
                    {session ? (
                      <Button
                        className="w-full flex items-center justify-center gap-2 bg-lysco-turquoise hover:bg-opacity-90 text-white"
                        onClick={() => handleAddToCart(id)}
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

                    <Link to={`/services/${id}`} className="w-full">
                      <Button className="w-full flex items-center justify-center gap-2 bg-white border border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise/10">
                        Voir les détails
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceOffers;
