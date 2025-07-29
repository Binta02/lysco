import { supabase } from "@/integrations/supabase/client";
import type { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import ServiceSection from "@/src/components/ServiceSection";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
        <ScrollView style={styles.scroll}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Solutions de domiciliation, accompagnement et de communication pour votre entreprise
          </Text>
          <Text style={styles.heroSubtitle}>
            Développez votre entreprise avec Lys&Co — Communication 360° — Accompagnement — Domiciliation
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate(session ? "Dashboard" : "Register")}
            >
              <Text style={styles.primaryButtonText}>
                {session ? "Accéder à mon espace" : "Créer un compte"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Contact")}
            >
              <Text style={styles.secondaryButtonText}>
                Nous contacter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <View style={styles.featuresContent}>
          <Text style={styles.featuresTitle}>Pourquoi choisir Lys&Co ?</Text>
          <Text style={styles.featuresDescription}>
            Nous offrons des solutions complètes adaptées aux besoins de votre entreprise.
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          {[
            {
              title: "Simplicité",
              desc: "Des processus simplifiés pour vous permettre de vous concentrer sur votre activité.",
              bgColor: "#ccfbf1", // turquoise light bg
              iconColor: "#06b6d4", // turquoise
            },
            {
              title: "Rapidité",
              desc: "Des solutions rapides et efficaces pour répondre à vos besoins immédiats.",
              bgColor: "#fce7f3", // pink light bg
              iconColor: "#ec4899", // pink
            },
            {
              title: "Sécurité",
              desc: "Protection et confidentialité garanties pour vos données et documents.",
              bgColor: "#ccfbf1",
              iconColor: "#06b6d4",
            },
          ].map((item, idx) => (
            <View key={idx} style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: item.bgColor }]}>
                <Text style={{ fontSize: 24, color: item.iconColor }}>✓</Text>
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureText}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* Services Section */}
        <ServiceSection />

        {/* CTA Section */}
        <View style={styles.section}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.title}>
                Prêt à développer votre entreprise ?
              </Text>
              <Text style={styles.description}>
                Rejoignez Lys&Co dès aujourd'hui et profitez de nos services
                adaptés à vos besoins.
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton]}
                  onPress={() =>
                    navigation.navigate(session ? "Dashboard" : "Register")
                  }
                >
                  <Text style={styles.primaryButtonText}>
                    {session ? "Accéder à mon espace" : "Créer un compte"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => navigation.navigate("Contact")}
                >
                  <Text style={styles.secondaryButtonText}>Nous contacter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  section: {
    paddingVertical: 32, // py-16
    paddingHorizontal: 16, // px-4
    backgroundColor: "#111827", // gray-900
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  content: {
    maxWidth: 600, // like max-w-3xl
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 28, // text-3xl
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16, // mb-4
    textAlign: "center",
  },
  description: {
    fontSize: 18, // text-lg
    color: "rgba(255, 255, 255, 0.9)", // opacity-90
    marginBottom: 32, // mb-8
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 16, // gap-4 (React Native 0.71+)
    width: "100%",
  },
  button: {
    paddingVertical: 16, // py-6
    paddingHorizontal: 32, // px-8
    borderRadius: 8, // rounded-lg
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#ec4899", // lysco-pink
  },
  primaryButtonText: {
    fontSize: 18, // text-lg
    color: "#fff",
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#fff",
  },
  secondaryButtonText: {
    fontSize: 18, // text-lg
    color: "#fff",
    fontWeight: "bold",
  },
  scroll: {
    backgroundColor: "#fff",
  },
  heroSection: {
    paddingVertical: 40, // py-20
    paddingHorizontal: 16, // px-4
    backgroundColor: "linear-gradient(90deg, #2dd4bf, #ec4899)", // approx from-lysco-turquoise to lysco-pink
    backgroundColor: "#06b6d4", // fallback turquoise
  },
  heroContent: {
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#e0f7fa",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonGroup: {
    flexDirection: "column",
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#ec4899",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  featuresSection: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  featuresContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  featuresDescription: {
    color: "#4b5563",
    textAlign: "center",
    maxWidth: 500,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  featureCard: {
    width: "90%",
    maxWidth: 300,
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  featureText: {
    color: "#4b5563",
    textAlign: "center",
  },
});
export default Index;
