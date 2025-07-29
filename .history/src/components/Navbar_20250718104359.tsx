import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NavbarProps {
  session: any;
  onToggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ session, onToggleMenu }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/(tabs)" as any)}>
          <MaskedView
            maskElement={
              <Text style={styles.brand}>Lys&Co</Text> // sert de forme au dégradé
            }
          >
            <LinearGradient
              colors={["#06b6d4", "#ec4899"]} // turquoise → rose
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToggleMenu}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#fff",
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black", // couleur utilisée uniquement pour le masque
  },
  hamburger: {
    fontSize: 28,
    color: "#06b6d4",
  },
});

export default Navbar;
