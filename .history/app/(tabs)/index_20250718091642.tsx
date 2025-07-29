import { supabase } from "../../src/integrations/supabase/client";
import type { RootStackParamList } from "../../src/navigation/types";
// import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Footer from "../../src/components/Footer";
import Navbar from "../../src/components/Navbar";
import ServiceSection from "../../src/components/ServiceSection";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  // const navigation = useNavigation<NavigationProp>();
  const [primaryPressed, setPrimaryPressed] = useState(false);
  const [secondaryPressed, setSecondaryPressed] = useState(false);
  const router = useRouter();

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
    <View className="flex flex-col min-h-screen bg-white" style={{ flex: 1 }}>
      <Navbar session={session} />

      <ScrollView style={styles.scroll}>
        {/* Hero Section */}
        {/* <View style={styles.heroSection}> */}
        <LinearGradient
          colors={[
            "rgba(92,185,188,0.9)", // from
            "rgba(249,66,158,0.9)", // to
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Solutions de domiciliation, accompagnement et de communication
              pour votre entreprise
            </Text>
            <Text style={styles.heroSubtitle}>
              Développez votre entreprise avec Lys&Co — Communication 360° —
              Accompagnement — Domiciliation
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  primaryPressed && styles.primaryButtonPressed,
                ]}
                onPressIn={() => setPrimaryPressed(true)}
                onPressOut={() => setPrimaryPressed(false)}
                onPress={() => {
                  console.log("session is:", session);
                  const targetScreen = session
                    ? "/(tabs)/Dashboard"
                    : "/(tabs)/Register";
                  console.log("navigating to:", targetScreen);
                  router.push(targetScreen);
                }}

                // }
              >
                <Text style={styles.primaryButtonText}>
                  {session ? "Accéder à mon espace" : "Créer un compte"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  secondaryPressed && styles.secondaryButtonPressed,
                ]}
                onPressIn={() => setSecondaryPressed(true)}
                onPressOut={() => setSecondaryPressed(false)}
                onPress={() => router.push("/(tabs)/Contact")}
              >
                <Text style={styles.secondaryButtonText}>Nous contacter</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </LinearGradient>

        {/* Hero Section End */}

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresContent}>
            <Text style={styles.featuresTitle}>Pourquoi choisir Lys&Co ?</Text>
            <Text style={styles.featuresDescription}>
              Nous offrons des solutions complètes adaptées aux besoins de votre
              entreprise.
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
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: item.bgColor },
                  ]}
                >
                  <Text style={{ fontSize: 24, color: item.iconColor }}>✓</Text>
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureText}>{item.desc}</Text>
              </View>
            ))}
          </View>
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
                    router.push(
                      session ? "/(tabs)/Dashboard" : "/(tabs)/Register"
                    )
                  }
                >
                  <Text style={styles.primaryButtonText}>
                    {session ? "Accéder à mon espace" : "Créer un compte"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => router.push("/(tabs)/Contact")}
                >
                  <Text style={styles.secondaryButtonText}>Nous contacter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  section: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#111827",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  content: {
    maxWidth: 600,
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 32,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 16,
    width: "100%",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12, // plus doux
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000", // ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android
    transform: [{ scale: 1 }],
  },
  primaryButtonText: {
    fontSize: 18,
    color: "#ec4899",
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ scale: 1 }],
  },
  secondaryButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  scroll: {
    backgroundColor: "#fff",
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: "#06b6d4",
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

  primaryButtonPressed: {
    transform: [{ scale: 0.97 }], // effet press
  },

  secondaryButtonPressed: {
    transform: [{ scale: 0.97 }],
  },
});

export default Index;
