// App.tsx (React Native)
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { supabase } from "./integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import FloatingCartButton from "./components/cart/FloatingCartButton";

// Import screens (anciennement pages)
import Index from "./screens/Index";
import Domiciliation from "./screens/Domiciliation";
import ServicesAdmin from "./screens/ServicesAdmin";
// ... (importe les autres comme tu faisais)

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Index} />
          <Stack.Screen name="Domiciliation" component={Domiciliation} />
          <Stack.Screen name="ServicesAdmin" component={ServicesAdmin} />
          {/* ➤ Ajoute ici tous les autres écrans, exemple :
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Contact" component={Contact} />
          */}
        </Stack.Navigator>
      </NavigationContainer>
      {session && <FloatingCartButton />}
    </StripeProvider>
  );
}
