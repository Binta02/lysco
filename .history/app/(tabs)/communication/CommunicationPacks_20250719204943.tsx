import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const packs = [
  {
    title: "Pack Starter",
    subtitle: "Lancez-vous",
    features: [
      "Création de logo",
      "Identité visuelle",
      "Carte de visite (hors impression)",
      "Site web one page",
    ],
    price: "À partir de 1500€",
  },
  {
    title: "Pack Moyen",
    subtitle: "Repensez votre image",
    features: [
      "Création de logo",
      "Identité visuelle",
      "Carte de visite (hors impression)",
      "Site vitrine 3 pages",
      "10 photos professionnelles incluses",
      "Page réseau social",
    ],
    price: "À partir de 2000€",
  },
  {
    title: "Pack Pro",
    subtitle: "La solution pour performer",
    features: [
      "Création de logo",
      "Identité visuelle",
      "Flyer recto",
      "Carte de visite (hors impression)",
      "Site vitrine 5 pages",
      "Pages réseaux sociaux (3 pages)",
    ],
    price: "À partir de 2600€",
  },
];

const CommunicationPacks = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nos Packs de Communication</Text>

      <Text style={styles.intro}>
        Lys Conseil met à votre disposition trois packs complets, spécialement
        conçus pour répondre à vos besoins en communication, tout en respectant
        votre budget. Chacun d’eux inclut un accompagnement stratégique et une
        flexibilité maximale dans les modalités de paiement.
      </Text>

      <View style={styles.packContainer}>
        {packs.map((pack, index) => (
          <View key={index} style={styles.packCard}>
            <Text style={styles.packTitle}>{pack.title}</Text>
            <Text style={styles.packSubtitle}>{pack.subtitle}</Text>
            {pack.features.map((feature, idx) => (
              <Text key={idx} style={styles.featureItem}>
                • {feature}
              </Text>
            ))}
            <Text style={styles.packPrice}>{pack.price}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/contact" as any)}
      >
        <Text style={styles.buttonText}>Contactez-nous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CommunicationPacks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 16,
  },
  intro: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 20,
  },
  packContainer: {
    flexDirection: "column",
    gap: 16,
  },
  packCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 16,
  },
  packTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: 4,
  },
  packSubtitle: {
    fontSize: 16,
    color: "#ec4899",
    textAlign: "center",
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  packPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
