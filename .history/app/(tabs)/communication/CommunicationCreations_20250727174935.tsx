import Footer from "@/src/components/Footer";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CommunicationCreations = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const logos = [
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105723.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105730.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105710.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/logo-.jpg",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105649.png",
  ];

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
  const photos = [
    "https://lys-conseil.com/wp-content/uploads/2024/01/objet4.jpg",
    "https://lys-conseil.com/wp-content/uploads/2024/01/objet1.jpg",
    "https://lys-conseil.com/wp-content/uploads/2024/01/objet5.jpg",
    "https://lys-conseil.com/wp-content/uploads/2024/01/objet3.jpg",
    "https://lys-conseil.com/wp-content/uploads/2024/01/objet2.jpg",
  ];
  const CréationsPrint = [
    "https://lys-and-co.com/wp-content/uploads/2025/03/image-restaurant.jpeg",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110210.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110217.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110228.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110238.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110247.png",
    "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110257.png",
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
        <Text style={styles.title}>Les créations de Lys&Co</Text>

        {/* Logos */}
        <Text style={styles.sectionTitle}>Les logos</Text>
        <View style={styles.imageGrid}>
          {logos.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sites web */}
        <Text style={styles.sectionTitle}>Les sites web</Text>
        <View style={styles.imageGrid}>
          {sites.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(link.url)}
          >
            <Text style={styles.link}>{link.name}</Text>
          </TouchableOpacity>
        ))} */}

        <Text style={styles.sectionTitle}>Les photos</Text>

        {/* Objet */}
        <Text style={styles.subSectionTitle}>Objet</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-conseil.com/wp-content/uploads/2024/01/objet4.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/objet1.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/objet5.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/objet3.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/objet2.jpg",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Portrait */}
        <Text style={styles.subSectionTitle}>Portrait</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110044.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0042-2048x1360.jpg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0046-2048x1360.jpg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0059-2048x1360.jpg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0057-2048x1360.jpg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0083-2048x1360.jpg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0065-2048x1360.jpg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110102.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110052.png",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Métiers de bouche */}
        <Text style={styles.subSectionTitle}>Métiers de bouche</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-05-213115.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110125.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110115.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/photo-matisse-scaled.jpeg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/photo-matisse-2-2048x1536.jpeg",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Locaux */}
        <Text style={styles.subSectionTitle}>Locaux</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-conseil.com/wp-content/uploads/2024/01/locaux1.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/locaux3.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/locaux2.jpg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/locaux.jpg",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Créations Prints</Text>

        {/* Métiers divers */}
        <Text style={styles.subSectionTitle}>Métiers divers</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-and-co.com/wp-content/uploads/2025/03/image-restaurant.jpeg",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110210.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110217.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110228.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110238.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110247.png",
            "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110257.png",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Cartes de visite */}
        <Text style={styles.subSectionTitle}>Cartes de visite</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.51.39.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.57.31.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.51.40.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/cv3.png",
            "https://lys-conseil.com/wp-content/uploads/2024/01/cv2.png",
            "https://lys-conseil.com/wp-content/uploads/2024/01/cv1.png",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Présentoirs */}
        <Text style={styles.subSectionTitle}>Présentoirs</Text>
        <View style={styles.imageGrid}>
          {["http://lys-conseil.com/wp-content/uploads/2024/01/p.jpg"].map(
            (uri, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
                <Image source={{ uri }} style={styles.image} />
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Réseaux sociaux */}
        <Text style={styles.subSectionTitle}>Posts réseaux sociaux</Text>
        <View style={styles.imageGrid}>
          {[
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.52.27.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.56.05.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.56.04.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/01/res-1.png",
            "https://lys-conseil.com/wp-content/uploads/2024/01/res2.png",
            "https://lys-conseil.com/wp-content/uploads/2024/01/res3.png",
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-13.00.21.jpeg",
            "https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-13.00.22.jpeg",
          ].map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
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

      {/* Modal image agrandie */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            onPress={() => setSelectedImage(null)}
          />
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedImage || "" }}
              style={styles.imageFull}
              resizeMode="contain"
            />
            <Pressable onPress={() => setSelectedImage(null)}>
              <Text style={styles.closeText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    width: 100,
    height: 100,
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseArea: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageFull: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  closeText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
