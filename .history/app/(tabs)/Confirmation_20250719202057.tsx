import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { supabase } from "@/src/integrations/supabase/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type OrderItem = {
  title: string;
  price: number;
  quantity: number;
};

type ClientInfo = {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  siretNumber?: string;
  address: string;
  addressDetails?: string;
  city: string;
  postalCode: string;
};

const Confirmation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { orderJson } = useLocalSearchParams();
  const [order, setOrder] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!orderJson) {
      router.replace("/");
    } else {
      const parsedOrder = JSON.parse(orderJson as string);
      setOrder(parsedOrder);
    }
  }, [orderJson]);

  if (!order) return null;

  const { orderId, items, subtotal, tax, total, clientInfo } = order;

  const domiciliationItems = items.filter((item: OrderItem) => {
    const title = item.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return (
      title.includes("domicili") ||
      title.includes("entreprise") ||
      title.includes("auto-entrepreneur") ||
      title.includes("association")
    );
  });

  const domiciliationItem =
    domiciliationItems.length > 0 ? domiciliationItems[0] : null;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navbar session={null} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.checkIcon}>
            <MaterialCommunityIcons
              name="check-circle"
              size={40}
              color="#16a34a"
            />
          </View>
          <Text style={styles.title}>Commande confirmée</Text>
          <Text style={styles.subtitle}>
            Vous trouverez les informations de votre commande ci-dessous.{"\n"}
            Votre facture sera disponible dans votre espace personnel.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Détails de la commande{" "}
            <Text style={styles.orderId}>#{orderId}</Text>
          </Text>

          {/* Articles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Articles</Text>
            {items.map((item: any, index: number) => (
              <View key={index} style={styles.row}>
                <View>
                  <Text>{item.title}</Text>
                  <Text style={styles.smallText}>
                    Quantité: {item.quantity}
                  </Text>
                </View>
                <Text style={styles.boldText}>
                  {(item.price * item.quantity).toFixed(2)} €
                </Text>
              </View>
            ))}
          </View>

          {/* Totaux */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text>Sous-total</Text>
              <Text>{subtotal.toFixed(2)} €</Text>
            </View>
            <View style={styles.row}>
              <Text>TVA (20%)</Text>
              <Text>{tax.toFixed(2)} €</Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.boldText}>Total</Text>
              <Text style={styles.boldText}>{total.toFixed(2)} €</Text>
            </View>
          </View>

          {/* Informations client */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations client</Text>
            <Text>
              {clientInfo.firstName} {clientInfo.lastName}
            </Text>
            <Text style={styles.smallText}>{clientInfo.email}</Text>
            {clientInfo.companyName ? (
              <Text style={styles.smallText}>{clientInfo.companyName}</Text>
            ) : null}
            {clientInfo.siretNumber ? (
              <Text style={styles.smallText}>
                SIRET: {clientInfo.siretNumber}
              </Text>
            ) : null}
            <Text style={styles.smallText}>{clientInfo.address}</Text>
            {clientInfo.addressDetails ? (
              <Text style={styles.smallText}>{clientInfo.addressDetails}</Text>
            ) : null}
            <Text style={styles.smallText}>
              {clientInfo.city}, {clientInfo.postalCode}
            </Text>
          </View>

          {/* Contrat de domiciliation */}
          {domiciliationItem && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Votre contrat de domiciliation
              </Text>
              <Text style={styles.smallText}>
                Il est impératif de télécharger votre contrat de domiciliation
                maintenant. Vous ne pourrez plus y accéder par la suite, sauf en
                repassant commande ou en venant à l’agence.
              </Text>
              <View style={styles.warningBox}>
                <Text style={styles.boldText}>⚠ Attention :</Text>
                <Text style={styles.smallText}>
                  Merci de bien vouloir retourner le contrat signé accompagné
                  des documents suivants :
                </Text>
                <Text style={styles.smallText}>
                  • Pièce d’identité : Copie valide.
                </Text>
                <Text style={styles.smallText}>
                  • Justificatif de domicile : Document de moins de 3 mois.
                </Text>
                <Text style={styles.smallText}>
                  Ces documents sont nécessaires pour compléter votre
                  inscription.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Bouton continuer achats */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.push("/")}
          >
            <MaterialCommunityIcons name="shopping" size={20} color="#fff" />
            <Text style={styles.continueButtonText}>Continuer vos achats</Text>
          </TouchableOpacity>
        </View>
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
      <Footer />
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  checkIcon: {
    backgroundColor: "#dcfce7",
    borderRadius: 40,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "normal",
  },
  section: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  smallText: {
    fontSize: 12,
    color: "#6b7280",
  },
  boldText: {
    fontWeight: "bold",
  },
  warningBox: {
    backgroundColor: "#fef9c3",
    borderLeftWidth: 4,
    borderLeftColor: "#facc15",
    padding: 12,
    marginTop: 12,
  },
  continueButton: {
    backgroundColor: "#5cb9bc",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
