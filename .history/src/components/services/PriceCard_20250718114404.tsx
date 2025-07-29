import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PriceCardProps {
  service: string;
  price: string;
  note?: string;
}

const PriceCard = ({ service, price, note }: PriceCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service}</Text>
      <Text style={styles.price}>{price}</Text>
      {note && <Text style={styles.note}>{note}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb", // gray-200
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827", // gray-900
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#06b6d4", // lysco turquoise
  },
  note: {
    fontSize: 14,
    color: "#6b7280", // gray-500
    marginTop: 8,
  },
});

export default PriceCard;
