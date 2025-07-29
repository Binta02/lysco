import { supabase } from "@/integrations/supabase/client";
import type { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
    <View className="flex flex-col min-h-screen bg-white">
      <Navbar session={session} />

      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="py-20 px-4 bg-gradient-to-r from-lysco-turquoise/90 to-lysco-pink/90">
          <View className="max-w-3xl mx-auto text-center">
            <Text className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Solutions de domiciliation, accompagnement et de communication
              pour votre entreprise
            </Text>
            <Text className="text-lg sm:text-xl text-white opacity-90 mb-8">
              Développez votre entreprise avec Lys&Co — Communication 360° —
              Accompagnement — Domiciliation
            </Text>

            <View className="flex flex-col sm:flex-row gap-4 justify-center">
              <TouchableOpacity
                className="bg-white py-6 px-8 rounded-lg w-full sm:w-auto"
                onPress={() =>
                  navigation.navigate(session ? "Dashboard" : "Register")
                }
              >
                <Text className="text-lg text-lysco-pink font-bold text-center">
                  {session ? "Accéder à mon espace" : "Créer un compte"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="border border-white py-6 px-8 rounded-lg w-full sm:w-auto"
                onPress={() => navigation.navigate("Contact")}
              >
                <Text className="text-lg text-white font-bold text-center">
                  Nous contacter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View className="py-16 px-4">
          <View className="text-center mb-12">
            <Text className="text-3xl font-bold mb-4">
              Pourquoi choisir Lys&Co ?
            </Text>
            <Text className="text-gray-600 max-w-2xl mx-auto">
              Nous offrons des solutions complètes adaptées aux besoins de votre
              entreprise.
            </Text>
          </View>

          <View className="flex flex-wrap justify-center gap-8">
            {[
              {
                title: "Simplicité",
                desc: "Des processus simplifiés pour vous permettre de vous concentrer sur votre activité.",
                color: "bg-lysco-turquoise/10 text-lysco-turquoise",
              },
              {
                title: "Rapidité",
                desc: "Des solutions rapides et efficaces pour répondre à vos besoins immédiats.",
                color: "bg-lysco-pink/10 text-lysco-pink",
              },
              {
                title: "Sécurité",
                desc: "Protection et confidentialité garanties pour vos données et documents.",
                color: "bg-lysco-turquoise/10 text-lysco-turquoise",
              },
            ].map((item, idx) => (
              <View
                key={idx}
                className="w-full md:w-1/3 text-center p-6 rounded-lg bg-gray-50"
              >
                <View
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${item.color}`}
                >
                  <Text className="text-2xl">✓</Text>
                </View>
                <Text className="text-xl font-semibold mb-2">{item.title}</Text>
                <Text className="text-gray-600">{item.desc}</Text>
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

export default Index;
