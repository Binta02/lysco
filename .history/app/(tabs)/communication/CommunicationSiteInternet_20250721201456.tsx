import Footer from "@/src/components/Footer";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const offers = [
  {
    title: "Site Vitrine",
    description:
      "Présentez vos services en ligne avec un site simple, élégant, et percutant.",
    price: "À partir de 1000€",
  },
  {
    title: "Site e-commerce",
    description:
      "Offrez une boutique en ligne fluide avec gestion de catalogue, panier, paiement sécurisé.",
    price: "À partir de 1500€",
  },
  {
    title: "Refonte & SEO",
    description:
      "Optimisez votre site actuel avec un meilleur design, une navigation fluide et un SEO performant.",
    price: "À partir de 50€/heure",
  },
];

const CommunicationSiteInternet = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={{ padding: 16 }}>
        {" "}
        <Text style={styles.title}>Création de Site Internet</Text>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Un site internet est comparable à une vitrine d’une enseigne. Plus
            cette vitrine est attrayante, plus le potentiel acheteur se rend sur
            le site. <Text style={styles.bold}>Lys Conseil</Text> conçoit des
            sites internet avec un excellent UX Design, adaptés à tous les
            terminaux et optimisés pour le SEO.
          </Text>

          <Text style={styles.paragraph}>
            En fonction de votre activité, vous pourrez opter pour un site
            e-commerce (avec catalogue produit) ou un site vitrine. Tous nos
            sites sont <Text style={styles.bold}>responsive</Text> et conçus
            avec soin pour optimiser l’expérience utilisateur. Le contenu est
            pensé pour le référencement naturel afin d’être visible sur les
            moteurs de recherche.
          </Text>
        </View>
        <Text style={styles.subtitle}>Nos Offres</Text>
        <View style={styles.cardGrid}>
          {offers.map((offer, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{offer.title}</Text>
              <Text style={styles.cardText}>{offer.description}</Text>
              <Text style={styles.cardPrice}>{offer.price}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/contact" as any)}
        >
          <Text style={styles.buttonText}>Contactez-nous</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default CommunicationSiteInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ec4899",
    marginBottom: 20,
  },
  cardGrid: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5cb9bc",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
