import { useCart } from "@/src/components/cart/CartContext";
import { supabase } from "@/src/integrations/supabase/client";
import { Ionicons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  Dimensions,
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
  description?: string;
}

const offers: OfferProps[] = [
  {
    id: "domiciliation-1an-entreprise",
    title: "Domiciliation 1 an – Entreprise",
    price: "361,80",
    originalPrice: "432,00",
    isPromo: true,
    link: "/domiciliation/1-an-entreprise",
    description:
      "Domiciliation d'entreprise pour 1 an avec adresse professionnelle et services inclus.",
  },
  {
    id: "domiciliation-3mois-entreprise",
    title: "Domiciliation 3 mois – Entreprise",
    price: "108,00",
    link: "/domiciliation/3-mois-entreprise",
    description:
      "Domiciliation d'entreprise pour 3 mois avec adresse professionnelle et services inclus.",
  },
  {
    id: "domiciliation-3mois-micro",
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: "72,00",
    link: "/domiciliation/3-mois-micro-entreprise",
    description:
      "Domiciliation de micro-entreprise pour 3 mois avec adresse professionnelle et services inclus.",
  },
  {
    id: "domiciliation-6mois-entreprise",
    title: "Domiciliation 6 mois – Entreprise",
    price: "162,00",
    originalPrice: "216,00",
    isPromo: true,
    link: "/domiciliation/6-mois-entreprise",
    description:
      "Domiciliation d'entreprise pour 6 mois avec adresse professionnelle et services inclus.",
  },
  {
    id: "domiciliation-6mois-micro",
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: "108,00",
    originalPrice: "144,00",
    isPromo: true,
    link: "/domiciliation/6-mois-micro-entreprise",
    description:
      "Domiciliation de micro-entreprise pour 6 mois avec adresse professionnelle et services inclus.",
  },
  {
    id: "pack-domicilie",
    title: "Pack domicilié",
    price: "1514,00",
    link: "/domiciliation/pack-domicilie",
    description:
      "Pack complet de domiciliation avec services administratifs et communication pour 1 an.",
  },
];

const DomiciliationOffers = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = (offer: OfferProps) => {
    addItem({
      id: offer.id,
      title: offer.title,
      price: parseFloat(offer.price.replace(",", ".")),
      quantity: 1,
    });
  };

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
            {/* <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => router.push(`/services/${offer.id}` as any)}
            >
              <Text style={styles.outlineButtonText}>Voir les détails</Text>
            </TouchableOpacity> */}
            <Text style={styles.cardTitle}>{offer.title}</Text>
            {offer.description && (
              <Text style={styles.description}>{offer.description}</Text>
            )}

            {offer.isPromo && offer.originalPrice && (
              <Text style={styles.oldPrice}>{offer.originalPrice} €</Text>
            )}
            <Text style={styles.price}>{offer.price} €</Text>

            <View style={styles.buttonContainer}>
              {session ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(offer)}
                >
                  <Ionicons name="cart-outline" size={16} color="#fff" />
                  <Text style={styles.addButtonText}>Ajouter au panier</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: "#aaa" }]}
                  onPress={() => router.push("/(app)/Login" as any)}
                >
                  <Text style={styles.addButtonText}>Connectez-vous</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.outlineButton}
                onPress={() => router.push(`/services/${offer.id}` as any)}
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
        onPress={() => router.push("/(app)/DemandeDevis" as any)}
      >
        <Text style={styles.addButtonText}>Demander un devis personnalisé</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    maxWidth: 250,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#475569",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: isTablet ? width / 2 - 24 : "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoBadge: {
    backgroundColor: "#f43f5e",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: 8,
  },
  promoText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: "#9ca3af",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5cb9bc",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5cb9bc",
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  outlineButton: {
    borderColor: "#5cb9bc",
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#5cb9bc",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default DomiciliationOffers;
