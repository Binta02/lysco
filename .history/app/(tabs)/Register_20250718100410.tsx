import { supabase } from "@/integrations/supabase/client";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import type { RootStackParamList } from "@/src/navigation/types";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
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
  const [session, setSession] = useState<Session | null>(null);

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
        <View style={styles.card}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Inscrivez-vous pour accéder à nos services
          </Text>

          {/* Prénom */}
          <View style={styles.inputRow}>
            <Feather name="user" size={20} color="#9ca3af" />
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Nom */}
          <View style={styles.inputRow}>
            <Feather name="user" size={20} color="#9ca3af" />
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputRow}>
            <Feather name="mail" size={20} color="#9ca3af" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Mot de passe */}
          <View
            style={[
              styles.inputRow,
              { borderColor: passwordError ? "red" : "#d1d5db" },
            ]}
          >
            <Feather name="lock" size={20} color="#9ca3af" />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                setPasswordError(!isPasswordValid(val));
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>

          {passwordError && (
            <Text style={styles.errorText}>
              Le mot de passe doit contenir : 1 minuscule, 1 majuscule, 1
              chiffre et 1 caractère spécial.
            </Text>
          )}

          {/* Bouton inscription */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>

          {/* Lien vers login */}
          <View style={{ alignItems: "center" }}>
            <Text>
              Déjà un compte ?{" "}
              <Text
                style={styles.link}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 500,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6b7280",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ec407a",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#00bcd4",
    textDecorationLine: "underline",
  },
});

export default Register;
