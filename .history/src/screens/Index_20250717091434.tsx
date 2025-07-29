import { supabase } from "@/integrations/supabase/client";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Importe tes composants React Native adaptés
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/ServiceSection";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigation = useNavigation();

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

  const startLink = session ? "Dashboard" : "Register";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navbar />

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Hero Section */}
        <View style={{ padding: 20, backgroundColor: "#00bcd4" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Solutions de domiciliation, accompagnement et de communication
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#e0f7fa",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Développez votre entreprise avec Lys&Co - Communication 360° -
            Accompagnement - Domiciliation
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <TouchableOpacity
              style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8 }}
              onPress={() => navigation.navigate(startLink)}
            >
              <Text style={{ color: "#ec407a", fontWeight: "bold" }}>
                {session ? "Accéder à mon espace" : "Créer un compte"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#fff",
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate("Contact")}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Nous contacter
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Pourquoi choisir Lys&Co ?
          </Text>
          <Text
            style={{ textAlign: "center", color: "#666", marginBottom: 20 }}
          >
            Nous offrons des solutions complètes adaptées aux besoins de votre
            entreprise.
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {[
              {
                title: "Simplicité",
                desc: "Des processus simplifiés pour vous permettre de vous concentrer sur votre activité.",
              },
              {
                title: "Rapidité",
                desc: "Des solutions rapides et efficaces pour répondre à vos besoins immédiats.",
              },
              {
                title: "Sécurité",
                desc: "Protection et confidentialité garanties pour vos données et documents.",
              },
            ].map((item, idx) => (
              <View
                key={idx}
                style={{
                  width: "45%",
                  marginBottom: 20,
                  backgroundColor: "#f9f9f9",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ textAlign: "center", color: "#666" }}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Services Section */}
        <ServiceSection />

        {/* CTA Section */}
        <View style={{ backgroundColor: "#333", padding: 20, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
              marginBottom: 10,
            }}
          >
            Prêt à développer votre entreprise ?
          </Text>
          <Text
            style={{ textAlign: "center", color: "#ccc", marginBottom: 20 }}
          >
            Rejoignez Lys&Co dès aujourd'hui et profitez de nos services adaptés
            à vos besoins.
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ec407a",
                padding: 12,
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate(startLink)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {session ? "Accéder à mon espace" : "Créer un compte"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#fff",
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate("Contact")}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Nous contacter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default Index;
