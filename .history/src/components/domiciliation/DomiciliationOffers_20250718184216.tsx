import { supabase } from "@/src/integrations/supabase/client";
import { Ionicons } from "@expo/vector-icons";
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

interface OfferProps {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  isPromo?: boolean;
  link: string;
}

const offers: OfferProps[] = [
  {
    id: "domiciliation-1an-entreprise",
    title: "Domiciliation 1 an – Entreprise",
    price: "361,80",
    originalPrice: "432,00",
    isPromo: true,
    link: "/domiciliation/1-an-entreprise",
  },
  {
    id: "domiciliation-3mois-entreprise",
    title: "Domiciliation 3 mois – Entreprise",
    price: "108,00",
    link: "/domiciliation/3-mois-entreprise",
  },
  {
    id: "domiciliation-3mois-micro",
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: "72,00",
    link: "/domiciliation/3-mois-micro-entreprise",
  },
  {
    id: "domiciliation-6mois-entreprise",
    title: "Domiciliation 6 mois – Entreprise",
    price: "162,00",
    originalPrice: "216,00",
    isPromo: true,
    link: "/domiciliation/6-mois-entreprise",
  },
  {
    id: "domiciliation-6mois-micro",
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: "108,00",
    originalPrice: "144,00",
    isPromo: true,
    link: "/domiciliation/6-mois-micro-entreprise",
  },
  {
    id: "pack-domicilie",
    title: "Pack domicilié",
    price: "1514,00",
    link: "/domiciliation/pack-domicilie",
  },
];

const DomiciliationOffers = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nos offres de domiciliation</Text>
      <Text style={styles.subtitle}>
        Pour plus de flexibilité, optez pour nos forfaits prépayés de 3 mois, 6
        mois ou 1 an
      </Text>

      <View style={styles.grid}>
        {offers.map((offer) => (
          <View key={offer.id} style={styles.card}>
            {offer.isPromo && (
              <View style={styles.promoBadge}>
                <Text style={styles.promoText}>Promo !</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => router.push(offer.link as any)}>
              <Text style={styles.cardTitle}>{offer.title}</Text>
            </TouchableOpacity>
            {offer.isPromo && offer.originalPrice && (
              <Text style={styles.oldPrice}>{offer.originalPrice} €</Text>
            )}
            <Text style={styles.price}>{offer.price} €</Text>

            <View style={styles.buttonContainer}>
              {session ? (
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="cart-outline" size={16} color="#fff" />
                  <Text style={styles.addButtonText}>Ajouter au panier</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: "#aaa" }]}
                  onPress={() => router.push("/(tabs)/Login" as any)}
                >
                  <Text style={styles.addButtonText}>Connectez-vous</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.outlineButton}
                onPress={() => router.push(offer.link as any)}
              >
                <Text style={styles.outlineButtonText}>Voir les détails</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: "#ec4899", marginTop: 20 },
        ]}
        onPress={() => router.push("/demande-devis" as any)}
      >
        <Text style={styles.addButtonText}>Demander un devis personnalisé</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: { textAlign: "center", color: "#555", marginBottom: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  promoBadge: {
    backgroundColor: "#fee2e2",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 6,
  },
  promoText: { color: "#dc2626", fontSize: 12, fontWeight: "600" },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  oldPrice: { textDecorationLine: "line-through", color: "#999", fontSize: 14 },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#06b6d4",
    marginBottom: 10,
  },
  buttonContainer: { flexDirection: "column", gap: 8 },
  addButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#06b6d4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  outlineButtonText: { color: "#06b6d4", fontWeight: "bold" },
});

export default DomiciliationOffers;
