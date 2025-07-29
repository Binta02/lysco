import Footer from "@/src/components/Footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ServiceCard = ({
  title,
  description,
  points,
  price,
  buttonText,
  buttonColor,
  iconColor,
}: {
  title: string;
  description: string;
  points: string[];
  price: string;
  buttonText: string;
  buttonColor: string;
  iconColor: string;
}) => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{description}</Text>
      {points.map((point, idx) => (
        <View key={idx} style={styles.pointRow}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={18}
            color={iconColor}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.cardPoint}>{point}</Text>
        </View>
      ))}
      <Text style={styles.cardPrice}>{price}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => router.push("/(tabs)/Contact" as any)}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ServicesComplementaires = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Text style={styles.title}>Nos Services Complémentaires</Text>
        <Text style={styles.description}>
          Découvrez notre gamme complète de services complémentaires pour
          accompagner le développement de votre entreprise.
        </Text>

        <View style={styles.cardGrid}>
          <ServiceCard
            title="Permanence téléphonique"
            description="Une réponse professionnelle à tous vos appels"
            points={[
              "Réponse personnalisée au nom de votre entreprise",
              "Transfert d'appels selon vos consignes",
              "Prise de messages et transmission par email",
              "Service disponible aux heures ouvrables",
            ]}
            price="À partir de 120€/mois"
            buttonText="En savoir plus"
            buttonColor="#5cb9bc"
            iconColor="#5cb9bc"
          />
          <ServiceCard
            title="Gestion du courrier"
            description="Traitement professionnel de votre courrier"
            points={[
              "Réception et tri du courrier",
              "Numérisation et envoi par email",
              "Transfert postal hebdomadaire",
              "Archivage sécurisé sur demande",
            ]}
            price="À partir de 80€/mois"
            buttonText="En savoir plus"
            buttonColor="#ec4899"
            iconColor="#ec4899"
          />
          <ServiceCard
            title="Service de traduction"
            description="Traductions professionnelles multilingues"
            points={[
              "Traduction de documents commerciaux",
              "Contrats et documents juridiques",
              "Supports marketing multilingues",
              "Traducteurs spécialisés par secteur",
            ]}
            price="Sur devis selon volume"
            buttonText="Demander un devis"
            buttonColor="#5cb9bc"
            iconColor="#5cb9bc"
          />
          <ServiceCard
            title="Organisation d'événements"
            description="Des événements professionnels clé en main"
            points={[
              "Séminaires et conférences",
              "Lancements de produits",
              "Team buildings et journées d'entreprise",
              "Gestion complète de A à Z",
            ]}
            price="Sur devis personnalisé"
            buttonText="Demander un devis"
            buttonColor="#ec4899"
            iconColor="#ec4899"
          />
          <ServiceCard
            title="Conseil en développement"
            description="Expertise pour accélérer votre croissance"
            points={[
              "Audit et stratégie d'entreprise",
              "Accompagnement commercial",
              "Recherche de financement",
              "Développement international",
            ]}
            price="À partir de 400€/session"
            buttonText="En savoir plus"
            buttonColor="#5cb9bc"
            iconColor="#5cb9bc"
          />
          <ServiceCard
            title="Formations professionnelles"
            description="Développez les compétences de votre équipe"
            points={[
              "Communication et marketing digital",
              "Gestion de projet et productivité",
              "Compétences managériales",
              "Formations certifiantes sur mesure",
            ]}
            price="À partir de 650€/jour"
            buttonText="Programme des formations"
            buttonColor="#ec4899"
            iconColor="#ec4899"
          />
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteTitle}>Packages sur mesure</Text>
          <Text style={styles.quoteDesc}>
            Nous proposons des packages combinant plusieurs services
            complémentaires pour répondre parfaitement à vos besoins tout en
            vous offrant un tarif avantageux. Contactez-nous pour créer votre
            package personnalisé.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/demande-devis" as any)}
            style={{ borderRadius: 20, overflow: "hidden", marginTop: 8 }}
          >
            <LinearGradient
              colors={["#5cb9bc", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
                Demander votre package sur mesure
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.finalBox}>
          <Text style={styles.finalTitle}>
            Vous avez besoin d'un service spécifique ?
          </Text>
          <Text style={styles.finalDesc}>
            Notre équipe est à votre disposition pour discuter de vos besoins
            particuliers et vous proposer des solutions adaptées à votre
            activité.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#5cb9bc" }]}
              onPress={() => router.push("/(tabs)/Contact" as any)}
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
      {/* {menuOpen && (
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
      )} */}
    </View>
  );
};

export default ServicesComplementaires;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#0f172a",
  },
  description: {
    textAlign: "center",
    color: "#475569",
    marginBottom: 20,
  },
  cardGrid: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardPoint: {
    fontSize: 12,
    color: "#374151",
    flexShrink: 1,
  },
  cardPrice: {
    fontSize: 12,
    color: "#6b7280",
    marginVertical: 8,
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
    fontSize: 14,
  },
  buttonText1: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 6,
    fontSize: 14,
  },
  buttonOutline: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
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
  quoteDesc: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 12,
  },
  finalBox: {
    marginTop: 24,
    alignItems: "center",
  },
  finalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#0f172a",
  },
  finalDesc: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
});
