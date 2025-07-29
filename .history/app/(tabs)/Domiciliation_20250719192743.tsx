import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import ComplementaryServices from "../../src/components/domiciliation/ComplementaryServices";
import DomiciliationOffers from "../../src/components/domiciliation/DomiciliationOffers";
import DomiciliationPricing from "../../src/components/domiciliation/DomiciliationPricing";
import Navbar from "../../src/components/Navbar";

import Footer from "@/src/components/Footer";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../src/integrations/supabase/client";

const Domiciliation = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const spaces = [
    {
      title: "Espace Coworking",
      description: "Espace de travail partagé, idéal pour les freelances",
      capacity: "8 personnes",
      price: "5€",
      unit: "/heure",
      link: "/services/coworking-space",
    },
    {
      title: "Salle de Formation",
      description: "Salle équipée pour formations et réunions",
      capacity: "10 personnes",
      prices: [
        { label: "À l'heure", value: "10€" },
        { label: "Demi-journée", value: "25€" },
        { label: "Journée", value: "45€" },
      ],
      link: "/services/formation-room",
    },
    {
      title: "Bureau Privé",
      description: "Bureau fermé pour 2 personnes",
      capacity: "2 personnes",
      prices: [
        { label: "Demi-journée", value: "125€" },
        { label: "Journée complète", value: "250€" },
      ],
      link: "/services/location-bureau",
    },
  ];

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Navbar session={session} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
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
            Domiciliez votre entreprise à Deuil-la-Barre et bénéficiez de
            nombreux services pour faciliter votre gestion administrative.
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
              {/* <Ionicons name="checkmark-circle" size={20} color="#06b6d4" />{" "} */}
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
              Pack Exclusif pour Nouveaux Domiciliés : Boostez votre entreprise
              !
            </Text>

            {[
              "Site Internet sur Mesure : Conception professionnelle incluse (hébergement à part)",
              "100 Cartes de Visite Professionnelles personnalisées",
              "Création et optimisation de pages Instagram et LinkedIn",
              "3 Mois de Domiciliation Gratuite (engagement 6 mois)",
            ].map((item, idx) => (
              <View key={idx} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={18} color="#f9429e" />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                Je profite de l'offre
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.gradientBox, { backgroundColor: "#fce7f3" }]}>
          <ComplementaryServices />
          {/* Tu peux insérer <ComplementaryServices /> ici si tu veux l’afficher */}
        </View>

        {/* Promo Box */}
        {/* Section Questions */}
        <View style={{ marginTop: 48, alignItems: "center", marginBottom: 40 }}>
          <Text style={styles.sectionTitle}>Vous avez des questions ?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/(tabs)/Contact" as any)}
            >
              <Text style={styles.primaryButtonText}>Contactez-nous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() =>
                router.push("/(tabs)/ServicesComplementaires" as any)
              }
            >
              <Text style={styles.outlineButtonText}>
                En savoir plus sur nos services
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 32 }}>
          <Text style={styles.sectionTitle}>
            Nos espaces de travail à Deuil-la-Barre
          </Text>

          <View style={styles.grid}>
            {spaces.map((space, idx) => (
              <View key={idx} style={styles.whiteBox}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}
                >
                  {space.title}
                </Text>
                <Text style={{ color: "#6b7280", marginBottom: 8 }}>
                  {space.description}
                </Text>

                <Text style={{ fontSize: 12, color: "#9ca3af" }}>Capacité</Text>
                <Text style={{ fontWeight: "600", marginBottom: 8 }}>
                  {space.capacity}
                </Text>

                {space.price ? (
                  <>
                    <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                      Tarif
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#000000ff",
                      }}
                    >
                      {space.price}
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "normal",
                          color: "#6b7280",
                        }}
                      >
                        {space.unit}
                      </Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                      Tarifs
                    </Text>
                    {space.prices && (
                      <>
                        <Text style={{ fontSize: 12, color: "#9ca3af" }}></Text>
                        {space.prices.map((p, i) => (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>{p.label}</Text>
                            <Text style={{ fontWeight: "500" }}>{p.value}</Text>
                          </View>
                        ))}
                      </>
                    )}
                  </>
                )}

                <TouchableOpacity
                  style={[styles.outlineButton, { marginTop: 12 }]}
                  onPress={() => router.push(space.link as any)}
                >
                  <Text style={styles.outlineButtonText}>Plus d'infos</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              { marginTop: 24, alignSelf: "center" },
            ]}
            onPress={() => router.push(`/services/location-bureau` as any)}
          >
            <Text style={styles.primaryButtonText}>
              Découvrir tous nos espaces
            </Text>
          </TouchableOpacity>
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
            contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20, padding: 10 }}
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
                      backgroundColor: "#06b6d4",
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
                      backgroundColor: "#06b6d4",
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
                    borderColor: "#06b6d4",
                  }}
                  onPress={() => {
                    router.push("/(tabs)/Login" as any);
                    setMenuOpen(false);
                  }}
                >
                  <Text style={{ color: "#06b6d4", fontWeight: "bold" }}>
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

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  hero: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#334155",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    width: "100%", // pleine largeur
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 56, // plus gros
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    color: "#475569",
    textAlign: "center",
    marginBottom: 17,
  },
  gradientBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 35,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  listText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#475569",
    flex: 1,
    flexWrap: "wrap",
  },
  promoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d1fae5",
    padding: 10,
    borderRadius: 12,
    marginTop: 12,
  },
  promoText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#065f46",
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
  ribbon: {
    position: "absolute",
    top: 10,
    left: -40,
    backgroundColor: "#f43f5e",
    width: 120,
    transform: [{ rotate: "-45deg" }],
    alignItems: "center",
    paddingVertical: 2,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonRow: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 16,
    gap: 12, // Espace entre les boutons
  },

  primaryButton: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  outlineButton: {
    borderColor: "#f9429e",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
  },

  outlineButtonText: {
    color: "#f9429e",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  whiteBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20, // + espace entre les cartes
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  grid: {
    flexDirection: "column",
    gap: 16, // plus grand écart entre les éléments
  },
});

export default Domiciliation;
