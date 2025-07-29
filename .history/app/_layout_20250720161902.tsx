import { CartProvider } from "@/src/components/cart/CartContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ScrollView, View } from "react-native";
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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <CartProvider>
          <View style={{ flex: 1 }}>
            <Navbar />
            <ScrollView
              style={styles.container1}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </View>
              <Footer />
            </ScrollView>
          </View>
          <Toast />
          <StatusBar style="auto" />
        </CartProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = {
  container1: {
    flex: 1,
  },
};
