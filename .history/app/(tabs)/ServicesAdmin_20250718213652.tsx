import AdminServiceOffers from "@/src/components/admin/AdminServiceOffers";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
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

  return (
    <View style={{ flex: 1 }}>
      <Navbar session={session} onToggleMenu={() => setMenuOpen(!menuOpen)} />
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
              style={{ marginBottom: 16 }}
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
        <View style={styles.section}>
          <MaterialCommunityIcons
            name="clipboard-check-outline"
            size={64}
            color="#ec4899"
            style={styles.iconCenter}
          />{" "}
          <Text style={styles.sectionTitle}>ASSISTANAT</Text>
          <Text style={styles.paragraph}>
            Imaginez <Text style={styles.bold}>déléguer</Text> toute la gestion
            administrative, comptable et commerciale...
          </Text>
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
    </View>
  );
};

export default ServicesAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  hero: { padding: 20, backgroundColor: "#f0f9ff", alignItems: "center" },
  iconCenter: { marginBottom: 16 },
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
  // gradientBox: {
  //   backgroundColor: "#f0f9ff",
  //   borderRadius: 12,
  //   marginHorizontal: 20,
  // },
  // buttonRow: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   gap: 12,
  //   marginTop: 12,
  //   flexWrap: "wrap",
  // },
  // buttonPrimary: {
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  // },
  // buttonPrimaryText: { color: "#fff", fontWeight: "bold" },
  // buttonOutline: {
  //   borderWidth: 1,
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  // },
  // buttonOutlineText: { fontWeight: "bold" },

  gradientBox: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  // container: {
  //   alignItems: "center",
  // },
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
});
