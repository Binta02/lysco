import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommunicationHero = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#5cb9bc10", "#ec489910"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>NOS PRESTATIONS DE COMMUNICATION</Text>
        <Text style={styles.paragraph}>
          Experts en communication pour TPE/PME, nous vous accompagnons dans
          tous les aspects de votre communication (digitale, print, orale, image
          de marque) à des tarifs accessibles.
        </Text>
        <Text style={styles.paragraph}>
          Notre équipe (rédacteurs, graphistes, webmasters, vidéastes…) analyse
          vos besoins et pilote votre projet de A à Z.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5cb9bc" }]}
            onPress={() => router.push("/(tabs)/Contact")}
          >
            <Text style={styles.buttonText}>Prenez RDV !</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonOutline, { borderColor: "#5cb9bc" }]}
            onPress={() => router.push("/")}
          >
            <Text style={[styles.buttonText, { color: "#5cb9bc" }]}>
              Nos packs de communication
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CommunicationHero;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  content: {
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#0f172a",
  },
  paragraph: {
    textAlign: "center",
    color: "#475569",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  buttonOutline: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
