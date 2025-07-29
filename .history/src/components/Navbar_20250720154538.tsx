import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../integrations/supabase/client";
import Footer from "./Footer";

const Navbar: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Accueil", path: "/(tabs)" },
    { label: "Domiciliation", path: "/(tabs)/Domiciliation" },
    { label: "Services Admin", path: "/(tabs)/ServicesAdmin" },
    { label: "Communication", path: "/(tabs)/Communication" },
    { label: "Contact", path: "/(tabs)/Contact" },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Erreur", error.message);
      return;
    }
    Alert.alert("Déconnexion réussie");
    router.push("/(tabs)/Login");
    setMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text style={styles.brand}>Lys&Co</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* GLOBAL OVERLAY */}
      {menuOpen && (
        <View style={styles.menuOverlay}>
          <ScrollView contentContainerStyle={styles.menuContent}>
            <TouchableOpacity
              style={styles.menuCloseButton}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={styles.menuCloseIcon}>✕</Text>
            </TouchableOpacity>

            {menuItems.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={() => {
                  router.push(item.path as any);
                  setMenuOpen(false);
                }}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.menuAuthSection}>
              {session ? (
                <>
                  <TouchableOpacity
                    style={[styles.menuButton, { backgroundColor: "#06b6d4" }]}
                    onPress={() => {
                      router.push("/(tabs)/Dashboard");
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={styles.menuButtonText}>Dashboard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.menuButton, { backgroundColor: "#06b6d4" }]}
                    onPress={handleLogout}
                  >
                    <Text style={styles.menuButtonText}>Déconnexion</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.menuButton,
                    { backgroundColor: "#fff", borderColor: "#06b6d4" },
                  ]}
                  onPress={() => {
                    router.push("/(tabs)/Login");
                    setMenuOpen(false);
                  }}
                >
                  <Text style={[styles.menuButtonText, { color: "#06b6d4" }]}>
                    Connexion
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Footer />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    position: "relative",
    zIndex: 10,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#5cb9bc",
  },
  hamburger: {
    fontSize: 28,
    color: "#5cb9bc",
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 9999,
    elevation: 9999,
  },
  menuContent: {
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  menuCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
  },
  menuCloseIcon: {
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
  menuAuthSection: {
    marginTop: 30,
  },
  menuButton: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
  },
  menuButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Navbar;
