import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  company: z.string().optional(),
  serviceType: z
    .string()
    .min(1, { message: "Veuillez sélectionner un type de service" }),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, {
      message: "Veuillez décrire votre besoin en au moins 10 caractères",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const DemandeDevis = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
    <ScrollView contentContainerStyle={{ padding: 20 }}>
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
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Prénom</Text>
            <TextInput
              placeholder="Votre prénom"
              value={value}
              onChangeText={onChange}
              style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
            />
            {errors.firstName && (
              <Text style={{ color: "red" }}>{errors.firstName.message}</Text>
            )}
          </View>
        )}
      />

      {/* Nom */}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Nom</Text>
            <TextInput
              placeholder="Votre nom"
              value={value}
              onChangeText={onChange}
              style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
            />
            {errors.lastName && (
              <Text style={{ color: "red" }}>{errors.lastName.message}</Text>
            )}
          </View>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Email</Text>
            <TextInput
              placeholder="votre@email.com"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      {/* Téléphone */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Téléphone</Text>
            <TextInput
              placeholder="Votre numéro de téléphone"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
            />
            {errors.phone && (
              <Text style={{ color: "red" }}>{errors.phone.message}</Text>
            )}
          </View>
        )}
      />

      {/* Entreprise */}
      <Controller
        control={control}
        name="company"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Entreprise (optionnel)</Text>
            <TextInput
              placeholder="Nom de votre entreprise"
              value={value}
              onChangeText={onChange}
              style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
            />
          </View>
        )}
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
              onValueChange={(val) => onChange(val)}
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
            {errors.serviceType && (
              <Text style={{ color: "red" }}>{errors.serviceType.message}</Text>
            )}
          </View>
        )}
      />

      {/* Budget */}
      <Controller
        control={control}
        name="budget"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Budget approximatif (optionnel)</Text>
            <TextInput
              placeholder="Votre budget en €"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
            />
          </View>
        )}
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
            {errors.message && (
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
    </ScrollView>
  );
};

export default DemandeDevis;
