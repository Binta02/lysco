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

const services = [
  {
    title: "Création de pages réseaux",
    description:
      "Des pages attractives et personnalisées, conçues pour valoriser votre marque sur les réseaux sociaux les plus pertinents.",
    price: "À partir de 99 €",
  },
  {
    title: "Gestion de pages réseaux",
    description:
      "Confiez-nous l’animation et la gestion quotidienne de vos comptes : on s’occupe de tout.",
    price: "Sur devis",
  },
  {
    title: "Refonte de pages réseaux",
    description:
      "Vos pages manquent d’impact ? Nous les modernisons pour qu’elles captivent à nouveau votre audience.",
    price: "À partir de 99 €",
  },
  {
    title: "Création de page Google",
    description:
      "Optimisez votre visibilité locale avec une fiche Google Business complète et bien référencée.",
    price: "À partir de 99 €",
  },
];

const CommunicationCommunityManagement = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <Text style={styles.title}>Community Management</Text>

      <View style={styles.textBlock}>
        <Text style={styles.paragraph}>
          Notre agence de communication 360° vous aide à bâtir et à fédérer une
          communauté engagée autour de votre marque. Votre présence sur les
          réseaux sociaux devient un véritable levier de fidélisation.
        </Text>
        <Text style={styles.paragraph}>
          Notre équipe de community managers tisse des liens solides avec votre
          audience. Nous créons du contenu pertinent et engageant, répondons aux
          commentaires et messages, et gérons les échanges sur toutes vos
          plateformes.
        </Text>
        <Text style={styles.paragraph}>
          Nous assurons une veille concurrentielle constante pour vous proposer
          des actions pertinentes, des campagnes créatives et une gestion de
          crise en cas de besoin.
        </Text>
        <Text style={styles.paragraph}>
          Vos campagnes sont analysées avec des outils puissants afin de mesurer
          les performances et ajuster les actions pour des résultats toujours
          meilleurs.
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {services.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => router.push("/contact" as any)}
      >
        <Text style={styles.contactButtonText}>Contactez-nous</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
};

export default CommunicationCommunityManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 24,
  },
  textBlock: {
    marginBottom: 32,
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5cb9bc",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
  },
  contactButton: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
