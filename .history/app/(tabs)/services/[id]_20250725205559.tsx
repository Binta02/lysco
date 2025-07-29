import { useCart } from "@/src/components/cart/CartContext";
import Footer from "@/src/components/Footer";
import { useToast } from "@/src/hooks/useToast";
import { Session } from "@supabase/supabase-js";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
// 📁 src/components/reservations/ReservationForm.tsx
import { supabase } from "@/integrations/supabase/client";
import ReservationForm from "@/src/components/reservations/ReservationForm";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductDescription from "../../../src/components/services/ProductDescription";
import serviceData from "../../../src/data/data";

export default function ServiceDetailPage() {
  const { id } = useLocalSearchParams();
  const key = id as keyof typeof serviceData;
  const service = serviceData[key];
  const [session, setSession] = useState<Session | null>(null);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    return () => subscription.unsubscribe();
  }, []);
  const handleAddToCart = () => {
    if (!session) {
      router.push("/(tabs)/Login");
      return;
    }

    if (!service) return;

    addItem({
      id: key,
      title: service.title,
      price: parseFloat(service.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Ajouté au panier",
      description: `${service.title} a été ajouté à votre panier.`,
    });
  };
  // console.log("Clé reçue depuis l'URL :", key);
  // console.log(
  //   "Est-ce un service réservable ? :",
  //   ["coworking-space", "location-bureau", "formation-room"].includes(key)
  // );

  if (!service) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Service introuvable</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              marginBottom: 16,
              alignSelf: "flex-start",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: "#5cb9bc",
              borderRadius: 8,
            }}
            onPress={() => router.back()}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>← Retour</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.title}>{service.title}</Text>

            {service.originalPrice ? (
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>{service.originalPrice} €</Text>
                <Text style={styles.price}>
                  {service.price} €
                  {service.priceUnit ? (
                    <Text style={{ fontSize: 14, color: "#6b7280" }}>
                      {" "}
                      {service.priceUnit}
                    </Text>
                  ) : null}
                </Text>
              </View>
            ) : (
              <Text style={styles.price}>
                {service.price} €
                {service.priceUnit ? (
                  <Text style={{ fontSize: 14, color: "#6b7280" }}>
                    {" "}
                    {service.priceUnit}
                  </Text>
                ) : null}
              </Text>
            )}

            {service.note && <Text style={styles.note}>{service.note}</Text>}
            <Text style={styles.description}>{service.description}</Text>
            {["coworking-space", "location-bureau", "formation-room"].includes(
              key
            ) ? null : (
              <TouchableOpacity
                style={{
                  backgroundColor: session ? "#5cb9bc" : "#aaa",
                  paddingVertical: 12,
                  borderRadius: 30,
                  alignItems: "center",
                  marginTop: 16,
                }}
                onPress={handleAddToCart}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {session ? "Ajouter au panier" : "Connectez-vous"}
                </Text>
              </TouchableOpacity>
            )}

            {["coworking-space", "location-bureau", "formation-room"].includes(
              key
            ) && <ReservationForm serviceType={key} />}
            <View style={styles.separator} />

            <ProductDescription />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 16,
    color: "#9ca3af", // gris clair
    textDecorationLine: "line-through",
    marginRight: 8,
  },

  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 4,
  },
  note: {
    fontSize: 12,
    color: "#f9429e",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },
});
