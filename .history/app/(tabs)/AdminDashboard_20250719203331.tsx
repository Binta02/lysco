import { supabase } from "@/src/integrations/supabase/client";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminDashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchClientsAndCheckAdmin = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const currentUserId = userData.user.id;
      const { data: profileData } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", currentUserId)
        .single();

      if (!profileData?.is_admin) return;
      setIsAdmin(true);

      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name");

      if (allProfiles) setClients(allProfiles);
    };
    fetchClientsAndCheckAdmin();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedClient) return;
      const { data } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", selectedClient.id)
        .order("uploaded_at", { ascending: false });

      if (data) setDocuments(data);
    };
    fetchDocuments();
  }, [selectedClient]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      if (!isAdmin) return setLoadingReviews(false);
      setLoadingReviews(true);

      try {
        const { data: reviewsData } = await supabase
          .from("reviews")
          .select(
            "id, comment, rating, product_id, product_name, created_at, user_id"
          )
          .order("created_at", { ascending: false });

        if (!reviewsData) {
          setReviews([]);
          setLoadingReviews(false);
          return;
        }

        const userIds = Array.from(new Set(reviewsData.map((r) => r.user_id)));
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, first_name, last_name")
          .in("id", userIds as string[]);

        const profileMap: { [key: string]: string } = {};
        if (profilesData) {
          profilesData.forEach((p) => {
            profileMap[p.id] = `${p.first_name || ""} ${
              p.last_name || ""
            }`.trim();
          });
        }

        const formatted = reviewsData.map((r) => ({
          ...r,
          user_name: profileMap[r.user_id] || "Client",
        }));

        setReviews(formatted);
      } catch (error) {
        console.error("Erreur reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchAllReviews();
  }, [isAdmin]);

  const handleUpload = async () => {
    if (!selectedClient) return;
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "success") return;

    const filePath = `${selectedClient.id}/${result.name}`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, result.uri);

    if (uploadError) return console.error("Erreur upload", uploadError);

    const { data: publicUrl } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);
    const { data: insertedRow } = await supabase
      .from("user_documents")
      .insert({
        user_id: selectedClient.id,
        file_name: result.name,
        file_url: publicUrl.publicUrl,
      })
      .single();

    if (insertedRow) {
      setDocuments((prev) => [insertedRow, ...prev]);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    const { error } = await supabase
      .from("user_documents")
      .delete()
      .eq("id", docId);
    if (!error) setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleDeleteReview = (reviewId: string) => {
    Alert.alert("Confirmation", "Supprimer cet avis ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("id", reviewId);
          if (!error)
            setReviews((prev) => prev.filter((r) => r.id !== reviewId));
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>
        Gestion des clients, documents et avis
      </Text>

      {!isAdmin ? (
        <Text style={styles.warning}>⛔️ Accès réservé aux admins</Text>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clients</Text>
            <Picker
              selectedValue={selectedClient?.id || ""}
              onValueChange={(value) => {
                const client = clients.find((c) => c.id === value);
                setSelectedClient(client || null);
              }}
            >
              <Picker.Item label="Sélectionner un client" value="" />
              {clients.map((client) => (
                <Picker.Item
                  key={client.id}
                  label={`${client.first_name} ${client.last_name} — ${client.email}`}
                  value={client.id}
                />
              ))}
            </Picker>
          </View>

          {selectedClient && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Documents de {selectedClient.first_name}{" "}
                {selectedClient.last_name}
              </Text>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
              >
                <Text style={styles.uploadButtonText}>
                  Uploader un document
                </Text>
              </TouchableOpacity>

              {documents.length === 0 ? (
                <Text style={styles.emptyText}>
                  Aucun document pour ce client.
                </Text>
              ) : (
                documents.map((doc) => (
                  <View key={doc.id} style={styles.docCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.docName}>{doc.file_name}</Text>
                      <Text style={styles.docDate}>
                        {new Date(doc.uploaded_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(doc.file_url)}
                      >
                        <Text style={styles.docLink}>Voir le fichier</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Confirmation", "Supprimer ce document ?", [
                          { text: "Annuler", style: "cancel" },
                          {
                            text: "Supprimer",
                            style: "destructive",
                            onPress: () => handleDeleteDocument(doc.id),
                          },
                        ])
                      }
                    >
                      <Text style={styles.deleteText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Avis clients ({loadingReviews ? "..." : reviews.length})
            </Text>

            {loadingReviews ? (
              <Text style={styles.emptyText}>Chargement des avis…</Text>
            ) : reviews.length === 0 ? (
              <Text style={styles.emptyText}>Aucun avis trouvé.</Text>
            ) : (
              <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.reviewCard}>
                    <Text style={styles.reviewDate}>
                      {new Date(item.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    <Text style={styles.reviewLine}>
                      Utilisateur : {item.user_name}
                    </Text>
                    <Text style={styles.reviewLine}>
                      Produit : {item.product_name}
                    </Text>
                    <Text style={styles.reviewLine}>
                      Note : {item.rating} / 5
                    </Text>
                    <Text style={styles.reviewLine}>
                      Commentaire : {item.comment}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteReview(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  warning: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  uploadButtonText: { color: "#fff", fontWeight: "bold" },
  emptyText: { color: "#6b7280", fontStyle: "italic" },
  docCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  docName: { fontWeight: "bold", color: "#1f2937" },
  docDate: { color: "#6b7280", fontSize: 12 },
  docLink: { color: "#3b82f6", marginTop: 4, fontSize: 12 },
  deleteText: {
    color: "#dc2626",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  reviewDate: { color: "#6b7280", fontSize: 12, marginBottom: 4 },
  reviewLine: { fontSize: 14, color: "#374151", marginBottom: 2 },
  deleteButton: {
    backgroundColor: "#ef4444",
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
});
