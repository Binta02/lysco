import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Domiciliation = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Domiciliation d'entreprise à Deuil-la-Barre
        </Text>
        <Text style={styles.heroSubtitle}>
          Domiciliez votre entreprise à Deuil-la-Barre et bénéficiez de nombreux
          services pour faciliter votre gestion administrative.
        </Text>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <MaterialIcons name="place" size={24} color="#1abc9c" />
            <Text style={styles.cardTitle}>Adresse professionnelle</Text>
            <Text style={styles.cardText}>
              Une adresse commerciale valorisante pour votre entreprise
            </Text>
          </View>
          <View style={styles.card}>
            <MaterialIcons name="schedule" size={24} color="#e91e63" />
            <Text style={styles.cardTitle}>Installation rapide</Text>
            <Text style={styles.cardText}>
              Votre domiciliation mise en place en 24h
            </Text>
          </View>
          <View style={styles.card}>
            <MaterialIcons name="verified-user" size={24} color="#1abc9c" />
            <Text style={styles.cardTitle}>Conformité légale</Text>
            <Text style={styles.cardText}>
              Service agréé avec le numéro 04_95_2023
            </Text>
          </View>
        </View>
      </View>

      {/* Pourquoi se domicilier */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Pourquoi se domicilier chez Lys&Co ?
        </Text>
        <Text style={styles.sectionSubtitle}>
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
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
        <View style={styles.promoBox}>
          <FontAwesome5 name="piggy-bank" size={20} color="#2ecc71" />
          <Text style={styles.promoText}>
            {" "}
            -50% sur vos 3 premiers mois pour tout engagement de 6 mois !
          </Text>
        </View>
      </View>

      {/* Pack Exclusif */}
      <View style={styles.section}>
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>EXCLUSIF</Text>
        </View>
        <Text style={styles.sectionTitle}>Pack domicilié à 1514,00€</Text>
        <Text style={styles.sectionSubtitle}>
          Pack Exclusif pour Nouveaux Domiciliés : Boostez votre entreprise !
        </Text>
        {[
          "Site Internet sur Mesure : Conception professionnelle incluse (hébergement à part)",
          "100 Cartes de Visite Professionnelles personnalisées",
          "Création et optimisation de pages Instagram et LinkedIn",
          "3 Mois de Domiciliation Gratuite (engagement 6 mois)",
        ].map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <Ionicons name="checkmark-circle" size={20} color="#1abc9c" />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PackDomicilie")}
        >
          <Text style={styles.buttonText}>Je profite de l'offre</Text>
        </TouchableOpacity> */}
      </View>

      {/* Espaces de travail */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Nos espaces de travail à Deuil-la-Barre
        </Text>

        {/* Coworking */}
        <View style={styles.workspaceCard}>
          <Text style={styles.workspaceTitle}>Espace Coworking</Text>
          <Text>Capacité: 8 personnes</Text>
          <Text>Tarif: 5€/heure</Text>
          {/* <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.navigate("CoworkingSpace")}
          >
            <Text style={styles.outlineButtonText}>Plus d'infos</Text>
          </TouchableOpacity> */}
        </View>

        {/* Salle de formation */}
        <View style={styles.workspaceCard}>
          <Text style={styles.workspaceTitle}>Salle de Formation</Text>
          <Text>Capacité: 10 personnes</Text>
          <Text>Tarifs: 10€/heure, 25€/demi-journée, 45€/journée</Text>
          {/* <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.navigate("FormationRoom")}
          >
            <Text style={styles.outlineButtonText}>Plus d'infos</Text>
          </TouchableOpacity> */}
        </View>

        {/* Bureau privé */}
        <View style={styles.workspaceCard}>
          <Text style={styles.workspaceTitle}>Bureau Privé</Text>
          <Text>Capacité: 2 personnes</Text>
          <Text>Tarifs mensuels: 125€/demi-journée, 250€/journée complète</Text>
          {/* <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.navigate("LocationBureau")}
          >
            <Text style={styles.outlineButtonText}>Plus d'infos</Text>
          </TouchableOpacity> */}
        </View>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EspacesTravail")}
        >
          <Text style={styles.buttonText}>Découvrir tous nos espaces</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  hero: { alignItems: "center", marginBottom: 24 },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  cardTitle: { fontWeight: "bold", marginTop: 8 },
  cardText: { fontSize: 12, textAlign: "center", color: "#555" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  listItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  listText: { marginLeft: 8, fontSize: 14 },
  promoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d1f5d3",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  promoText: { marginLeft: 8, color: "#2ecc71", fontWeight: "600" },
  ribbon: {
    position: "absolute",
    top: 0,
    right: -30,
    backgroundColor: "#e91e63",
    paddingVertical: 4,
    paddingHorizontal: 16,
    transform: [{ rotate: "45deg" }],
  },
  ribbonText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  button: {
    backgroundColor: "#1abc9c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  outlineButton: {
    borderColor: "#1abc9c",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  outlineButtonText: { color: "#1abc9c", fontWeight: "bold" },
  workspaceCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  workspaceTitle: { fontWeight: "bold", marginBottom: 4 },
});

export default Domiciliation;
