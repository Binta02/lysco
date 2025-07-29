import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/src/components/cart/CartContext";
import Footer from "@/src/components/Footer";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

// ⚠️ Stripe hooks initialisés plus tard
let useConfirmPayment: any;
let useStripe: any;

if (Platform.OS !== "web") {
  // @ts-ignore
  const stripe = require("@stripe/stripe-react-native");
  useConfirmPayment = stripe.useConfirmPayment;
  useStripe = stripe.useStripe;
}
// Ajout du type CartItem avec la propriété optionnelle 'period'
type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  period?: string; // Ajout de la propriété optionnelle period
};
type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  businessActivity: string;
  siretNumber: string;
  address: string;
  addressDetails?: string;
  city: string;
  postalCode: string;
  phone?: string;
  country: string;
};

// Form schema (à adapter avec react-hook-form ou manuellement, car zod + react-hook-form Web ne marchent pas direct en RN)
const formSchema = {
  email: "",
  firstName: "",
  lastName: "",
  companyName: "",
  businessActivity: "",
  siretNumber: "",
  address: "",
  addressDetails: "",
  city: "",
  postalCode: "",
  phone: "",
  country: "France",
};

const CountrySelect = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (val: string) => void;
}) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    // Comme i18n-iso-countries n'est pas toujours dispo en RN, on peut hardcoder une liste réduite
    const countryArr = [
      { value: "FR", label: "France" },
      { value: "BE", label: "Belgique" },
      { value: "CH", label: "Suisse" },
    ];
    setOptions(countryArr);
  }, []);

  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      value={value}
      placeholder={{ label: "Sélectionnez un pays", value: null }}
      items={options.map((c) => ({ label: c.label, value: c.value }))}
      style={{
        inputIOS: {
          fontSize: 16,
          padding: 12,
          borderWidth: 1,
          borderColor: "#5cb9bc",
          borderRadius: 8,
          marginVertical: 8,
        },
        inputAndroid: {
          fontSize: 16,
          padding: 12,
          borderWidth: 1,
          borderColor: "#5cb9bc",
          borderRadius: 8,
          marginVertical: 8,
        },
      }}
    />
  );
};

const Checkout = () => {
  const stripe = useStripe();
  const router = useRouter();
  const { clearCart } = useCart();

  const [items, setItems] = useState<CartItem[]>([
    // Exemple temporaire
    { id: "service-colis", title: "Service Colis", price: 50, quantity: 1 },
  ]);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    businessActivity: "",
    siretNumber: "",
    address: "",
    addressDetails: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "France",
  });

  const subscriptionProductIds = [
    "domiciliation-mensuel-societe-Abonnement-Mensuel",
    "domiciliation-mensuel-societe-Abonnement-6-mois",
    "domiciliation-mensuel-auto-entrepreneur-Abonnement-Mensuel",
    "domiciliation-mensuel-auto-entreprise-Abonnement-6-mois",
    "domiciliation-mensuel-association",
    "service-reexpedition",
    "service-scan",
    "service-colis",
  ];

  const getPriceIdFromProductId = (productId: string): string | undefined => {
    const map: Record<string, string> = {
      "service-colis": "price_1RZSUML4PnylHeS6TrrTxJK7",
      "service-reexpedition": "price_1RZSVDL4PnylHeS6rWzjPwPs",
      // [... ajoute les autres ici si besoin]
    };
    return map[productId];
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data?.session?.user.id || null);
    };
    getSession();
  }, []);

  // const { confirmPayment } = useConfirmPayment();
  const { confirmPayment } =
    Platform.OS !== "web" ? useConfirmPayment() : { confirmPayment: null };

  const handleSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    try {
      const resp = await fetch(
        "https://mon-backend-node.vercel.app/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            userId,
            items,
            total,
            clientInfo: {
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              siretNumber: data.siretNumber,
            },
          }),
        }
      );

      if (!resp.ok) throw new Error("Backend error: " + (await resp.text()));
      const { clientSecret } = await resp.json();
      if (!clientSecret)
        throw new Error("Pas de clientSecret retourné par le backend.");

      if (Platform.OS === "web") {
        console.log("💻 Simulation de paiement web réussie");
        Alert.alert("Simulation Web", "Paiement simulé avec succès.");
      } else {
        const { error, paymentIntent } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          paymentMethodData: {
            billingDetails: {
              email: data.email,
              name: `${data.firstName} ${data.lastName}`,
            },
          },
        });

        if (error) {
          console.error("Erreur Stripe:", error);
          Alert.alert("Paiement échoué", error.message || "Erreur inconnue");
          return;
        }

        console.log("✅ Paiement réussi:", paymentIntent);
      }

      await Promise.all(
        items.map(async (item) => {
          const table = item.id.includes("domiciliation")
            ? "user_domiciliations"
            : "user_services";
          const payload =
            table === "user_domiciliations"
              ? {
                  user_id: userId!,
                  address: data.address,
                  duration: item.title.includes("1 an")
                    ? "12mois"
                    : item.title.includes("6 mois")
                    ? "6mois"
                    : item.title.includes("3 mois")
                    ? "3mois"
                    : null,
                  plan_type: item.title.includes("micro")
                    ? "micro"
                    : item.title.includes("entreprise")
                    ? "entreprise"
                    : item.title.includes("association")
                    ? "association"
                    : null,
                  status: "active",
                }
              : {
                  user_id: userId!,
                  name: item.title,
                  price: item.price,
                  status: "active",
                  category: "commande",
                };

          const { error } = await supabase.from(table).insert(payload);
          if (error) console.error(`Erreur enregistrement (${table}):`, error);
        })
      );

      clearCart();
      Alert.alert("Paiement réussi", "Merci pour votre commande !");
      router.push("/");
    } catch (err: any) {
      console.error("Erreur handleSubmit:", err);
      Alert.alert("Erreur", err.message || "Une erreur est survenue");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    isProcessing,
    items,
    subtotal,
    tax,
    total,
  };
};
export default function CheckoutScreen() {
  const {
    formData,
    setFormData,
    handleSubmit,
    isProcessing,
    items,
    subtotal,
    tax,
    total,
  } = Checkout();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Text style={styles.title}>Finaliser votre commande</Text>

        {/* Informations de facturation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de facturation</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={formData.email}
            onChangeText={(val) => handleChange("email", val)}
          />
          <CountrySelect
            value={formData.country}
            onValueChange={(val) => handleChange("country", val)}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Prénom"
              value={formData.firstName}
              onChangeText={(val) => handleChange("firstName", val)}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Nom"
              value={formData.lastName}
              onChangeText={(val) => handleChange("lastName", val)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nom de l'entreprise"
            value={formData.companyName}
            onChangeText={(val) => handleChange("companyName", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Activité de l'entreprise"
            value={formData.businessActivity}
            onChangeText={(val) => handleChange("businessActivity", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Numéro SIRET"
            value={formData.siretNumber}
            onChangeText={(val) => handleChange("siretNumber", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            value={formData.address}
            onChangeText={(val) => handleChange("address", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Complément d'adresse"
            value={formData.addressDetails}
            onChangeText={(val) => handleChange("addressDetails", val)}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Ville"
              value={formData.city}
              onChangeText={(val) => handleChange("city", val)}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Code postal"
              value={formData.postalCode}
              onChangeText={(val) => handleChange("postalCode", val)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            value={formData.phone}
            onChangeText={(val) => handleChange("phone", val)}
          />
        </View>

        {/* Résumé commande */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre commande</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSub}>Quantité : {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                {(item.price * item.quantity).toFixed(2)} €
              </Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text>Sous-total</Text>
            <Text>{subtotal.toFixed(2)} €</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>TVA (20%)</Text>
            <Text>{tax.toFixed(2)} €</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>{total.toFixed(2)} €</Text>
          </View>
        </View>

        {/* Bouton paiement */}
        <View style={styles.buttonContainer}>
          <Button
            title={
              isProcessing
                ? "Traitement en cours..."
                : `Payer ${total.toFixed(2)} €`
            }
            onPress={() => handleSubmit(formData)}
            disabled={isProcessing}
          />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  inputHalf: { width: "48%" },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
  },
  itemTitle: { fontWeight: "600" },
  itemSub: { fontSize: 12, color: "#666" },
  itemPrice: { fontWeight: "600" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  totalRow: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 8,
  },
  totalText: { fontWeight: "700" },
  buttonContainer: { marginTop: 20 },
});
