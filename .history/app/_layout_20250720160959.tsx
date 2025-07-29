// ✅ Patch pour structuredClone si absent (par ex. dans Hermes / Expo Go / vieux env)
if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import { CartProvider } from "@/src/components/cart/CartContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Navbar />
        <CartProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </CartProvider>
        <Footer />
      </View>
      <Toast />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
