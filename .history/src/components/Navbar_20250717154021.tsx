import { supabase } from "@/src/integrations/supabase/client";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NavbarProps {
  session: any; // Typage à améliorer selon ton projet
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Erreur", error.message);
        return;
      }
      Alert.alert("Déconnexion réussie");
      navigation.navigate("Login" as never);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Erreur", "Une erreur inattendue est survenue");
    }
  };

  const menuItems = [
    { label: "Accueil", screen: "Home" },
    { label: "Domiciliation", screen: "Domiciliation" },
    { label: "Services Admin", screen: "ServicesAdmin" },
    { label: "Communication", screen: "Communication" },
    { label: "Contact", screen: "Contact" },
  ];

  return (
    <View>
      {/* Top bar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
          <Text style={styles.brand}>Lys&Co</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay menu */}
      {menuOpen && (
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.menuContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate(item.screen as never);
                  setMenuOpen(false);
                }}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.actions}>
              {session ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.outlineButton]}
                    onPress={() => {
                      navigation.navigate("Dashboard" as never);
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={[styles.buttonText, styles.outlineButtonText]}>
                      Dashboard
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogout}
                  >
                    <Text style={styles.buttonText}>Déconnexion</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.outlineButton]}
                  onPress={() => {
                    navigation.navigate("Login" as never);
                    setMenuOpen(false);
                  }}
                >
                  <Text style={[styles.buttonText, styles.outlineButtonText]}>
                    Connexion
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#06b6d4",
  },
  hamburger: {
    fontSize: 28,
    color: "#06b6d4",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 100,
  },
  menuContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 28,
    color: "#333",
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  actions: {
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#06b6d4",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#06b6d4",
  },
  outlineButtonText: {
    color: "#06b6d4",
  },
});

export default Navbar;
