import { supabase } from "@/integrations/supabase/client";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import type { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Register = () => {
  const navigation = useNavigation<NavigationProp>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isPasswordValid = (pwd: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|<>?,./`~]).{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async () => {
    if (!isPasswordValid(password)) {
      setPasswordError(true);
      Alert.alert(
        "Mot de passe invalide",
        "Le mot de passe doit contenir : 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial."
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        if (
          error.message.includes("already registered") ||
          error.message.includes("Email already in use")
        ) {
          Alert.alert(
            "Cet email est déjà associé à un compte",
            "Essayez de vous connecter ou de réinitialiser votre mot de passe."
          );
        } else {
          Alert.alert("Erreur", error.message);
        }
        return;
      }

      if (data.user) {
        Alert.alert(
          "Inscription réussie",
          "Vous êtes maintenant inscrit. Bienvenue chez Lys&Co!",
          [{ text: "OK", onPress: () => navigation.navigate("Dashboard") }]
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      Alert.alert("Erreur", "Une erreur inattendue est survenue");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Navbar session={session} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 8 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Créer un compte
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            Inscrivez-vous pour accéder à nos services
          </Text>

          {/* Prénom & Nom */}
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <TextInput
              style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 6 }}
              placeholder="Prénom"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 6 }}
              placeholder="Nom"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email */}
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              marginBottom: 10,
            }}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Mot de passe */}
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              marginBottom: passwordError ? 5 : 10,
              borderColor: passwordError ? "red" : "#ccc",
            }}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(val) => {
              setPassword(val);
              setPasswordError(!isPasswordValid(val));
            }}
          />
          {passwordError && (
            <Text style={{ color: "red", fontSize: 12, marginBottom: 10 }}>
              Le mot de passe doit contenir : 1 minuscule, 1 majuscule, 1
              chiffre et 1 caractère spécial.
            </Text>
          )}

          {/* Afficher/Masquer mot de passe */}
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ alignSelf: "flex-end", marginBottom: 20 }}
          >
            <Text style={{ color: "#007aff" }}>
              {showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"}
            </Text>
          </TouchableOpacity>

          {/* Bouton inscription */}
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: "#ec407a",
              padding: 12,
              borderRadius: 6,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              S'inscrire
            </Text>
          </TouchableOpacity>

          {/* Lien vers login */}
          <View style={{ alignItems: "center" }}>
            <Text>
              Déjà un compte ?{" "}
              <Text
                style={{ color: "#00bcd4", textDecorationLine: "underline" }}
                onPress={() => navigation.navigate("Login")}
              >
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default Register;
