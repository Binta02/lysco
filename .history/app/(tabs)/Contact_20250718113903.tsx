import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import {
  Alert,
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
      <Navbar session={session} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Contactez-nous</Text>
          <Text style={styles.heroSubtitle}>
            Notre équipe est à votre disposition pour répondre à vos questions.
          </Text>
        </View>

        <View style={styles.content}>
          {/* Coordonnées */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nos coordonnées</Text>
            <Text style={styles.sectionItem}>
              📍 28 Rue de l'Eglise, 95210 Deuil-la-Barre
            </Text>
            <Text style={styles.sectionItem}>
              📞 09 53 42 11 63 / 07 56 85 37 02
            </Text>
            <Text
              style={[styles.sectionItem, styles.link]}
              onPress={() => Linking.openURL("mailto:contact@lys-and-co.com")}
            >
              📧 contact@lys-and-co.com
            </Text>
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
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  hero: {
    backgroundColor: "#ccfbf1",
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
  },
  content: {
    marginTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionItem: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
  },
  link: {
    color: "#0d9488",
    textDecorationLine: "underline",
  },
  formCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: "#06b6d4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Contact;
