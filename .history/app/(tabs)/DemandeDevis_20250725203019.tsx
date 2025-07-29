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
  firstName: yup.string().min(2, "Prénom trop court").required("Prénom requis"),
  lastName: yup.string().min(2, "Nom trop court").required("Nom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  phone: yup.string().min(10, "Numéro invalide").required("Téléphone requis"),
  company: yup.string().default(""),
  serviceType: yup.string().required("Veuillez choisir un service"),
  budget: yup.string().default(""),
  message: yup
    .string()
    .min(10, "Message trop court")
    .required("Message requis"),
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
          "Votre demande a bien été prise en compte."
        );
        reset();
      } else {
        Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      Alert.alert(
        "Connexion impossible",
        "Veuillez vérifier votre connexion internet."
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f4f8" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Demande de devis</Text>
          <View style={styles.card}>
            <FormInput
              control={control}
              name="firstName"
              placeholder="Votre prénom"
              label="Prénom"
              error={errors.firstName?.message}
            />
            <FormInput
              control={control}
              name="lastName"
              placeholder="Votre nom"
              label="Nom"
              error={errors.lastName?.message}
            />
            <FormInput
              control={control}
              name="email"
              placeholder="votre@email.com"
              label="Email"
              keyboardType="email-address"
              error={errors.email?.message}
            />
            <FormInput
              control={control}
              name="phone"
              placeholder="Votre numéro de téléphone"
              label="Téléphone"
              keyboardType="phone-pad"
              error={errors.phone?.message}
            />
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
                <View style={{ marginBottom: 16 }}>
                  <Text style={styles.label}>Type de service</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={styles.picker}
                    >
                      <Picker.Item label="Sélectionnez un service" value="" />
                      <Picker.Item
                        label="Domiciliation"
                        value="domiciliation"
                      />
                      <Picker.Item
                        label="Communication"
                        value="communication"
                      />
                      <Picker.Item
                        label="Services administratifs"
                        value="administratif"
                      />
                      <Picker.Item label="Autre" value="autre" />
                    </Picker>
                  </View>
                  {errors.serviceType?.message && (
                    <Text style={styles.errorText}>
                      {errors.serviceType.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <FormInput
              control={control}
              name="budget"
              placeholder="Votre budget en €"
              label="Budget (optionnel)"
              keyboardType="numeric"
            />

            {/* Message */}
            <Controller
              control={control}
              name="message"
              render={({ field: { onChange, value } }) => (
                <View style={{ marginBottom: 20 }}>
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
                    <Text style={styles.errorText}>
                      {errors.message.message}
                    </Text>
                  )}
                </View>
              )}
            />

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
      <View style={{ marginBottom: 16 }}>
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
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#1e293b",
  },
  textArea: {
    backgroundColor: "#f8fafc",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: "#1e293b",
    minHeight: 120,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    backgroundColor: "#f8fafc",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
  },
  picker: {
    color: "#1e293b",
    padding: 0,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: "#0f766e",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default DemandeDevis;
