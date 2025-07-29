import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string; // route name pour react-navigation
  color?: "turquoise" | "pink";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  color = "turquoise",
}) => {
  const navigation = useNavigation();

  const colorStyles = color === "turquoise" ? styles.turquoise : styles.pink;

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, colorStyles]}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity
        style={[styles.button, colorStyles]}
        onPress={() => navigation.navigate(link as never)}
      >
        <Text style={styles.buttonText}>En savoir plus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  turquoise: {
    backgroundColor: "#ccfbf1", // light turquoise bg
  },
  pink: {
    backgroundColor: "#fce7f3", // light pink bg
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#4b5563", // gray-600
    marginBottom: 16,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default ServiceCard;
