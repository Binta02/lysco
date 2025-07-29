import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    title: "Stratégie",
    description:
      "Audit et accompagnement stratégique pour optimiser votre communication.",
    link: "/(tabs)/communication/CommunicationStrategie",
  },
  {
    title: "Community Management",
    description: "Gestion et animation de vos réseaux sociaux.",
    link: "/(tabs)/communication/CommunicationCommunityManagement",
  },
  {
    title: "Créations",
    description: "Supports visuels sur mesure pour votre image.",
    link: "/(tabs)/communication/CommunicationCreations",
  },
  {
    title: "Communication Print",
    description: "Cartes de visites, flyers, brochures, etc.",
    link: "/(tabs)/communication/CommunicationPrint",
  },
  {
    title: "Site Internet",
    description: "Conception et refonte de votre site web.",
    link: "/(tabs)/communication/CommunicationSiteInternet",
  },
  {
    title: "Photos",
    description: "Shooting professionnel produit ou personnel.",
    link: "/(tabs)/communication/CommunicationPhotos",
  },
  {
    title: "Media Training",
    description: "Formations à la prise de parole en public.",
    link: "/(tabs)/communication/CommunicationMediaTraining",
  },
  {
    title: "Packs de Communication",
    description: "Formules complètes pour démarrer ou booster.",
    link: "/(tabs)/communication/CommunicationPacks",
  },
];

const CommunicationServices = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nos Prestations de Communication</Text>
      <View style={styles.grid}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(service.link as any)}
          >
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
            <View style={styles.buttonRow}>
              <Text style={styles.buttonText}>En savoir plus</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={16}
                color="#5cb9bc"
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CommunicationServices;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#0f172a",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 66,
  },
  card: {
    width: "100%",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#5cb9bc",
    fontWeight: "bold",
    marginRight: 4,
  },
});
