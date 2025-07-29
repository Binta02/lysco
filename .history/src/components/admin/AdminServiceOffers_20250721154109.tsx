import { useCart } from "@/src/components/cart/CartContext";
import { useToast } from "@/src/hooks/useToast";
import { supabase } from "@/src/integrations/supabase/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  const router = useRouter();
  const [engagementSociete, setEngagementSociete] = useState(false);
  const [engagementAuto, setEngagementAuto] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(true);

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
    <View style={styles.grid}>
      {/* Société */}
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <MaterialCommunityIcons
          name="file-document-outline"
          size={40}
          color="#06b6d4"
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
          Services administratifs
        </Text>
      </View>
      {services.map((id) => {
        const service = serviceData[id];
        if (!service) return null;

        return (
          <View
            key={id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              {service.title}
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#06b6d4" }}
            >
              {service.price} €
            </Text>
            {service.note && (
              <Text
                style={{ fontSize: 12, color: "#6b7280", fontStyle: "italic" }}
              >
                {service.note}
              </Text>
            )}
            <Text style={{ fontSize: 14, color: "#374151", marginVertical: 8 }}>
              {service.description}
            </Text>

            <View style={{ marginTop: 8 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: session ? "#06b6d4" : "#aaa",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={() =>
                  session
                    ? handleAddToCart(id)
                    : router.push("/(tabs)/Login" as any)
                }
              >
                <MaterialCommunityIcons
                  name={session ? "cart-outline" : "login"}
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {session ? "Ajouter au panier" : "Connectez-vous"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 8,
                  borderWidth: 1,
                  borderColor: "#06b6d4",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={() => router.push(`/services/${id}` as any)}
              >
                <Text style={{ color: "#06b6d4", fontWeight: "bold" }}>
                  Voir les détails
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 10, color: "red", marginTop: 4 }}>
              DEBUG session: {session ? session.user.email : "null"}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
    gap: 16,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5cb9bc",
  },
  perMonth: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#555",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginVertical: 8,
  },
  promoText: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 8,
  },
  addButton: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdminServiceOffers;
