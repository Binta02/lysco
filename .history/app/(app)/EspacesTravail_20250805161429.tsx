import Footer from "@/src/components/Footer";
import { supabase } from "@/src/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const EspacesTravail = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);

  const Card = ({
    image,
    title,
    description,
    price,
    link,
    buttonColor,
  }: {
    image: string;
    title: string;
    description: string;
    price: string;
    link: string;
    buttonColor: string;
  }) => (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={{ padding: 12 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
        <Text style={styles.cardPrice}>{price}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={() => router.push(link as any)}
        >
          <Text style={styles.buttonText}>Réserver maintenant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Text style={styles.title}>Nos espaces de travail</Text>

        <Text style={styles.subtitle}>Réservez dès maintenant nos espaces</Text>

        <View style={styles.cardGrid}>
          <Card
            image="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_a915053597e240a9baa31a00123ab7afmv2.webp"
            title="Espace de coworking"
            description="Espace de coworking pour 8 personnes avec Wi-Fi et espace calme."
            price="À partir de 5€/heure"
            link="/services/coworking-space"
            buttonColor="#5cb9bc"
          />
          <Card
            image="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_701844a302db4d7babbfbd3ff9bdbabemv2.webp"
            title="Salle de formation"
            description="Salle pour 10 personnes avec équipement pédagogique."
            price="10€/h, 25€/demi-journée, 45€/journée"
            link="/services/formation-room"
            buttonColor="#ec4899"
          />
          <Card
            image="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_d5ce529552664ec3b89f4e4099e76269mv2.webp"
            title="Location de bureau"
            description="Espaces privés et calmes pour un travail concentré."
            price="125€/demi-journée, 250€/journée"
            link="/services/location-bureau"
            buttonColor="#5cb9bc"
          />
        </View>

        {/* Appel à action final */}
        <View style={styles.quoteBox}>
          <Text style={styles.quoteTitle}>
            Vous cherchez une solution adaptée à vos besoins ?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#5cb9bc" }]}
              onPress={() => router.push("/(app)/Contact" as any)}
            >
              <Text style={styles.buttonText1}>Nous contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonOutline, { borderColor: "#ec4899" }]}
              onPress={() => router.push("/tarifs" as any)}
            >
              <Text style={[styles.buttonText1, { color: "#ec4899" }]}>
                Voir nos tarifs
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </ScrollView>
      {/* GLOBAL OVERLAY */}
      {menuOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            zIndex: 9999,
            elevation: 9999,
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingTop: 90, paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 50, right: 20, padding: 10 }}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={{ fontSize: 28, color: "#333" }}>✕</Text>
            </TouchableOpacity>

            {[
              { label: "Accueil", path: "/(app)" },
              { label: "Domiciliation", path: "/(app)/Domiciliation" },
              { label: "Services Admin", path: "/(app)/ServicesAdmin" },
              { label: "Communication", path: "/(app)/Communication" },
              { label: "Contact", path: "/(app)/Contact" },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: "#eee",
                }}
                onPress={() => {
                  router.push(item.path as any);
                  setMenuOpen(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#333" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={{ marginTop: 30 }}>
              {session ? (
                <>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      alignItems: "center",
                      borderRadius: 6,
                      backgroundColor: "#5cb9bc",
                      marginBottom: 12,
                    }}
                    onPress={() => {
                      router.push("/(app)/Dashboard" as any);
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Dashboard
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      alignItems: "center",
                      borderRadius: 6,
                      backgroundColor: "#5cb9bc",
                    }}
                    onPress={async () => {
                      const { error } = await supabase.auth.signOut();
                      if (error) {
                        Alert.alert("Erreur", error.message);
                        return;
                      }
                      Alert.alert("Déconnexion réussie");
                      router.push("/(app)/Login" as any);
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Déconnexion
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    alignItems: "center",
                    borderRadius: 6,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#5cb9bc",
                  }}
                  onPress={() => {
                    router.push("/(app)/Login" as any);
                    setMenuOpen(false);
                  }}
                >
                  <Text style={{ color: "#5cb9bc", fontWeight: "bold" }}>
                    Connexion
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default EspacesTravail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  breadcrumb: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: "column",
    gap: 16,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText1: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
  },
  buttonOutline: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
  },
  quoteBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#0f172a",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
});
