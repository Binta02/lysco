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
        { backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb" },
      ]}
    >
      <View style={styles.footer}>
        <View style={styles.gridContainer}>
          {/* À propos */}
          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.brandTitle,
                { color: isDarkMode ? "#f8fafc" : "#111827" },
              ]}
            >
              LYS&CO
            </Text>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#94a3b8" : "#475569" },
              ]}
            >
              Domiciliation, communication et services administratifs sur mesure
              pour les professionnels exigeants.
            </Text>
          </View>

          {/* Services */}
          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f8fafc" : "#111827" },
              ]}
            >
              Services
            </Text>
            <FooterLink
              label="Domiciliation"
              onPress={() => handleNavigate("Domiciliation")}
            />
            <FooterLink
              label="Administratif"
              onPress={() => handleNavigate("ServicesAdmin")}
            />
            <FooterLink
              label="Marketing"
              onPress={() => handleNavigate("Communication")}
            />
          </View>

          {/* Liens utiles */}
          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f8fafc" : "#111827" },
              ]}
            >
              Liens utiles
            </Text>
            <FooterLink
              label="Espaces de travail"
              onPress={() => handleNavigate("EspacesTravail")}
            />
            <FooterLink
              label="Tarifs"
              onPress={() => handleNavigate("Tarifs")}
            />
            <FooterLink
              label="Services Plus"
              onPress={() => handleNavigate("ServicesComplementaires")}
            />
          </View>

          {/* Contact */}
          <View style={[styles.gridItem, { width: itemWidth }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#f8fafc" : "#111827" },
              ]}
            >
              Contact
            </Text>
            <TouchableOpacity onPress={handleEmail} style={styles.linkRow}>
              <Text style={styles.arrow}>›</Text>
              <Text style={styles.link}>contact@lys-and-co.com</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#94a3b8" : "#475569" },
              ]}
            >
              +33 (0)9 53 42 11 63
            </Text>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#94a3b8" : "#475569" },
              ]}
            >
              +33 (0)7 56 85 37 02
            </Text>
          </View>
        </View>

        {/* Bas de page */}
        <View style={styles.bottom}>
          <Text
            style={[
              styles.bottomText,
              { color: isDarkMode ? "#94a3b8" : "#475569" },
            ]}
          >
            © {new Date().getFullYear()} Lys&Co — Tous droits réservés.
          </Text>
        </View>
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
  <TouchableOpacity onPress={onPress} style={styles.linkRow}>
    <Text style={styles.arrow}>›</Text>
    <Text style={styles.link}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginTop: 48,
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
    marginBottom: 32,
  },
  gridItem: {
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 12,
    color: "#111827",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
    maxWidth: 280,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  arrow: {
    fontSize: 18,
    color: "#5cb9bc",
    marginRight: 6,
  },
  link: {
    fontSize: 16,
    color: "#5cb9bc",
    textDecorationLine: "underline",
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 16,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 13,
    color: "#64748b",
  },
});

export default Footer;
