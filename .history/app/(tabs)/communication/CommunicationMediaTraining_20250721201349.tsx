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

const CommunicationMediaTraining = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={{ padding: 16 }}>
        {" "}
        <Text style={styles.title}>Media Training</Text>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Vous souhaitez améliorer votre prise de parole en public, que ce
            soit pour des présentations, des interviews ou des conférences ? Lys
            Conseil vous accompagne avec des coachs spécialisés pour :
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>
              • Communiquer efficacement vos messages, assurant qu’ils soient
              clairs et percutants.
            </Text>
            <Text style={styles.listItem}>
              • Optimiser vos techniques de vente, pour transformer vos
              présentations en opportunités concrètes.
            </Text>
            <Text style={styles.listItem}>
              • Renforcer votre pouvoir de persuasion, afin de convaincre avec
              aisance et impact.
            </Text>
            <Text style={styles.listItem}>
              • Stimuler l’intérêt de vos clients, les incitant à choisir vos
              produits ou services.
            </Text>
            <Text style={styles.listItem}>
              • Exprimer votre perspective, en garantissant qu’elle soit
              comprise et appréciée à sa juste valeur.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Un oral se prépare pour communiquer clairement ! Nous vous
            apprendrons à gérer votre stress, bien communiquer oralement et
            travailler votre langage corporel.
          </Text>

          <Text style={styles.subTitle}>Tarifs</Text>
          <Text style={styles.listItem}>• 60€ de l’heure</Text>
          <Text style={styles.listItem}>• 90€ de l’heure si déplacement</Text>

          <Text style={styles.subTitle}>Mini formation – 3 heures</Text>
          <Text style={styles.listItem}>
            • 160€ par personne{" "}
            <Text style={styles.italic}>(dans nos locaux)</Text> (minimum 2
            personnes)
          </Text>
          <Text style={styles.listItem}>
            • 250€ par personne{" "}
            <Text style={styles.italic}>(dans vos locaux)</Text> (minimum 2
            personnes)
          </Text>

          <Text style={styles.subTitle}>Formation en ligne</Text>
          <Text style={styles.paragraph}>
            Vous recevez 3 vidéos expliquant comment bien préparer et bien
            communiquer pour différentes situations, accompagnées d'exercices
            pratiques.
          </Text>
          <Text style={styles.bold}>99€</Text>
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

export default CommunicationMediaTraining;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 24,
  },
  list: {
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ec4899",
    marginTop: 20,
    marginBottom: 8,
  },
  italic: {
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#374151",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
