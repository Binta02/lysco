import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type ViewProps = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

type TextProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
};

export const Card = ({ children, style }: ViewProps) => (
  <View style={[styles.card, style]}>{children}</View>
);

export const CardHeader = ({ children, style }: ViewProps) => (
  <View style={[styles.cardHeader, style]}>{children}</View>
);

export const CardContent = ({ children, style }: ViewProps) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

export const CardFooter = ({ children, style }: ViewProps) => (
  <View style={[styles.cardFooter, style]}>{children}</View>
);

export const CardTitle = ({ children, style }: TextProps) => (
  <Text style={[styles.cardTitle, style]}>{children}</Text>
);

export const CardDescription = ({ children, style }: TextProps) => (
  <Text style={[styles.cardDescription, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb", // gray-200
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "column",
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280", // gray-500
    marginTop: 4,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
});
