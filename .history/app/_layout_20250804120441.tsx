// ✅ Patch pour structuredClone si absent (par ex. dans Hermes / Expo Go / vieux env)
if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import { CartProvider } from "@/src/components/cart/CartContext";
import { FloatingCartButton } from "@/src/components/cart/FloatingCartButton";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import Navbar from "@/src/components/Navbar";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { supabase } from "@/src/integrations/supabase/client";
import { StripeProvider } from "@stripe/stripe-react-native"; // ✅ import StripeProvider
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [session, setSession] = useState<any>(null);

  // Gestion de la session Supabase
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      subscription;
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_51RRqyJQ5vrwB5bWySCHV4chEWIRZ9hLs3mhaMa5LCLLsIFsdKdC14nvXWJyCwqwwNMRkYlWb1XKoSHdJUxFMlIbn00fQW4quLR">
      <CartProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <PaperProvider>
            <Navbar />
            {/* <Stack>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack> */}
            <Stack>
              <Stack screenOptions={{ headerShown: false }} />
            </Stack>
            {session && <FloatingCartButton />}

            <Toast />
            <StatusBar style="auto" />
          </PaperProvider>
        </ThemeProvider>
      </CartProvider>
    </StripeProvider>
  );
}
