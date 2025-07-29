import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface ReviewsListProps {
  reviews: any[];
  isLoading: boolean;
  currentUserId?: string | null;
  onDeleteReview?: (reviewId: string) => Promise<void>;
}

const ReviewsList = ({
  reviews,
  isLoading,
  currentUserId,
  onDeleteReview,
}: ReviewsListProps) => {
  if (isLoading) {
    return <Text>Chargement des avis...</Text>;
  }

  if (reviews.length === 0) {
    return <Text style={styles.noReviews}>Aucun avis pour le moment.</Text>;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item: review }) => (
        <View style={styles.reviewItem}>
          <Text style={styles.userName}>{review.user_name}</Text>
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text
                  key={i}
                  style={
                    i < review.rating ? styles.starActive : styles.starInactive
                  }
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.date}>
              {new Date(review.created_at).toLocaleDateString("fr-FR")}
            </Text>
          </View>
          <Text style={styles.comment}>{review.comment}</Text>

          {currentUserId &&
            review.user_id === currentUserId &&
            onDeleteReview && (
              <TouchableOpacity onPress={() => onDeleteReview(review.id)}>
                <Text style={styles.deleteButton}>Supprimer</Text>
              </TouchableOpacity>
            )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noReviews: {
    color: "#6b7280", // gray-500
    fontStyle: "italic",
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
    paddingVertical: 12,
  },
  userName: {
    fontWeight: "600",
    color: "#1f2937", // gray-800
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  stars: {
    flexDirection: "row",
  },
  starActive: {
    color: "#facc15", // yellow-400
    marginRight: 2,
    fontSize: 18,
  },
  starInactive: {
    color: "#d1d5db", // gray-300
    marginRight: 2,
    fontSize: 18,
  },
  date: {
    fontSize: 12,
    color: "#6b7280", // gray-600
    marginLeft: 8,
  },
  comment: {
    marginTop: 8,
  },
  deleteButton: {
    marginTop: 8,
    fontSize: 12,
    color: "#ef4444", // red-500
  },
});

export default ReviewsList;
