import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ReactiverMonCompte() {
  const { user } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const reactivate = async () => {
      try {
        const res = await fetch(
          `https://mon-backend-node-henna.vercel.app/api/reactivate-account?user=${user}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Erreur inconnue");

        setMessage("🎉 Votre compte a été réactivé avec succès.");
      } catch (err: any) {
        setMessage(`❌ Échec : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    reactivate();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Réactivation de compte</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5cb9bc" />
            <Text style={styles.loadingText}>Traitement en cours...</Text>
          </View>
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 16,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#6b7280",
  },
  message: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
});
