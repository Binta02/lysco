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
          <View style={{ alignSelf: "flex-start" }}>
            <MaskedView maskElement={<Text style={styles.brand}>Lys&Co</Text>}>
              <LinearGradient
                colors={["#06b6d4", "#ec4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientText}
              />
            </MaskedView>
          </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  gradientText: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 0, // pas de padding fantôme
    paddingVertical: 0,
  },

  hamburger: {
    fontSize: 28,
    color: "#06b6d4",
  },
});

export default Navbar;
