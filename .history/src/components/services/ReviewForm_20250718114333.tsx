import { supabase } from "@/integrations/supabase/client";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ReviewFormProps {
  productName: string;
  productId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productName,
  productId,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (rating === 0) {
      Alert.alert("Erreur", "Veuillez attribuer une note.");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        Alert.alert(
          "Connexion requise",
          "Vous devez être connecté pour laisser un avis."
        );
        return;
      }

      const { error } = await supabase.from("reviews").insert({
        product_id: productId,
        product_name: productName,
        rating: rating,
        comment: data.comment,
        user_id: session.session.user.id,
      });

      if (error) throw error;

      Alert.alert("Avis envoyé", "Merci pour votre avis !");
      reset();
      setRating(0);
      onReviewSubmitted();
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        Donnez votre avis sur "{productName}"
      </Text>
      <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
        Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont
        indiqués avec *
      </Text>

      {/* Note */}
      <Text style={{ marginBottom: 8 }}>Votre note *</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setRating(value)}
            onPressIn={() => setHoveredRating(value)}
            onPressOut={() => setHoveredRating(0)}
          >
            <FontAwesome
              name="star"
              size={28}
              color={
                (hoveredRating > 0 ? value <= hoveredRating : value <= rating)
                  ? "#facc15"
                  : "#d1d5db"
              }
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
        ))}
        {rating > 0 && (
          <Text style={{ marginLeft: 8, color: "#6b7280" }}>({rating}/5)</Text>
        )}
      </View>

      {/* Commentaire */}
      <Controller
        control={control}
        name="comment"
        rules={{ required: "Ce champ est requis", minLength: 5 }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 8 }}>Votre avis *</Text>
            <TextInput
              multiline
              placeholder="Partagez votre expérience..."
              value={value}
              onChangeText={onChange}
              style={{
                borderColor: error ? "red" : "#d1d5db",
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                minHeight: 100,
                textAlignVertical: "top",
              }}
            />
            {error && (
              <Text style={{ color: "red", marginTop: 4 }}>
                {error.type === "minLength"
                  ? "Votre avis doit contenir au moins 5 caractères."
                  : error.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Bouton Soumettre */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#06b6d4",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <FontAwesome
              name="send"
              size={16}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Soumettre</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ReviewForm;
