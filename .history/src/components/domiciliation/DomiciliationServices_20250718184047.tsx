import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DomiciliationServices = () => {
  const router = useRouter();

  const services = [
    {
      icon: <MaterialIcons name="mail" size={24} color="#06b6d4" />,
      bgColor: "#ccfbf1",
      title: "REEX",
      description:
        "Service de réexpédition hebdomadaire de votre courrier, envois chaque mardi.",
      price: "10€",
      unit: "/mois",
      link: "/service/reexpedition-courrier",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="file-document-outline"
          size={24}
          color="#ec4899"
        />
      ),
      bgColor: "#fce7f3",
      title: "Scan de courrier",
      description:
        "Numérisation de vos courriers dès réception pour un accès immédiat à vos documents.",
      price: "5€",
      unit: "/mois",
      link: "/service/scan-courrier",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="clock-outline"
          size={24}
          color="#06b6d4"
        />
      ),
      bgColor: "#ccfbf1",
      title: "Service Colis",
      description:
        "Service de garde de colis en toute sécurité pour les professionnels et particuliers.",
      price: "6€",
      unit: "/mois",
      link: "/service/reception-colis",
    },
    {
      icon: <Ionicons name="location-outline" size={24} color="#ec4899" />,
      bgColor: "#fce7f3",
      title: "Location de bureau",
      description:
        "Espace de coworking (8 pers.) et salle de formation disponibles.",
      price: "5€",
      unit: "/heure",
      link: "/service/location-bureau",
    },
  ];

  return (
    <View style={styles.grid}>
      {services.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
            {item.icon}
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardPrice}>
            {item.price}
            <Text style={styles.cardUnit}> {item.unit}</Text>
          </Text>
          {item.title === "Location de bureau" && (
            <Text style={styles.cardNote}>À partir de</Text>
          )}
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.push(item.link)}
          >
            <Text style={styles.outlineButtonText}>En savoir plus</Text>
            <Ionicons name="chevron-forward" size={16} color="#06b6d4" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 12,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#06b6d4",
  },
  cardUnit: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#6b7280",
  },
  cardNote: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 4,
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#06b6d4",
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 8,
  },
  outlineButtonText: {
    color: "#06b6d4",
    fontWeight: "bold",
    marginRight: 6,
  },
});

export default DomiciliationServices;
