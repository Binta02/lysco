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
  onToggleMenu: () => void; // ✅ ajouté
}

const Navbar: React.FC<NavbarProps> = ({ session, onToggleMenu }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/(tabs)" as any)}>
          <LinearGradient
            colors={["rgba(92,185,188,0.9)", "rgba(249,66,158,0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.brandGradient}
          >
            <Text style={styles.brand}>Lys&Co</Text>
          </LinearGradient>
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
    color: "#06b6d4",
  },
  hamburger: {
    fontSize: 28,
    color: "#06b6d4",
  },
  brandGradient: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navbar;
