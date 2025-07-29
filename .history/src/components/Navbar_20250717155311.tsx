import { supabase } from "@/src/integrations/supabase/client";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
    { label: "Accueil", path: "/(tabs)" },
    { label: "Domiciliation", path: "/(tabs)/Domiciliation" },
    { label: "Services Admin", path: "/(tabs)/ServicesAdmin" },
    { label: "Communication", path: "/(tabs)/Communication" },
    { label: "Contact", path: "/(tabs)/Contact" },
  ];

  return (
    <View>
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
                  router.push(item.path);
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
    </View>
  );
};
