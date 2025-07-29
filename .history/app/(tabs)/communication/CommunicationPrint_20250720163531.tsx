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

const printItems = [
  "Cartes de visite",
  "Flyers",
  "Affiches",
  "Brochures",
  "Dépliants",
  "Catalogues",
  "Menus",
  "Stickers",
  "Packaging",
  "Signalétique",
  "Roll-up",
  "PLV (Publicité sur le Lieu de Vente)",
];

const CommunicationPrint = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      {" "}
      <Text style={styles.title}>Communication Print</Text>
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Faites de la communication print une alliée ! Elle vous permettra de
          vous démarquer de vos concurrents et d’attirer ou de fidéliser votre
          clientèle. <Text style={{ fontWeight: "bold" }}>Lys Conseil</Text>{" "}
          conçoit pour vous tous types de supports imprimés, pensés sur mesure
          selon votre image et vos objectifs.
        </Text>

        <Text style={styles.paragraph}>
          Voici une sélection de ce que nous réalisons :
        </Text>

        <View style={styles.grid}>
          {printItems.map((item, index) => (
            <Text key={index} style={styles.gridItem}>
              • {item}
            </Text>
          ))}
        </View>

        <Text style={styles.paragraph}>
          Chaque support est travaillé avec soin, tant sur le plan graphique que
          stratégique, pour garantir un rendu professionnel qui vous distingue.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/contact" as any)}
      >
        <Text style={styles.buttonText}>Contactez-nous</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
};

export default CommunicationPrint;

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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  gridItem: {
    width: "48%",
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
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
