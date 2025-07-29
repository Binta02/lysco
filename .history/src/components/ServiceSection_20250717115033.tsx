import { FileText, Home, MessageCircle } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ServiceCard from "./ServiceCard";

const ServiceSection: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Nos Services</Text>
        <Text style={styles.description}>
          Lys&Co propose une gamme complète de services pour vous accompagner
          dans le développement de votre entreprise.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <ServiceCard
          title="Domiciliation commerciale"
          description="Domiciliez votre entreprise à une adresse professionnelle et bénéficiez d'une gestion complète de votre courrier."
          icon={<Home size={32} color="#06b6d4" />} // turquoise
          link="Domiciliation"
          color="turquoise"
        />

        <ServiceCard
          title="Services administratifs"
          description="Confiez-nous vos tâches administratives pour vous concentrer sur le développement de votre activité."
          icon={<FileText size={32} color="#ec4899" />} // pink
          link="ServicesAdmin"
          color="pink"
        />

        <ServiceCard
          title="Communication & Marketing"
          description="Stratégies de communication, création de contenu et gestion des réseaux sociaux pour augmenter votre visibilité."
          icon={<MessageCircle size={32} color="#06b6d4" />} // turquoise
          link="Communication"
          color="turquoise"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#f9fafb", // gray-50
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#4b5563", // gray-600
    textAlign: "center",
    maxWidth: 300,
  },
  cardContainer: {
    flexDirection: "column",
    gap: 16,
  },
});

export default ServiceSection;
