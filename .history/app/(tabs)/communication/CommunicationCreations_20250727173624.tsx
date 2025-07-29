import Footer from "@/src/components/Footer";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CommunicationCreations = () => {
  const router = useRouter();
  const sites = [
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105754-1.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105810-1.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1221.jpg",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105827-1.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105838.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105854.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105908.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105922.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105933.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1220.jpg",
    "https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1222.jpg",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105746-1.png",
  ];
  const links = [
    { name: "www.nid-hypnose.com", url: "https://www.nid-hypnose.com" },
    { name: "incantohairstudio.com", url: "https://incantohairstudio.com" },
    {
      name: "maisonsjltconstruction.com",
      url: "https://maisonsjltconstruction.com",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={{ padding: 16 }}>
        {" "}
        <Text style={styles.title}>Les créations de Lys&Co</Text>
        {/* Logos */}
        <Text style={styles.sectionTitle}>Les logos</Text>
        <View style={styles.imageGrid}>
          {/* {logos.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))} */}
          <Image
            source={{
              uri: "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105723.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Image
            source={{
              uri: "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105730.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Image
            source={{
              uri: "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105710.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Image
            source={{
              uri: "https://lys-and-co.com/wp-content/uploads/2025/03/logo-.jpg",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Image
            source={{
              uri: "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105649.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 50, height: 50 }}
          />
        </View>
        {/* Sites web */}
        <Text style={styles.sectionTitle}>Les sites web</Text>
        <View style={styles.imageGrid}>
          {sites.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </View>
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(link.url)}
          >
            <Text style={styles.link}>{link.name}</Text>
          </TouchableOpacity>
        ))}
        {/* Exemple section photo */}
        <Text style={styles.sectionTitle}>Les photos</Text>
        <Text style={styles.subSectionTitle}>Objet</Text>
        {/* Ajoute ici comme pour logos/sites selon ton besoin */}
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

export default CommunicationCreations;

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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5cb9bc",
    marginTop: 24,
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ec4899",
    marginTop: 16,
    marginBottom: 8,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  image: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  link: {
    color: "#5cb9bc",
    textDecorationLine: "underline",
    marginBottom: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
