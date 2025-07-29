import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client.js";
import { CartProvider } from "./src/components/cart/CartContext.js";

// Import Supabase types
import type {
  AuthChangeEvent,
  Session as SupabaseSession,
} from "@supabase/supabase-js";

// Import screens
import Dashboard from "./src/screens/Dashboard.js";
import Domiciliation from "./src/screens/Domiciliation.js";
import Index from "./src/screens/Index.js";
import Login from "./src/screens/Login.js";
import Register from "./src/screens/Register.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<SupabaseSession | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: SupabaseSession | null) => {
        setSession(session);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
    >
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Index} />
            <Stack.Screen name="Domiciliation" component={Domiciliation} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </StripeProvider>
  );
}
