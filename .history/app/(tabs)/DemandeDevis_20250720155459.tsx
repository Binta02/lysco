import Footer from "@/src/components/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

// Schéma de validation
const formSchema = yup.object({
  firstName: yup.string().min(2, "...").required(),
  lastName: yup.string().min(2, "...").required(),
  email: yup.string().email("...").required(),
  phone: yup.string().min(10, "...").required(),
  company: yup.string().default(""),
  serviceType: yup.string().required("..."),
  budget: yup.string().default(""),
  message: yup.string().min(10, "...").required(),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  budget: string;
  message: string;
};

const DemandeDevis = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(
        "https://mon-backend-node.vercel.app/api/send-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (result.status === "success") {
        Alert.alert(
          "Demande envoyée",
          "Votre demande de devis a été envoyée avec succès. Nous vous contacterons bientôt."
        );
        reset();
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard."
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert(
        "Erreur de connexion",
        "Impossible de se connecter au serveur. Veuillez vérifier votre connexion."
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Demande de devis
        </Text>

        {/* Prénom */}
        <FormInput
          control={control}
          name="firstName"
          placeholder="Votre prénom"
          label="Prénom"
          error={errors.firstName?.message}
        />

        {/* Nom */}
        <FormInput
          control={control}
          name="lastName"
          placeholder="Votre nom"
          label="Nom"
          error={errors.lastName?.message}
        />

        {/* Email */}
        <FormInput
          control={control}
          name="email"
          placeholder="votre@email.com"
          label="Email"
          keyboardType="email-address"
          error={errors.email?.message}
        />

        {/* Téléphone */}
        <FormInput
          control={control}
          name="phone"
          placeholder="Votre numéro de téléphone"
          label="Téléphone"
          keyboardType="phone-pad"
          error={errors.phone?.message}
        />

        {/* Entreprise */}
        <FormInput
          control={control}
          name="company"
          placeholder="Nom de votre entreprise"
          label="Entreprise (optionnel)"
        />

        {/* Type de service */}
        <Controller
          control={control}
          name="serviceType"
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: 12 }}>
              <Text>Type de service</Text>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={{ borderWidth: 1, borderRadius: 8 }}
              >
                <Picker.Item label="Sélectionnez un service" value="" />
                <Picker.Item label="Domiciliation" value="domiciliation" />
                <Picker.Item label="Communication" value="communication" />
                <Picker.Item
                  label="Services administratifs"
                  value="administratif"
                />
                <Picker.Item label="Autre" value="autre" />
              </Picker>
              {errors.serviceType?.message && (
                <Text style={{ color: "red" }}>
                  {errors.serviceType.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Budget */}
        <FormInput
          control={control}
          name="budget"
          placeholder="Votre budget en €"
          label="Budget approximatif (optionnel)"
          keyboardType="numeric"
        />

        {/* Message */}
        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: 12 }}>
              <Text>Description de votre projet</Text>
              <TextInput
                placeholder="Décrivez votre besoin en détail..."
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={5}
                style={{
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 8,
                  minHeight: 100,
                  textAlignVertical: "top",
                }}
              />
              {errors.message?.message && (
                <Text style={{ color: "red" }}>{errors.message.message}</Text>
              )}
            </View>
          )}
        />

        {/* Bouton envoyer */}
        <Button
          title={isSubmitting ? "Envoi en cours..." : "Demander un devis"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
        <Footer />
      </ScrollView>
    </View>
  );
};

const FormInput = ({
  control,
  name,
  placeholder,
  label,
  keyboardType = "default",
  error,
}: {
  control: any;
  name: any;
  placeholder: string;
  label: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  error?: string;
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <View style={{ marginBottom: 12 }}>
        <Text>{label}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DemandeDevis;
