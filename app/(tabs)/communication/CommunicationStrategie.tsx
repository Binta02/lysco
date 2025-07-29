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

const prestations = [
  {
    title: "Audit Communication",
    description:
      "Voyons ensemble la communication la plus adéquate pour votre activité.",
    price: "300€ le dossier",
  },
  {
    title: "Audit Commercial",
    description:
      "Construisons une stratégie solide pour faire de votre entreprise un véritable aimant à clients.",
    price: "300€ le dossier",
  },
  {
    title: "Coaching Organisation",
    description:
      "Nous vous aidons à structurer vos journées, gérer votre temps, et fixer des priorités efficaces.",
    price: "60€ / heure",
  },
];

const CommunicationStrategie = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Accompagnement Stratégique</Text>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Vous avez plein d’idées d’entrepreneuriat mais êtes perdue dans vos
            choix ? Ou votre entreprise stagne ? Ne restez pas seule et
            faites-vous accompagner par
            <Text style={styles.bold}> Lys Conseil</Text>. Nous réalisons un
            audit pour déterminer ce qui ne convient pas et vous proposons un
            coaching personnalisé.
          </Text>
          <Text style={styles.paragraph}>
            Nous vous proposons d’être coachée et guidée sur les éléments
            suivants :
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              • L’organisation de votre temps de travail afin de pouvoir
              consacrer également du temps à vos proches
            </Text>
            <Text style={styles.listItem}>
              • La communication de votre image de marque
            </Text>
            <Text style={styles.listItem}>
              • Un accompagnement d’un point de vue commercial
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Nos Prestations</Text>
        <View style={styles.cardGrid}>
          {prestations.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
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

export default CommunicationStrategie;

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
  list: {
    marginLeft: 8,
  },
  listItem: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 6,
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
