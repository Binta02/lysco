import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../../src/components/Footer";
import Navbar from "../../src/components/Navbar";
import { supabase } from "../../src/integrations/supabase/client";
import type { RootStackParamList } from "../../src/navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
// type LoginRouteProp = RouteProp<RootStackParamList, "Login">;

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  // const route = useRoute<LoginRouteProp>();
  const { redirect } = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountDisabledMessage, setAccountDisabledMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // const redirectUrl = route.params?.redirect;
  const redirectUrl = redirect;

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigation.navigate("Dashboard");
      }
    };
    checkSession();
  }, [navigation, redirectUrl]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    setIsLoading(true);
    setAccountDisabledMessage("");

    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        Alert.alert("Erreur de connexion", signInError.message);
        return;
      }

      const user = signInData?.user;
      if (!user) {
        Alert.alert("Erreur", "Utilisateur introuvable après connexion.");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("deleted_at")
        .eq("id", user.id)
        .single();

      if (profileError) {
        Alert.alert("Erreur", "Impossible de vérifier l'état du compte.");
        return;
      }

      if (profileData?.deleted_at) {
        setAccountDisabledMessage(
          "Votre compte a été désactivé. Contactez le support ou utilisez le lien de réactivation."
        );
        await supabase.auth.signOut();
        return;
      }

      Alert.alert("Connexion réussie", "Bienvenue sur Lys&Co !");
      navigation.navigate("Dashboard");
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Erreur", "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert(
        "Email requis",
        "Veuillez entrer votre email pour réinitialiser votre mot de passe."
      );
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.EXPO_PUBLIC_APP_URL}/reset-password`,
      });

      if (error) {
        Alert.alert("Erreur", error.message);
        return;
      }

      Alert.alert(
        "Email envoyé",
        "Veuillez vérifier votre boîte mail pour réinitialiser votre mot de passe."
      );
    } catch (err) {
      console.error("Reset password error:", err);
      Alert.alert("Erreur", "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <Navbar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 16,
            width: "100%",
            maxWidth: 400,
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Connexion
          </Text>
          <Text
            style={{ textAlign: "center", marginBottom: 20, color: "#6b7280" }}
          >
            Entrez vos identifiants pour accéder à votre compte
          </Text>

          {/* Email */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#d1d5db",
              borderRadius: 8,
              backgroundColor: "#fff",
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <Feather name="mail" size={20} color="#9ca3af" />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Mot de passe */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#d1d5db",
              borderRadius: 8,
              backgroundColor: "#fff",
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <Feather name="lock" size={20} color="#9ca3af" />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>

          {/* Message compte désactivé */}
          {accountDisabledMessage ? (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {accountDisabledMessage}
            </Text>
          ) : null}

          {/* Bouton login */}
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#00bcd4",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Text>
          </TouchableOpacity>

          {/* Mot de passe oublié */}
          <TouchableOpacity
            onPress={handleResetPassword}
            style={{ marginBottom: 20 }}
          >
            <Text
              style={{ color: "#00bcd4", textAlign: "center", fontSize: 12 }}
            >
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          {/* Pas encore de compte */}
          <View style={{ alignItems: "center" }}>
            <Text>
              Pas encore de compte ?{" "}
              <Text
                style={{ color: "#ec407a", textDecorationLine: "underline" }}
                onPress={() => navigation.navigate("Register")}
              >
                Créer un compte
              </Text>
            </Text>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
};
export default Login;
