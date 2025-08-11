// import { useCart } from "@/src/hooks/useCart";
import { useCart } from "@/src/components/cart/CartContext";
import { useToast } from "@/src/hooks/useToast";
import { supabase } from "@/src/integrations/supabase/client";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { LinearGradient } from "expo-linear-gradient";
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

const ComplementaryServices = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const { addItem } = useCart();
  const services = [
    {
      id: "service-reexpedition",
      title: "REEX",
      description:
        "Service de réexpédition hebdomadaire de votre courrier, envois chaque mardi.",
      price: "10",
      unit: "/mois",
      link: "/services/reexpedition-courrier",
      icon: <MaterialIcons name="mail" size={24} color="#5cb9bc" />,
    },
    {
      id: "service-scan",
      title: "Scan de courrier",
      description:
        "Numérisation de vos courriers dès réception pour un accès immédiat à vos documents.",
      price: "5",
      unit: "/mois",
      link: "/services/scan-courrier",
      icon: (
        <MaterialCommunityIcons
          name="file-document-outline"
          size={24}
          color="#ec4899"
        />
      ),
    },
    {
      id: "service-colis",
      title: "Service Colis",
      description:
        "Service de garde de colis en toute sécurité pour les professionnels et particuliers.",
      price: "6",
      unit: "/mois",
      link: "/services/reception-colis",
      icon: (
        <MaterialCommunityIcons
          name="clock-outline"
          size={24}
          color="#5cb9bc"
        />
      ),
    },
    {
      id: "location-bureau",
      title: "Location de bureau",
      description:
        "Espace de coworking (8 pers.) et salle de formation disponibles.",
      price: "5",
      unit: "/heure",
      link: "/services/location-bureau",
      icon: <Ionicons name="location-outline" size={24} color="#ec4899" />,
    },
  ];

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
                {session ? "Ajouter au panier" : "Coonnectez-vous"}
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

      {/* <TouchableOpacity
        style={[styles.addButton, { marginTop: 24 }]}
        onPress={() => router.push("/(tabs)/ServicesComplementaires" as any)}
      >
        <Text style={styles.buttonText}>
          Découvrir tous nos services supplémentaires
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/ServicesComplementaires" as any)}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={["#5cb9bc", "#f9429e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              Découvrir tous nos services supplémentaires
            </Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 24,
    alignSelf: "center",
    width: "100%",
    maxWidth: 400, // limite sur tablette
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
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
    width: isTablet ? width / 2 - 24 : "100%", // responsive
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: "#475569",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 4,
  },
  perMonth: {
    fontSize: 12,
    color: "#6b7280",
  },
  note: {
    fontSize: 10,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
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

export default ComplementaryServices;
