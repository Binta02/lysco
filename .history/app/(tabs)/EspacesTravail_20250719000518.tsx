import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const EspacesTravail = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const Card = ({
    image,
    title,
    description,
    price,
    link,
    buttonColor,
  }: {
    image: string;
    title: string;
    description: string;
    price: string;
    link: string;
    buttonColor: string;
  }) => (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={{ padding: 12 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
        <Text style={styles.cardPrice}>{price}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={() => router.push(link as any)}
        >
          <Text style={styles.buttonText}>Réserver maintenant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Navbar session={null} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Text style={styles.title}>Nos espaces de travail</Text>

        <Text style={styles.subtitle}>Réservez dès maintenant nos espaces</Text>

        <View style={styles.cardGrid}>
          <Card
            image="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_a915053597e240a9baa31a00123ab7afmv2.webp"
            title="Espace de coworking"
            description="Espace de coworking pour 8 personnes avec Wi-Fi et espace calme."
            price="À partir de 5€/heure"
            link="/services/coworking-space"
            buttonColor="#5cb9bc"
          />
          <Card
            image="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_701844a302db4d7babbfbd3ff9bdbabemv2.webp"
            title="Salle de formation"
            description="Salle pour 10 personnes avec équipement pédagogique."
            price="10€/h, 25€/demi-journée, 45€/journée"
            link="/services/formation-room"
            buttonColor="#f43f5e"
          />
          <Card
            image="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_d5ce529552664ec3b89f4e4099e76269mv2.webp"
            title="Location de bureau"
            description="Espaces privés et calmes pour un travail concentré."
            price="125€/demi-journée, 250€/journée"
            link="/services/location-bureau"
            buttonColor="#5cb9bc"
          />
        </View>

        {/* Appel à action final */}
        <View style={styles.quoteBox}>
          <Text style={styles.quoteTitle}>
            Vous cherchez une solution adaptée à vos besoins ?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#5cb9bc" }]}
              onPress={() => router.push("/(tabs)/Contact" as any)}
            >
              <Text style={styles.buttonText1}>Nous contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonOutline, { borderColor: "#f43f5e" }]}
              onPress={() => router.push("/tarifs" as any)}
            >
              <Text style={[styles.buttonText1, { color: "#f43f5e" }]}>
                Voir nos tarifs
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default EspacesTravail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  breadcrumb: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText1: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
  },
  buttonOutline: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
  },
  quoteBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#0f172a",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
});
