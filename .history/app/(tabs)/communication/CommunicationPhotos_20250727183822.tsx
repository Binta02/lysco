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

const CommunicationPhotos = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={{ padding: 16 }}>
        {" "}
        <Text style={styles.title}>Service de Photographie</Text>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            La satisfaction de nos clients est notre moteur. Être à l’écoute de
            vos attentes et vous proposer des services de qualité au meilleur
            prix font partie de nos engagements. Lys Conseil vous propose un
            service photographique complet pour sublimer votre image et vos
            produits.
          </Text>

          <Text style={styles.paragraph}>
            Que ce soit pour soigner votre présence professionnelle ou valoriser
            vos offres, notre équipe met tout en œuvre pour que vos visuels
            fassent la différence.
          </Text>
        </View>
        <View style={[styles.section, styles.leftBorderPink]}>
          <Text style={styles.subTitle}>Service de portraits</Text>
          <Text style={styles.paragraph}>
            Réalisés dans nos locaux ou chez vous, les portraits professionnels
            mettent en avant votre image avec authenticité : parfaits pour vos
            réseaux sociaux, présentations ou cartes de visite.
          </Text>
          <View style={styles.imageGrid}>
            {[
              "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110044.png",
              "https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110052.png",
              "https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0083-768x510.jpg",
            ].map((uri, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
                <Image source={{ uri }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.section, styles.leftBorderTurquoise]}>
          <Text style={styles.subTitle}>Photos de produits</Text>
          <Text style={styles.paragraph}>
            Pour susciter l’acte d’achat, rien de tel qu’une image percutante.
            Nous organisons des shootings produits soignés, pour montrer la
            qualité et les atouts de vos articles.
          </Text>
          <View style={styles.imageGrid}>
            {[
              "http://lys-conseil.com/wp-content/uploads/2024/01/prod3.png",
              "https://lys-conseil.com/wp-content/uploads/2024/01/objet1.jpg",
              "https://lys-conseil.com/wp-content/uploads/2024/01/objet3.jpg",
            ].map((uri, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedImage(uri)}>
                <Image source={{ uri }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tarifs</Text>
          <Text style={styles.cardPrice}>Sur devis</Text>
          <Text style={styles.cardNote}>
            Prestations disponibles en Île-de-France, Guadeloupe et Orléans
          </Text>
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

export default CommunicationPhotos;

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
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 22,
  },
  leftBorderPink: {
    borderLeftWidth: 4,
    borderLeftColor: "#ec4899",
    paddingLeft: 12,
  },
  leftBorderTurquoise: {
    borderLeftWidth: 4,
    borderLeftColor: "#5cb9bc",
    paddingLeft: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  cardNote: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
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
