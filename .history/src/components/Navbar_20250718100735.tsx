import { supabase } from "@/src/integrations/supabase/client";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NavbarProps {
  session: any;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Erreur", error.message);
        return;
      }
      Alert.alert("Déconnexion réussie");
      router.push("/(tabs)/Login");
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Erreur", "Une erreur inattendue est survenue");
    }
  };

  const menuItems = [
    { label: "Accueil", path: "/(tabs)" as const },
    { label: "Domiciliation", path: "/(tabs)/Domiciliation" as const },
    { label: "Services Admin", path: "/(tabs)/ServicesAdmin" as const },
    { label: "Communication", path: "/(tabs)/Communication" as const },
    { label: "Contact", path: "/(tabs)/Contact" as const },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text style={styles.brand}>Lys&Co</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>

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
                  router.push(item.path as any);
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
                      router.push("/(tabs)/Dashboard");
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
                    router.push("/(tabs)/Login");
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
