import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client.js";
import { CartProvider } from "./src/components/cart/CartContext.js";

// Import screens
import Contact from "./app/(tabs)/Contact.js";
import Dashboard from "./app/(tabs)/Dashboard.js";
import Domiciliation from "./app/(tabs)/Domiciliation.js";
import Login from "./app/(tabs)/Login.js";
import Register from "./app/(tabs)/Register.js";

const Stack = createNativeStackNavigator();

// Get proper session type dynamically from supabase client
type SessionType = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];

type AuthChangeEventType = Parameters<
  Parameters<typeof supabase.auth.onAuthStateChange>[0]
>[0];

export default function App() {
  const [session, setSession] = useState<SessionType | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEventType, sessionData: SessionType | null) => {
        setSession(sessionData);
      }
    );

    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: SessionType | null } }) => {
        setSession(data.session);
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
            <Stack.Screen name="Domiciliation" component={Domiciliation} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Contact" component={Contact} /> // Placeholder
            for Contact screen
            {/* <Stack.Screen name="Footer" component={Footer} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </StripeProvider>
  );
}
