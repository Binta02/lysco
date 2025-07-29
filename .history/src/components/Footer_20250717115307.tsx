import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Footer: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const handleEmail = () => {
    Linking.openURL("mailto:contact@lys-and-co.com");
  };

  return (
    <View style={styles.footer}>
      <View style={styles.section}>
        <Text style={styles.title}>Lys&Co</Text>
        <Text style={styles.text}>
          Des solutions de domiciliation et de communication pour entrepreneurs
          et entreprises.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Services</Text>
        <TouchableOpacity onPress={() => handleNavigate("Domiciliation")}>
          <Text style={styles.link}>Domiciliation commerciale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate("ServicesAdmin")}>
          <Text style={styles.link}>Services administratifs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate("Communication")}>
          <Text style={styles.link}>Communication & Marketing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Liens utiles</Text>
        <TouchableOpacity onPress={() => handleNavigate("EspacesTravail")}>
          <Text style={styles.link}>Nos espaces de travail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate("Tarifs")}>
          <Text style={styles.link}>Nos Tarifs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigate("ServicesComplementaires")}
        >
          <Text style={styles.link}>Nos Services Complémentaires</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Contact</Text>
        <TouchableOpacity onPress={handleEmail}>
          <Text style={styles.link}>contact@lys-and-co.com</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          +33 (0)9 53 42 11 63{"\n"}
          +33 (0)7 56 85 37 02
        </Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.text}>
          © {new Date().getFullYear()} Lys&Co. Tous droits réservés.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f9fafb", // gray-50
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  text: {
    color: "#4b5563", // gray-600
    marginBottom: 8,
  },
  link: {
    color: "#0d9488", // lysco turquoise
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb", // gray-200
    marginTop: 16,
    paddingTop: 16,
    alignItems: "center",
  },
});

export default Footer;
