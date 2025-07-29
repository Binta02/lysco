import { UserDomiciliation } from "@/hooks/useUserData";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface DomiciliationEditFormProps {
  domiciliation: UserDomiciliation | null;
  onUpdate: (
    updatedDomiciliation: Partial<UserDomiciliation>
  ) => Promise<boolean>;
  onCancel: () => void;
}

const DomiciliationEditForm: React.FC<DomiciliationEditFormProps> = ({
  domiciliation,
  onUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    address: domiciliation?.address || "",
    renewal_date: domiciliation?.renewal_date
      ? new Date(domiciliation.renewal_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
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
      <Text style={styles.title}>
        Modifier les informations de domiciliation
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Adresse</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(text) => handleChange("address", text)}
          placeholder="Entrez l'adresse"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date de renouvellement</Text>
        <TextInput
          style={styles.input}
          value={formData.renewal_date}
          onChangeText={(text) => handleChange("renewal_date", text)}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <Text style={[styles.buttonText, styles.outlineButtonText]}>
            Annuler
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enregistrer</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#4f46e5", // Indigo
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4f46e5",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outlineButtonText: {
    color: "#4f46e5",
  },
});

export default DomiciliationEditForm;
