import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import DomiciliationOffers from "../../src/components/domiciliation/DomiciliationOffers";
import DomiciliationPricing from "../../src/components/domiciliation/DomiciliationPricing";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
      <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
        {/* Gradient Box */}
        <LinearGradient
          colors={["#ccfbf1", "#fce7f3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBox}
        >
          <Text style={styles.sectionTitle}>
            Nos formules d'abonnement mensuel
          </Text>
          <Text style={styles.sectionSubtitle}>
            Choisissez la formule qui correspond le mieux à votre statut et à
            vos besoins
          </Text>
          <DomiciliationPricing />
          {/* Place ton composant DomiciliationPricing ici */}
        </LinearGradient>

        {/* Offre spéciale */}
        <View style={styles.whiteBox}>
          <DomiciliationOffers />

          {/* Place ton composant DomiciliationOffers ici */}
        </View>

        {/* Pourquoi se domicilier */}
        <View style={styles.whiteBox}>
          <Text style={styles.cardTitle}>
            <Ionicons name="checkmark-circle" size={20} color="#06b6d4" />{" "}
            Pourquoi se domicilier chez Lys&Co ?
          </Text>
          <Text style={styles.cardText}>
            Une solution flexible et sans engagement
          </Text>

          {[
            "Offre flexible et sans engagement",
            "Mise en place rapide et sans tracas",
            "Paiement sécurisé en ligne",
            "Pas de dépôt de garantie ni frais de dossier",
            "-5% sur l'abonnement annuel pour tout paiement anticipé de 12 mois",
          ].map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={18} color="green" />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          <View style={styles.promoBox}>
            <FontAwesome5 name="piggy-bank" size={18} color="#2ecc71" />
            <Text style={styles.promoText}>
              -50% sur vos 3 premiers mois pour tout engagement de 6 mois !
            </Text>
          </View>
        </View>

        {/* Pack exclusif (avec ruban) */}
        <View
          style={[
            styles.whiteBox,
            { position: "relative", overflow: "hidden" },
          ]}
        >
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>EXCLUSIF</Text>
          </View>
          <Text style={styles.cardTitle}>Pack domicilié à 1514,00€</Text>
          <Text style={styles.cardText}>
            Pack Exclusif pour Nouveaux Domiciliés : Boostez votre entreprise !
          </Text>

          {[
            "Site Internet sur Mesure : Conception professionnelle incluse (hébergement à part)",
            "100 Cartes de Visite Professionnelles personnalisées",
            "Création et optimisation de pages Instagram et LinkedIn",
            "3 Mois de Domiciliation Gratuite (engagement 6 mois)",
          ].map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={18} color="#06b6d4" />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Je profite de l'offre</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  gradientBox: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  whiteBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },
  sectionSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4b5563",
  },
  ribbon: {
    position: "absolute",
    top: 12,
    right: -30,
    backgroundColor: "#ec4899",
    paddingVertical: 4,
    paddingHorizontal: 20,
    transform: [{ rotate: "45deg" }],
  },
  ribbonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Domiciliation;
