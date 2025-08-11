import Footer from "@/src/components/Footer";
import { supabase } from "@/src/integrations/supabase/client";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Contact: React.FC = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    if (form.firstName.length < 2)
      return "Le prénom doit contenir au moins 2 caractères.";
    if (form.lastName.length < 2)
      return "Le nom doit contenir au moins 2 caractères.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Adresse email invalide.";
    if (form.subject.length < 3)
      return "Le sujet doit contenir au moins 3 caractères.";
    if (form.message.length < 10)
      return "Le message doit contenir au moins 10 caractères.";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      Alert.alert("Erreur", error);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        "https://mon-backend-node.vercel.app/api/send-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const json = await res.json();

      if (res.ok && json.status === "success") {
        Alert.alert("Succès", "Votre message a bien été envoyé.");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        Alert.alert("Erreur", json.error || "Une erreur est survenue.");
      }
    } catch (err) {
      Alert.alert("Erreur de connexion", "Impossible de joindre le serveur.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container1}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={["#5cb9bc", "#f9429e"]} // tes couleurs principales !
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>Contactez-nous</Text>
          <Text style={styles.heroSubtitle}>
            Notre équipe est à votre disposition pour répondre à vos questions.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Coordonnées */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nos coordonnées</Text>

            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#5cb9bc" />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Adresse</Text>
                <Text style={styles.sectionItem}>
                  28 Rue de l'Eglise, 95210 Deuil-la-Barre
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color="#5cb9bc" />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Téléphone</Text>
                <Text style={styles.sectionItem}>
                  09 53 42 11 63 / 07 56 85 37 02
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#5cb9bc" />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text
                  style={[styles.sectionItem, styles.link]}
                  onPress={() =>
                    Linking.openURL("mailto:contact@lys-and-co.com")
                  }
                >
                  contact@lys-and-co.com
                </Text>
              </View>
            </View>
          </View>

          {/* Formulaire */}
          <View style={styles.formCard}>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={form.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={form.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Sujet"
              value={form.subject}
              onChangeText={(text) => handleChange("subject", text)}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Votre message..."
              multiline
              value={form.message}
              onChangeText={(text) => handleChange("message", text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.buttonText}>
                {submitting ? "Envoi en cours..." : "Envoyer"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </ScrollView>
      {/* GLOBAL OVERLAY */}
      {menuOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            zIndex: 9999,
            elevation: 9999,
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingTop: 90, paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 50, right: 20, padding: 10 }}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={{ fontSize: 28, color: "#333" }}>✕</Text>
            </TouchableOpacity>

            {[
              { label: "Accueil", path: "/(app)" },
              { label: "Domiciliation", path: "/(app)/Domiciliation" },
              { label: "Services Admin", path: "/(app)/ServicesAdmin" },
              { label: "Communication", path: "/(app)/Communication" },
              { label: "Contact", path: "/(app)/Contact" },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: "#eee",
                }}
                onPress={() => {
                  router.push(item.path as any);
                  setMenuOpen(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#333" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={{ marginTop: 30 }}>
              {session ? (
                <>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      alignItems: "center",
                      borderRadius: 6,
                      backgroundColor: "#5cb9bc",
                      marginBottom: 12,
                    }}
                    onPress={() => {
                      router.push("/(app)/Dashboard" as any);
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Dashboard
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      alignItems: "center",
                      borderRadius: 6,
                      backgroundColor: "#5cb9bc",
                    }}
                    onPress={async () => {
                      const { error } = await supabase.auth.signOut();
                      if (error) {
                        Alert.alert("Erreur", error.message);
                        return;
                      }
                      Alert.alert("Déconnexion réussie");
                      router.push("/(app)/Login" as any);
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Déconnexion
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    alignItems: "center",
                    borderRadius: 6,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#5cb9bc",
                  }}
                  onPress={() => {
                    router.push("/(app)/Login" as any);
                    setMenuOpen(false);
                  }}
                >
                  <Text style={{ color: "#5cb9bc", fontWeight: "bold" }}>
                    Connexion
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#f9fafb",
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  hero: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    marginBottom: 24,
    width: "100%", // assure que ça prend toute la largeur
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  section: {
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 16,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  sectionItem: {
    fontSize: 14,
    color: "#475569",
  },
  link: {
    color: "#f9429e",
    textDecorationLine: "underline",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#f0fdfa",
    textAlign: "center",
    lineHeight: 20,
  },
  content: {
    gap: 16,
    backgroundColor: "#f9fafb",
  },

  formCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f9429e",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Contact;
