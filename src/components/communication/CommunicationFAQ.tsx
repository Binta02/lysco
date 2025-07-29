import { communicationFAQ } from "@/src/data/communicationFAQ";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Activer LayoutAnimation sur Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CommunicationFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="message-text-outline"
          size={28}
          color="#5cb9bc"
        />
        <Text style={styles.title}>Questions & Réponses</Text>
      </View>

      {/* <FlatList
        data={communicationFAQ}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleItem(index)}
              style={styles.trigger}
            >
              <Text style={styles.question}>{item.question}</Text>
            </TouchableOpacity>
            {activeIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        )}
      /> */}
      {communicationFAQ.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity
            onPress={() => toggleItem(index)}
            style={styles.trigger}
          >
            <Text style={styles.question}>{item.question}</Text>
          </TouchableOpacity>
          {activeIndex === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default CommunicationFAQ;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginLeft: 8, color: "#0f172a" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
    padding: 12,
  },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: { fontSize: 16, fontWeight: "500", color: "#374151" },
  answer: { marginTop: 8, color: "#6b7280" },
});
