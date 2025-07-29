import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Domiciliation = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={["#ccfbf1", "#fce7f3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>
          Domiciliation d'entreprise à Deuil-la-Barre
        </Text>
        <Text style={styles.heroSubtitle}>
          Domiciliez votre entreprise à Deuil-la-Barre et bénéficiez de nombreux
          services pour faciliter votre gestion administrative.
        </Text>

        <View style={styles.cardRow}>
          <View style={styles.featureCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#ccfbf1" }]}>
              <MaterialIcons name="place" size={24} color="#06b6d4" />
            </View>
            <Text style={styles.cardTitle}>Adresse professionnelle</Text>
            <Text style={styles.cardText}>
              Une adresse commerciale valorisante
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#fce7f3" }]}>
              <MaterialIcons name="schedule" size={24} color="#ec4899" />
            </View>
            <Text style={styles.cardTitle}>Installation rapide</Text>
            <Text style={styles.cardText}>Mise en place en 24h</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#ccfbf1" }]}>
              <MaterialIcons name="verified-user" size={24} color="#06b6d4" />
            </View>
            <Text style={styles.cardTitle}>Conformité légale</Text>
            <Text style={styles.cardText}>Agréé n°04_95_2023</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Promo Box */}
      <View style={styles.promoBox}>
        <FontAwesome5 name="piggy-bank" size={20} color="#2ecc71" />
        <Text style={styles.promoText}>
          {" "}
          -50% sur vos 3 premiers mois (6 mois d’engagement) !
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  hero: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 20,
  },
  cardRow: { flexDirection: "row", justifyContent: "space-around" },
  featureCard: {
    alignItems: "center",
    width: "30%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  cardText: { fontSize: 12, textAlign: "center", color: "#6b7280" },
  promoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d1f5d3",
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  promoText: {
    marginLeft: 8,
    color: "#2ecc71",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Domiciliation;
