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
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Text style={styles.sectionTitle}>Lys&Co</Text>
          <Text style={styles.text}>
            Des solutions de domiciliation et de communication pour
            entrepreneurs et entreprises.
          </Text>
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.sectionTitle}>Services</Text>
          <FooterLink
            label="Domiciliation commerciale"
            onPress={() => handleNavigate("Domiciliation")}
          />
          <FooterLink
            label="Services administratifs"
            onPress={() => handleNavigate("ServicesAdmin")}
          />
          <FooterLink
            label="Communication & Marketing"
            onPress={() => handleNavigate("Communication")}
          />
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.sectionTitle}>Liens utiles</Text>
          <FooterLink
            label="Nos espaces de travail"
            onPress={() => handleNavigate("EspacesTravail")}
          />
          <FooterLink
            label="Nos Tarifs"
            onPress={() => handleNavigate("Tarifs")}
          />
          <FooterLink
            label="Nos Services Complémentaires"
            onPress={() => handleNavigate("ServicesComplementaires")}
          />
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity onPress={handleEmail}>
            <Text style={styles.link}>contact@lys-and-co.com</Text>
          </TouchableOpacity>
          <Text style={styles.text}>+33 (0)9 53 42 11 63</Text>
          <Text style={styles.text}>+33 (0)7 56 85 37 02</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          © {new Date().getFullYear()} Lys&Co. Tous droits réservés.
        </Text>
      </View>
    </View>
  );
};

const FooterLink = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.linkTouchable}>
    <Text style={styles.link}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f9fafb", // gray-50
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "47%", // two columns on larger screens
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827", // gray-900
  },
  text: {
    fontSize: 14,
    color: "#4b5563", // gray-600
    marginBottom: 8,
    lineHeight: 20,
  },
  linkTouchable: {
    marginBottom: 4,
  },
  link: {
    fontSize: 14,
    color: "#0d9488", // lysco turquoise
    textDecorationLine: "underline",
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb", // gray-200
    marginTop: 24,
    paddingTop: 16,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    color: "#4b5563",
  },
});

export default Footer;
