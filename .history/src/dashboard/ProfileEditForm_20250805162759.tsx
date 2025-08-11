import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface ProfileEditFormProps {
  profile: {
    first_name: string;
    last_name: string;
    company_name: string;
    phone: string;
  } | null;
  onUpdate: (updatedProfile: Partial<any>) => Promise<boolean>;
  onCancel: () => void;
}

const ProfileEditForm = ({
  profile,
  onUpdate,
  onCancel,
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    company_name: profile?.company_name || "",
    phone: profile?.phone || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const success = await onUpdate(formData);
      if (success) {
        onCancel();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Modifier votre profil</Text>

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={formData.first_name}
        onChangeText={(text) => handleChange("first_name", text)}
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={formData.last_name}
        onChangeText={(text) => handleChange("last_name", text)}
      />

      <Text style={styles.label}>Nom de l'entreprise</Text>
      <TextInput
        style={styles.input}
        value={formData.company_name}
        onChangeText={(text) => handleChange("company_name", text)}
      />

      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        value={formData.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Annuler" onPress={onCancel} disabled={isSubmitting} />
        <Button
          title={isSubmitting ? "Enregistrement..." : "Enregistrer"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 8 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  label: { marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ProfileEditForm;
