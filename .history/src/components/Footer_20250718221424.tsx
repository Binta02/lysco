import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const Footer: React.FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth < 400 ? "100%" : "47%";

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const handleEmail = () => {
    Linking.openURL("mailto:contact@lys-and-co.com");
  };

  return (
    <View
      style={[
        styles.footerContainer,
        { backgroundColor: isDarkMode ? "#1d1d1dff" : "#f6f6f6ff" },
      ]}
    >
      <View style={styles.footer}>
        <View style={styles.gridContainer}>
          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f9fafb" : "#111827" },
              ]}
            >
              Lys&Co
            </Text>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#d1d5db" : "#4b5563" },
              ]}
            >
              Des solutions de domiciliation et de communication pour
              entrepreneurs et entreprises.
            </Text>
          </View>

          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f9fafb" : "#111827" },
              ]}
            >
              Services
            </Text>
            <FooterLink
              label="Domiciliation commerciale"
              icon="home"
              onPress={() => handleNavigate("Domiciliation")}
            />
            <FooterLink
              label="Services administratifs"
              icon="file-text"
              onPress={() => handleNavigate("ServicesAdmin")}
            />
            <FooterLink
              label="Communication & Marketing"
              icon="volume-2"
              onPress={() => handleNavigate("Communication")}
            />
          </View>

          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f9fafb" : "#111827" },
              ]}
            >
              Liens utiles
            </Text>
            <FooterLink
              label="Nos espaces de travail"
              icon="briefcase"
              onPress={() => handleNavigate("EspacesTravail")}
            />
            <FooterLink
              label="Nos Tarifs"
              icon="dollar-sign"
              onPress={() => handleNavigate("Tarifs")}
            />
            <FooterLink
              label="Nos Services Complémentaires"
              icon="plus-circle"
              onPress={() => handleNavigate("ServicesComplementaires")}
            />
          </View>

          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f9fafb" : "#111827" },
              ]}
            >
              Contact
            </Text>
            <TouchableOpacity onPress={handleEmail} style={styles.contactRow}>
              <Feather name="mail" size={16} color="#0d9488" />
              <Text style={styles.link}>contact@lys-and-co.com</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#d1d5db" : "#4b5563" },
              ]}
            >
              +33 (0)9 53 42 11 63
            </Text>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#d1d5db" : "#4b5563" },
              ]}
            >
              +33 (0)7 56 85 37 02
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text
            style={[
              styles.bottomText,
              { color: isDarkMode ? "#9ca3af" : "#4b5563" },
            ]}
          >
            © {new Date().getFullYear()} Lys&Co. Tous droits réservés.
          </Text>
        </View>
      </View>
    </View>
  );
};

const FooterLink = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.linkRow}>
    <Feather name={icon} size={16} color="#0d9488" style={{ marginRight: 6 }} />
    <Text style={styles.link}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  footer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  gridItem: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111827",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4b5563",
    marginBottom: 8,
    maxWidth: 250,
  },
  link: {
    fontSize: 14,
    color: "#f9429e",
    marginLeft: 8,
    textDecorationLine: "underline",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    color: "#4b5563",
  },
});

export default Footer;
