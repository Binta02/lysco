import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/src/components/cart/CartContext";
import Footer from "@/src/components/Footer";
import CountrySelect from "@/src/components/services/CountrySelect";
import { CardField } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

const Checkout = () => {
  const stripe = useStripe();
  const router = useRouter();
  const { items, clearCart, subtotal, tax, total } = useCart();

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
      "domiciliation-mensuel-societe-normal": "price_1RSKGYQ5vrwB5bWyC5m7YKIm", //fait
      "domiciliation-mensuel-societe-reduit": "price_1RSMFmQ5vrwB5bWyBk9nXFcb", //fait
      "domiciliation-mensuel-auto-entrepreneur-normal":
        "price_1RSMGfQ5vrwB5bWyWe4cF5pp", //fait
      "domiciliation-mensuel-auto-entreprise-reduit":
        "price_1RSMGIQ5vrwB5bWy4e4ogBUY", //fait
      "domiciliation-mensuel-association": "price_1RSLsMQ5vrwB5bWydudKGQ7b", //fait
      "service-reexpedition": "price_1RSLlyQ5vrwB5bWyTf2ay5tf", //fait
      "service-scan": "price_1RSLmKQ5vrwB5bWyRouPTXPR", //fait
      "service-colis": "price_1RSLmcQ5vrwB5bWyeWckoEPg", //fait
      "coworking-space": "price_1RSMKlQ5vrwB5bWyTH1NrRlA", //fait
      "location-bureau": "price_1RSMLjQ5vrwB5bWyUerVSlHF", //fait
      "formation-room": "price_1RSMLIQ5vrwB5bWysp4JTZZQ", //fait
      "domiciliation-1an-entreprise": "price_1RSLi2Q5vrwB5bWyeizWaoWy", //fait
      "domiciliation-3mois-entreprise": "price_1RSLinQ5vrwB5bWyYpgyzSyL", //fait
      "domiciliation-3mois-micro": "price_1RSLjPQ5vrwB5bWyoNy1OKMb", //fait
      "domiciliation-6mois-entreprise": "price_1RSLkAQ5vrwB5bWyk4rjnkyb", //fait
      "domiciliation-6mois-micro": "price_1RSLkfQ5vrwB5bWymj0lkM4Z", //fait
      "pack-domine": "price_1RSLlCQ5vrwB5bWyqOByLGS5", //fait
      "vtc-creation": "price_1RSLnfQ5vrwB5bWy7D4g1s1M", //fait
      "bank-account": "price_1RSLo4Q5vrwB5bWyqaPfyWN0", //fait
      "company-creation": "price_1RSLoRQ5vrwB5bWyLbVvOhhe", //fait
      "micro-company": "price_1RSLozQ5vrwB5bWyhXZaREUE", //fait
      "company-transfer": "price_1RSLpLQ5vrwB5bWyFdN0Wljp", //fait
      "share-transfer": "price_1RSLpjQ5vrwB5bWynvYt7DzQ", //fait
      "commercial-ad": "price_1RSLqCQ5vrwB5bWyabANz81P", //fait
      "quote-creation": "price_1RSLqdQ5vrwB5bWyuMOQBt2h", //fait
      "annual-accounts": "price_1RSLqzQ5vrwB5bWyp2PPrbP2", //fait
      "company-modification": "price_1RSLrMQ5vrwB5bWyqYeVbL0c", //fait
    };
    return map[productId];
  };
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      // console.log("📡 Session Supabase récupérée:", data);
      setUserId(data?.session?.user.id || null);
    };
    getSession();
  }, []);

  // const { confirmPayment } = useConfirmPayment();
  const { confirmPayment } =
    Platform.OS !== "web" ? useConfirmPayment() : { confirmPayment: null };

  const validateFormData = (data: FormValues): string | null => {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "Adresse e-mail invalide.";
    }
    if (!data.firstName.trim()) return "Le prénom est obligatoire.";
    if (!data.lastName.trim()) return "Le nom est obligatoire.";
    if (!data.address.trim()) return "L'adresse est obligatoire.";
    if (!data.city.trim()) return "La ville est obligatoire.";
    if (!/^\d{5}$/.test(data.postalCode))
      return "Code postal invalide (5 chiffres).";
    if (data.phone && !/^\d{10,}$/.test(data.phone.replace(/\D/g, ""))) {
      return "Numéro de téléphone invalide.";
    }
    if (data.siretNumber && !/^\d{14}$/.test(data.siretNumber)) {
      return "Le numéro SIRET doit contenir 14 chiffres.";
    }
    return null; // tout est ok
  };

  const handleSubmit = async (data: FormValues) => {
    setIsProcessing(true);

    const validationError = validateFormData(data);
    if (validationError) {
      Alert.alert("Erreur de validation", validationError);
      setIsProcessing(false);
      return;
    }

    // console.log("▶ Début handleSubmit");
    // console.log("👉 userId:", userId);
    // console.log("👉 items:", items);
    // console.log("👉 stripe present:", !!stripe);
    // console.log("👉 confirmPayment present:", !!confirmPayment);

    if (!userId) {
      Alert.alert("Erreur", "Utilisateur non connecté.");
      setIsProcessing(false);
      return;
    }
    if (!stripe || !confirmPayment) {
      Alert.alert("Erreur", "Stripe non initialisé.");
      setIsProcessing(false);
      return;
    }

    try {
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          paymentMethodType: "Card",
          paymentMethodData: {
            billingDetails: {
              email: data.email,
              name: `${data.firstName} ${data.lastName}`,
            },
          },
        });

      if (pmError || !paymentMethod) {
        console.error("❌ Erreur création PaymentMethod:", pmError);
        Alert.alert(
          "Erreur",
          pmError?.message || "Erreur création PaymentMethod"
        );
        setIsProcessing(false);
        return;
      }

      // console.log("✅ PaymentMethod créé:", paymentMethod.id);

      // 2️⃣ Préparer les items pour le backend
      const oneTimeItems = items
        .map((item, index) => ({
          amount: Math.round(item.price * 100),
          quantity: item.quantity,
          index,
        }))
        .filter((i) => !subscriptionProductIds.includes(items[i.index].id));

      const subscriptionItems = items
        .map((item, index) => ({
          price: getPriceIdFromProductId(item.id)!,
          quantity: item.quantity,
        }))
        .filter((_, idx) => subscriptionProductIds.includes(items[idx].id));

      const resp = await fetch(
        "https://mon-backend-node.vercel.app/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            paymentMethodId: paymentMethod.id,
            userId,
            oneTimeItems,
            subscriptionItems,
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

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error("Backend error: " + text);
      }

      const { oneTimePaymentIntents, subscriptionPaymentIntent } =
        await resp.json();
      // console.log("✅ Réponse backend reçue");

      for (const { clientSecret, index } of oneTimePaymentIntents) {
        const { error: confirmErr } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
        });

        if (confirmErr) {
          throw new Error(
            `Erreur paiement item #${index}: ${confirmErr.message || ""}`
          );
        }
      }

      if (subscriptionPaymentIntent?.clientSecret) {
        const { error: subErr } = await confirmPayment(
          subscriptionPaymentIntent.clientSecret,
          {
            paymentMethodType: "Card",
          }
        );

        if (subErr) {
          throw new Error(`Erreur abonnement: ${subErr.message || ""}`);
        }
      }

      await Promise.all(
        items.map(async (item, idx) => {
          const table = item.id.includes("domiciliation")
            ? "user_domiciliations"
            : "user_services";

          let duration: string | null = null;
          let plan_type: string | null = null;
          let periodKey: "morning" | "afternoon" | "journée" = "journée";
          let start: string = "09:00";
          let end: string = "16:00";

          if (item.id.includes("domiciliation")) {
            duration = item.title.includes("1 an")
              ? "12mois"
              : item.title.includes("6 mois")
              ? "6mois"
              : item.title.includes("3 mois")
              ? "3mois"
              : null;

            plan_type = item.title.includes("micro")
              ? "micro"
              : item.title.includes("entreprise")
              ? "entreprise"
              : item.title.includes("association")
              ? "association"
              : null;
          }

          if (
            /(location-bureau|formation-room|coworking-space)/.test(item.id)
          ) {
            const date = item.id.match(/\d{4}-\d{2}-\d{2}/)?.[0] || "";
            const times = item.title.match(/\d{2}:\d{2}/g) || [];

            if (times.length === 1 && times[0]) {
              start = times[0];
              end = `${String(
                parseInt(times[0].split(":")[0], 10) + 1
              ).padStart(2, "0")}:00`;
              periodKey = "morning";
            } else if (
              times.length > 1 &&
              times[0] &&
              times[times.length - 1]
            ) {
              start = times[0];
              end = `${String(
                parseInt(times[times.length - 1].split(":")[0], 10) + 1
              ).padStart(2, "0")}:00`;
              periodKey = times.length === 2 ? "morning" : "journée";
            } else if (item.title.includes("morning")) {
              start = "09:00";
              end = "12:00";
              periodKey = "morning";
            } else if (item.title.includes("afternoon")) {
              start = "13:00";
              end = "16:00";
              periodKey = "afternoon";
            }

            const reservationType = `${item.id
              .split("-")
              .slice(0, 2)
              .join("-")} ${
              periodKey === "morning"
                ? "matin"
                : periodKey === "afternoon"
                ? "après-midi"
                : "journée"
            }`;

            const pi = oneTimePaymentIntents.find((p: any) => p.index === idx);

            const insertData = {
              user_id: userId,
              reservation_type: reservationType,
              reservation_date: date,
              price: item.price,
              period: `[${date}T${start}:00+00:00,${date}T${end}:00+00:00)`,
              payment_intent_id: pi?.id || null,
            };
            // console.log("📦 Insertion réservation:", insertData);
            const { error } = await supabase
              .from("reservations")
              .insert(insertData);
            if (error) console.error("❌ Erreur réservation:", error);
          } else if (item.id.includes("domiciliation")) {
            const insertData = {
              user_id: userId,
              address: data.address,
              duration,
              plan_type,
              status: "active",
            };
            // console.log("📦 Insertion domiciliation:", insertData);
            const { error } = await supabase
              .from("user_domiciliations")
              .insert(insertData);
            if (error) console.error("❌ Erreur domiciliation:", error);
          } else {
            const insertData = {
              user_id: userId,
              name: item.title,
              price: item.price,
              status: "active",
              category: "commande",
            };
            // console.log("📦 Insertion service:", insertData);
            const { error } = await supabase
              .from("user_services")
              .insert(insertData);
            if (error) console.error("❌ Erreur service:", error);
          }
        })
      );

      // clearCart();
      // Alert.alert("✅ Paiement réussi", "Merci pour votre commande !");
      // router.push("/(tabs)/Confirmation");
      const lastIntentId =
        oneTimePaymentIntents.length > 0
          ? oneTimePaymentIntents[oneTimePaymentIntents.length - 1].id
          : subscriptionPaymentIntent?.id || Date.now().toString();

      clearCart();
      Alert.alert("✅ Paiement réussi", "Merci pour votre commande !");
      router.push({
        pathname: "/(tabs)/Confirmation",
        params: {
          orderJson: JSON.stringify({
            orderId: lastIntentId, // 👈 ID réel Stripe
            items,
            subtotal,
            tax,
            total,
            clientInfo: data,
          }),
        },
      });
    } catch (err: any) {
      console.error("❌ Erreur handleSubmit:", err);
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
        <View style={{ padding: 16 }}>
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
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, country: val }))
              }
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations de paiement</Text>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "#FFFFFF",
                textColor: "#000000",
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 10,
              }}
              onCardChange={(cardDetails) => {
                // console.log("cardDetails", cardDetails);
              }}
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleSubmit(formData)}
            disabled={isProcessing}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isProcessing
                ? "Traitement en cours..."
                : `Payer ${total.toFixed(2)} €`}
            </Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
    marginBottom: 28,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  inputHalf: {
    flex: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#0f172a",
  },
  itemSub: {
    fontSize: 12,
    color: "#6b7280",
  },
  itemPrice: {
    fontWeight: "600",
    fontSize: 14,
    color: "#0f172a",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    paddingTop: 10,
  },
  totalText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0f172a",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#5cb9bc",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  placeholder: {
    color: "#9ca3af",
    fontSize: 16,
  },
});
