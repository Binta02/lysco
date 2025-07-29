import { useCart } from "@/src/components/cart/CartContext";
import Footer from "@/src/components/Footer";
import { useToast } from "@/src/hooks/useToast";
import { Session } from "@supabase/supabase-js";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

// 📁 src/components/reservations/ReservationForm.tsx
import ReservationForm from "@/src/components/reservations/ReservationForm";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductDescription from "../../../src/components/services/ProductDescription";

type Service = {
  title: string;
  price: string;
  description: string;
  note?: string; // optionnel !
  originalPrice?: string;
  priceUnit?: string; // optionnel, pour les services à l'heure
};
const serviceData: Record<string, Service> = {
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
  "domiciliation-1an-entreprise": {
    title: "Domiciliation 1 an – Entreprise",
    price: "361,80",
    originalPrice: "432,00",
    note: "*hors taxes",
    description:
      "Offre spéciale annuelle : réduction de 50% sur les 3 premiers mois, puis 5% sur les 9 mois suivants. Économisez sur vos frais tout en bénéficiant d'une adresse professionnelle prestigieuse.",
  },
  "domiciliation-3mois-entreprise": {
    title: "Domiciliation 3 mois – Entreprise",
    price: "108,00",
    note: "*hors taxes",
    description:
      "Adresse commerciale prestigieuse et réception de courrier pour SARL, SAS, EURL, SASU pendant 3 mois. Flexibilité et gestion efficace des opérations commerciales.",
  },
  "domiciliation-3mois-micro": {
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: "72,00",
    note: "*hors taxes",
    description:
      "Adresse professionnelle pour micro-entrepreneurs pendant 3 mois, avec réception et gestion du courrier. Une image professionnelle sans engagement long terme.",
  },
  "domiciliation-6mois-entreprise": {
    title: "Domiciliation 6 mois – Entreprise",
    price: "162,00",
    originalPrice: "216,00",
    note: "*hors taxes",
    description:
      "Promotion spéciale : réduction de 50% sur les 3 premiers mois pour un engagement de 6 mois. Adresse prestigieuse et économies significatives.",
  },
  "domiciliation-6mois-micro": {
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: "108,00",
    originalPrice: "144,00",
    note: "*hors taxes",
    description:
      "Service adapté aux micro-entrepreneurs : adresse professionnelle et gestion du courrier pendant 6 mois, avec une réduction de 50% sur les 3 premiers mois.",
  },
  "pack-domicilie": {
    title: "Pack domicilié",
    price: "1514,00",
    note: "*hors taxes",
    description:
      "Pack complet incluant tous les services de domiciliation pour entreprises, avec un tarif global avantageux et des services premium.",
  },
  "reexpedition-courrier": {
    title: "Réexpédition courrier (3 mois)",
    price: "30,00",
    description:
      "Notre service de réexpédition de courrier sur 3 mois vous offre une solution pratique pour recevoir votre courrier où que vous soyez. Nous réexpédions votre courrier chaque mardi pendant un trimestre, assurant ainsi une gestion efficace de votre correspondance. Le coût de ce service est de 10 euros par mois, avec des frais supplémentaires pour les timbres utilisés lors de la réexpédition. Avec notre service, vous pouvez avoir l’assurance que votre courrier vous parviendra de manière fiable et sécurisée pendant toute la durée de votre absence.",
  },
  "scan-courrier": {
    title: "Scan de courrier (3 mois)",
    price: "18,00",
    description:
      "Notre service de scan de courrier sur 3 mois est conçu pour vous offrir une solution pratique et efficace pour la gestion de votre correspondance, même lorsque vous n’avez pas le temps de vous en occuper ou que vous ne souhaitez pas opter pour la réexpédition de courrier. Avec ce service, dès réception de votre courrier, notre équipe se charge de le scanner et de vous envoyer une copie numérique par voie électronique. Vous n’aurez plus à vous soucier de trier et de gérer votre courrier physiquement. Vous pouvez accéder à vos documents où que vous soyez, à tout moment, simplement en quelques clics. Le règlement de ce service se fait au trimestre, vous offrant ainsi une flexibilité maximale dans la gestion de vos paiements. Vous pouvez profiter de la tranquillité d’esprit en sachant que votre courrier est pris en charge de manière professionnelle et sécurisée.",
  },
  "reception-colis": {
    title: "Réception colis (3 mois)",
    price: "18,00",
    description:
      "Notre service de réception de colis pour une période de 3 mois est conçu pour répondre à vos besoins de réception de petits colis de manière pratique et sécurisée. Que vous soyez un particulier ou une entreprise, notre service vous permet de faire livrer vos petits colis à notre adresse pendant une période de 3 mois. Nous recevons vos colis en votre nom et les conservons en toute sécurité jusqu’à ce que vous veniez les récupérer. Ce service est idéal pour ceux qui ont besoin d’une adresse de livraison temporaire pour recevoir des colis pendant une courte période, que ce soit pour des raisons professionnelles ou personnelles. Profitez dès maintenant de notre service de réception de colis pour une durée de 3 mois et bénéficiez de la tranquillité d’esprit en sachant que vos colis sont entre de bonnes mains.",
  },
  "location-bureau": {
    title: "Location de bureau",
    price: "5,00",
    priceUnit: "/heure",
    description:
      "Espaces de coworking modernes et confortables, équipés de toutes les commodités nécessaires. Location flexible à l'heure, à la demi-journée ou à la journée complète.",
  },
  "coworking-space": {
    title: "Espace de coworking",
    price: "5,00",
    priceUnit: "/heure",
    description:
      "Espace de coworking pour 8 personnes avec Wi-Fi et espace calme. Réservation flexible à l’heure.",
  },
  "formation-room": {
    title: "Salle de formation",
    price: "10,00",
    priceUnit: "/heure",
    description:
      "Salle pour 10 personnes. Tarifs : 10€/h, 25€/demi-journée, 45€/journée. Matériel pédagogique disponible.",
  },
};

export default function ServiceDetailPage() {
  const { id } = useLocalSearchParams();
  const key = id as keyof typeof serviceData;
  const service = serviceData[key];
  const [session, setSession] = useState<Session | null>(null);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!session) {
      router.push("/(tabs)/Login");
      return;
    }

    if (!service) return;

    addItem({
      id: key,
      title: service.title,
      price: parseFloat(service.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Ajouté au panier",
      description: `${service.title} a été ajouté à votre panier.`,
    });
  };
  console.log("Clé reçue depuis l'URL :", key);
  console.log(
    "Est-ce un service réservable ? :",
    ["coworking-space", "location-bureau", "formation-room"].includes(key)
  );

  if (!service) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Service introuvable</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              marginBottom: 16,
              alignSelf: "flex-start",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: "#5cb9bc",
              borderRadius: 8,
            }}
            onPress={() => router.back()}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>← Retour</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.title}>{service.title}</Text>

            {service.originalPrice ? (
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>{service.originalPrice} €</Text>
                <Text style={styles.price}>
                  {service.price} €
                  {service.priceUnit ? (
                    <Text style={{ fontSize: 14, color: "#6b7280" }}>
                      {" "}
                      {service.priceUnit}
                    </Text>
                  ) : null}
                </Text>
              </View>
            ) : (
              <Text style={styles.price}>
                {service.price} €
                {service.priceUnit ? (
                  <Text style={{ fontSize: 14, color: "#6b7280" }}>
                    {" "}
                    {service.priceUnit}
                  </Text>
                ) : null}
              </Text>
            )}

            {service.note && <Text style={styles.note}>{service.note}</Text>}
            <Text style={styles.description}>{service.description}</Text>
            {["coworking-space", "location-bureau", "formation-room"].includes(
              key
            ) ? null : (
              <TouchableOpacity
                style={{
                  backgroundColor: session ? "#5cb9bc" : "#aaa",
                  paddingVertical: 12,
                  borderRadius: 30,
                  alignItems: "center",
                  marginTop: 16,
                }}
                onPress={handleAddToCart}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {session ? "Ajouter au panier" : "Connectez-vous"}
                </Text>
              </TouchableOpacity>
            )}

            {["coworking-space", "location-bureau", "formation-room"].includes(
              key
            ) && <ReservationForm serviceType={key} />}
            <View style={styles.separator} />

            <ProductDescription />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 16,
    color: "#9ca3af", // gris clair
    textDecorationLine: "line-through",
    marginRight: 8,
  },

  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 4,
  },
  note: {
    fontSize: 12,
    color: "#f9429e",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },
});
