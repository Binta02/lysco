import { useSession } from "@supabase/auth-helpers-react"; // ✅ ajoute
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Navbar: React.FC<NavbarProps> = ({ onToggleMenu }) => {
  // ✅ retire session des props
  const router = useRouter();
  const session = useSession(); // ✅ ajoute ici

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/(tabs)" as any)}>
          <Text style={styles.brand}>Lys&Co</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#5cb9bc",
  },
  hamburger: {
    fontSize: 28,
    color: "#5cb9bc",
  },
});

export default Navbar;
