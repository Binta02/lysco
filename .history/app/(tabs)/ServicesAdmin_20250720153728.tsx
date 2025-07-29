import AdminServiceOffers from "@/src/components/admin/AdminServiceOffers";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { supabase } from "@/src/integrations/supabase/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ServicesAdmin = () => {
  const router = useRouter();
  const [session, setSession] = React.useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const tariffs = [
    { service: "Inscription Auto Entreprise", price: "150 €" },
    { service: "Inscription Entreprise Individuelle", price: "150 €" },
    {
      service: "Rédaction Formalités de Création",
      price: "600 €",
      note: "*hors coûts organismes",
    },
    {
      service: "VTC – Driel (Registre Transports)",
      price: "900 €",
      note: "*hors coûts organismes",
    },
    {
      service: "Modification Société",
      price: "900 €",
      note: "*hors coûts organismes",
    },
    {
      service: "Dépôt Comptes Annuels",
      price: "300 €",
      note: "*hors coûts organismes",
    },
    { service: "Cession de Part", price: "200 €" },
    {
      service: "Accompagnement Compte en Ligne",
      price: "150 €",
      note: "hors frais",
    },
  ];
  const PriceCard = ({
    service,
    price,
    note,
  }: {
    service: string;
    price: string;
    note?: string;
  }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{service}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
      {note && <Text style={styles.cardNote}>{note}</Text>}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <Navbar />
      {/* <ScrollView style={styles.container}> */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={["#ecfdf5", "#fdf2f8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBox}
        >
          <View style={styles.container}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={64}
              color="#06b6d4"
              style={{ marginBottom: 16, alignSelf: "center" }}
            />
            <Text style={styles.title}>
              FORMALITÉS ENTREPRISES – ADMINISTRATIF
            </Text>
            <Text style={styles.subtitle}>
              Vous êtes en création d'entreprise, en changement de siège social
              ou face à des modifications importantes ? Notre expert-comptable
              partenaire vous accompagne à chaque étape, offrant une assistance
              personnalisée et des conseils experts pour des démarches
              administratives en toute sérénité.
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.buttonOutline, { borderColor: "#06b6d4" }]}
                onPress={() => router.push("/(tabs)/Contact")}
              >
                <Text style={[styles.buttonOutlineText, { color: "#06b6d4" }]}>
                  Contactez-nous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonPrimary, { backgroundColor: "#06b6d4" }]}
                onPress={() => router.push("/#admin-services-offers" as any)}
              >
                <Text style={styles.buttonPrimaryText}>Voir nos services</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <AdminServiceOffers />
        {/* Description */}
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>
            FORMALITÉS ENTREPRISES – ADMINISTRATIF
          </Text>
          {"\n\n"}
          Si vous êtes en pleine{" "}
          <Text style={styles.bold}>création d’entreprise</Text>, envisagez de
          <Text style={styles.bold}> changer votre siège social</Text> ou devez
          gérer d’autres
          <Text style={styles.bold}> modifications importantes</Text>, mais que
          le
          <Text style={styles.bold}> temps</Text> ou les
          <Text style={styles.bold}> connaissances</Text> vous manquent...
        </Text>

        {/* Tarifs Section */}
        <View style={styles.section}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Nos Tarifs de Formalités</Text>
              <Text style={styles.sectionSubtitle}>
                Des solutions administratives transparentes et adaptées à chaque
                besoin professionnel.
              </Text>
            </View>

            <FlatList
              data={tariffs}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2} // pour un affichage responsive en grid
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item }) => (
                <PriceCard
                  service={item.service}
                  price={item.price}
                  note={item.note}
                />
              )}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </View>

        {/* Assistanat Section */}
        <View style={styles.assistantSection}>
          <View style={styles.assistantContainer}>
            {/* Colonne gauche */}
            <View style={styles.assistantLeft}>
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={64}
                color="#ec4899"
                style={{ alignSelf: "center", marginBottom: 16 }}
              />
              <Text style={styles.assistantTitle}>ASSISTANAT</Text>
              <Text style={styles.assistantText}>
                Imaginez <Text style={styles.bold}>déléguer</Text> toute la{" "}
                <Text style={styles.bold}>gestion administrative</Text>,{" "}
                <Text style={styles.bold}>comptable</Text> et{" "}
                <Text style={styles.bold}>commerciale</Text> à des{" "}
                <Text style={styles.bold}>assistants experts</Text>, vous
                permettant ainsi de vous recentrer sur l’
                <Text style={styles.bold}>essentiel</Text> de votre activité...
              </Text>
            </View>

            {/* Colonne droite */}
            <View style={styles.assistantRight}>
              {[
                { service: "Assistance Administrative", price: "30 € /heure" },
                { service: "Création de Devis", price: "15 € /page" },
                { service: "Création de Factures", price: "15 € /page" },
                {
                  service: "Annonces Commerciales",
                  price: "10 € /annonce",
                  note: "destinées aux sites d'annonces",
                },
                {
                  service: "Courriers Administratifs",
                  price: "Sur devis",
                  note: "selon les spécificités",
                },
              ].map((item, index) => (
                <View key={index} style={styles.priceCard}>
                  <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                    {item.service}
                  </Text>
                  <Text style={{ color: "#06b6d4", fontWeight: "bold" }}>
                    {item.price}
                  </Text>
                  {item.note && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontStyle: "italic",
                        color: "#6b7280",
                      }}
                    >
                      {item.note}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={[styles.section, styles.gradientBox]}>
          <Text style={styles.sectionTitle}>
            Votre Partenaire Administratif
          </Text>
          <Text style={styles.paragraph}>
            Chez Lys&Co, nous offrons des solutions sur mesure qui répondent
            précisément à vos exigences professionnelles.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.buttonPrimary, { backgroundColor: "#06b6d4" }]}
              onPress={() => router.push("/(tabs)/Contact")}
            >
              <Text style={styles.buttonPrimaryText}>
                Discuter de votre projet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonOutline, { borderColor: "#ec4899" }]}
              onPress={() => router.push("/")}
            >
              <Text style={[styles.buttonOutlineText, { color: "#ec4899" }]}>
                Nos tarifs détaillés
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
              { label: "Accueil", path: "/(tabs)" },
              { label: "Domiciliation", path: "/(tabs)/Domiciliation" },
              { label: "Services Admin", path: "/(tabs)/ServicesAdmin" },
              { label: "Communication", path: "/(tabs)/Communication" },
              { label: "Contact", path: "/(tabs)/Contact" },
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
                      router.push("/(tabs)/Dashboard" as any);
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
                      router.push("/(tabs)/Login" as any);
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
                    router.push("/(tabs)/Login" as any);
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

export default ServicesAdmin;

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { padding: 20, backgroundColor: "#f0f9ff", alignItems: "center" },
  iconCenter: { marginBottom: 16 },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    color: "#4b5563",
    paddingHorizontal: 20,
    marginBottom: 20,
    lineHeight: 20,
  },
  bold: { fontWeight: "bold" },
  section: { padding: 20, alignItems: "center" },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: "#4b5563", // gray-600
    textAlign: "center",
    maxWidth: 600,
  },

  gradientBox: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    // borderRadius: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  buttonPrimary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonOutline: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonOutlineText: {
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937", // gray-800
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#06b6d4", // turquoise
    marginBottom: 4,
  },
  cardNote: {
    fontSize: 12,
    color: "#6b7280", // gray-500
    fontStyle: "italic",
  },
  listContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  assistantSection: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },

  assistantContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },

  assistantLeft: {
    width: "48%", // deux colonnes
    marginBottom: 16,
  },

  assistantRight: {
    width: "48%",
    marginBottom: 16,
  },

  assistantTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },

  assistantText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    textAlign: "center",
  },

  priceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
