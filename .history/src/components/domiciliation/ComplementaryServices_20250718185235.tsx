import { supabase } from "@/src/integrations/supabase/client";
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

const ComplementaryServices = () => {
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

  const handleAddToCart = (service: {
    id: string;
    title: string;
    price: string;
  }) => {
    addItem({
      id: service.id,
      title: service.title,
      price: parseFloat(service.price.replace(",", ".")),
      quantity: 1,
    });

    toast({
      title: "Service ajouté au panier",
      description: `${service.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nos Services Complémentaires</Text>
      <Text style={styles.subtitle}>
        Optimisez votre temps avec nos services supplémentaires !
      </Text>

      <View style={styles.grid}>
        {services.map((service) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.iconContainer}>{service.icon}</View>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
            <Text style={styles.price}>
              {service.price}€<Text style={styles.perMonth}> /mois</Text>
            </Text>
            {service.id === "service-reexpedition" && (
              <Text style={styles.note}>Hors frais de timbres</Text>
            )}
            <TouchableOpacity
              style={session ? styles.addButton : styles.disabledButton}
              onPress={() =>
                session
                  ? handleAddToCart({
                      id: service.id,
                      title: service.title,
                      price: service.price,
                    })
                  : router.push("/(tabs)/Login" as any)
              }
            >
              <Text style={styles.buttonText}>
                {session ? "Ajouter au panier" : "Connectez-vous"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => router.push(service.link as any)}
            >
              <Text style={styles.outlineButtonText}>En savoir plus</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.addButton, { marginTop: 24 }]}
        onPress={() => router.push("/(tabs)/ServicesComplementaires" as any)}
      >
        <Text style={styles.buttonText}>
          Découvrir tous nos services supplémentaires
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 16,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#06b6d4",
    opacity: 0.1,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#06b6d4",
  },
  perMonth: {
    fontSize: 12,
    color: "#555",
  },
  note: {
    fontSize: 10,
    color: "#888",
    fontStyle: "italic",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: "#aaa",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#06b6d4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  outlineButtonText: {
    color: "#06b6d4",
    fontWeight: "bold",
  },
});

export default ComplementaryServices;
