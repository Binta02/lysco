import { useCart } from "@/src/hooks/useCart";
import { useToast } from "@/src/hooks/useToast";
import { supabase } from "@/src/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

const DomiciliationPricing = () => {
  const router = useRouter();
  const [engagementSociete, setEngagementSociete] = useState(false);
  const [engagementAuto, setEngagementAuto] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const { addItem } = useCart();

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

  const handleAddToCart = (offer: {
    id: string;
    title: string;
    price: string;
  }) => {
    addItem({
      id: offer.id,
      title: offer.title,
      price: parseFloat(offer.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${offer.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <View style={styles.grid}>
      {/* Société */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sociétés - Artisans - Commerçants</Text>
        <Text style={styles.price}>
          {engagementSociete ? "18€" : "36€"}
          <Text style={styles.perMonth}> /mois</Text>
        </Text>
        <Text style={styles.description}>
          Pour un engagement de plus de 6 mois, bénéficiez de 50% de réduction
          sur votre premier trimestre.
        </Text>
        {engagementSociete && (
          <Text style={styles.promoText}>Soit 18€ vos 3 premiers mois !</Text>
        )}

        <View style={styles.switchRow}>
          <Switch
            value={engagementSociete}
            onValueChange={(value) => setEngagementSociete(value)}
          />
          <Text>Je m'engage pour plus de 6 mois</Text>
        </View>

        <TouchableOpacity
          style={session ? styles.addButton : styles.disabledButton}
          onPress={() =>
            session
              ? handleAddToCart({
                  id: engagementSociete
                    ? "domiciliation-mensuel-societe-reduit"
                    : "domiciliation-mensuel-societe-normal",
                  title: "Domiciliation Mensuelle - Société",
                  price: engagementSociete ? "18,00" : "36,00",
                })
              : router.push("/(tabs)/Login" as any)
          }
        >
          <Text style={styles.buttonText}>
            {session ? "Ajouter au panier" : "Connectez-vous"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Auto-Entrepreneur */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Auto-Entrepreneurs</Text>
        <Text style={styles.price}>
          {engagementAuto ? "12€" : "24€"}
          <Text style={styles.perMonth}> /mois</Text>
        </Text>
        <Text style={styles.description}>
          Pour un engagement de plus de 6 mois, bénéficiez de 50% de réduction
          sur votre premier trimestre.
        </Text>
        {engagementAuto && (
          <Text style={styles.promoText}>Soit 12€ vos 3 premiers mois !</Text>
        )}

        <View style={styles.switchRow}>
          <Switch
            value={engagementAuto}
            onValueChange={(value) => setEngagementAuto(value)}
          />
          <Text>Je m'engage pour plus de 6 mois</Text>
        </View>

        <TouchableOpacity
          style={session ? styles.addButton : styles.disabledButton}
          onPress={() =>
            session
              ? handleAddToCart({
                  id: engagementAuto
                    ? "domiciliation-mensuel-auto-entreprise-reduit"
                    : "domiciliation-mensuel-auto-entrepreneur-normal",
                  title: "Domiciliation Mensuelle - Auto Entrepreneur",
                  price: engagementAuto ? "12,00" : "24,00",
                })
              : router.push("/(tabs)/Login" as any)
          }
        >
          <Text style={styles.buttonText}>
            {session ? "Ajouter au panier" : "Connectez-vous"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Associations */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Associations</Text>
        <Text style={styles.price}>
          15€<Text style={styles.perMonth}> /mois</Text>
        </Text>
        <Text style={styles.description}>
          Tarif spécial pour les associations.
        </Text>

        <TouchableOpacity
          style={session ? styles.addButton : styles.disabledButton}
          onPress={() =>
            session
              ? handleAddToCart({
                  id: "domiciliation-mensuel-association",
                  title: "Domiciliation Mensuelle - Association",
                  price: "15,00",
                })
              : router.push("/(tabs)/Login" as any)
          }
        >
          <Text style={styles.buttonText}>
            {session ? "Ajouter au panier" : "Connectez-vous"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
    gap: 16,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#06b6d4",
  },
  perMonth: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#555",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginVertical: 8,
  },
  promoText: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 8,
  },
  addButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DomiciliationPricing;
