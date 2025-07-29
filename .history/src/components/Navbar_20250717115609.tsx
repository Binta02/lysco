import { supabase } from "@/integrations/supabase/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NavbarProps {
  onClose: () => void;
  session: any; // à remplacer par le type exact si dispo
}

const Navbar: React.FC<NavbarProps> = ({ onClose, session }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Erreur", error.message);
        return;
      }
      Alert.alert("Déconnexion réussie");
      navigation.navigate("Login" as never);
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Erreur", "Une erreur inattendue est survenue");
    }
  };

  return (
    <View style={styles.overlay}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Bouton de fermeture */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <MenuItem label="Accueil" screen="Home" onPress={onClose} />
        <MenuItem
          label="Domiciliation"
          screen="Domiciliation"
          onPress={onClose}
        />
        <MenuItem
          label="Services Admin"
          screen="ServicesAdmin"
          onPress={onClose}
        />
        <MenuItem
          label="Communication"
          screen="Communication"
          onPress={onClose}
        />
        <MenuItem label="Contact" screen="Contact" onPress={onClose} />

        <View style={styles.actions}>
          {session ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.outlineButton]}
                onPress={() => {
                  navigation.navigate("Dashboard" as never);
                  onClose();
                }}
              >
                <Text style={[styles.buttonText, styles.outlineButtonText]}>
                  Dashboard
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Déconnexion</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={() => {
                navigation.navigate("Login" as never);
                onClose();
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
  );
};

const MenuItem = ({
  label,
  screen,
  onPress,
}: {
  label: string;
  screen: string;
  onPress: () => void;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        navigation.navigate(screen as never);
        onPress();
      }}
    >
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 50,
  },
  container: {
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
    backgroundColor: "#16a34a", // vert Lys&Co (ex: turquoise)
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#16a34a",
  },
  outlineButtonText: {
    color: "#16a34a",
  },
});

export default Navbar;
