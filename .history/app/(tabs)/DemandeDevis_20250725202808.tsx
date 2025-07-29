import Footer from "@/src/components/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Demande de devis</Text>

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
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Type de service</Text>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
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
                  <Text style={styles.errorText}>
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
            label="Budget approximatif"
            keyboardType="numeric"
          />

          {/* Message */}
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Description de votre projet</Text>
                <TextInput
                  placeholder="Décrivez votre besoin en détail..."
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={5}
                  style={styles.textArea}
                />
                {errors.message?.message && (
                  <Text style={styles.errorText}>{errors.message.message}</Text>
                )}
              </View>
            )}
          />

          {/* Bouton envoyer */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Envoi en cours..." : "Demander un devis"}
            </Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          style={styles.input}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
    marginBottom: 28,
  },
  fieldContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#0f172a",
  },
  picker: {
    backgroundColor: "#f1f5f9",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 4,
  },
  textArea: {
    backgroundColor: "#f1f5f9",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#0f172a",
    minHeight: 120,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#f9429e",
    fontSize: 12,
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default DemandeDevis;
