import { supabase } from "@/src/integrations/supabase/client";
// import { Picker } from "@react-native-picker/picker";
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
      console.log("🧑‍💼 Utilisateur connecté :", currentUserId);
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
    if (!selectedClient) {
      console.log("🚫 Aucun client sélectionné.");
      return;
    }

    console.log("📁 Ouverture du picker de documents...");
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "*/*",
    });

    console.log("📄 Résultat du picker :", result);
    if (result.canceled || !result.assets || result.assets.length === 0) return;

    const file = result.assets[0];
    const { name, uri, mimeType } = file;

    try {
      console.log("📄 Fichier sélectionné :", name, uri, mimeType);

      const formData = new FormData();
      formData.append("file", {
        uri,
        name,
        type: mimeType || "application/octet-stream",
      } as any);

      formData.append("user_id", selectedClient.id);

      const response = await fetch(
        "https://mon-backend-node.vercel.app/api/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const responseText = await response.text();
      console.log("📬 Réponse API upload (texte brut) :", responseText);

      if (!response.ok) {
        console.error(
          "❌ Erreur serveur :",
          responseText || response.statusText
        );
        return;
      }

      // ✅ Essaye de parser la réponse si c'est du JSON
      let insertedDoc = null;
      try {
        const resJson = JSON.parse(responseText);
        insertedDoc = resJson.file;
      } catch (e) {
        console.warn("⚠️ Réponse non JSON :", responseText);
      }

      if (insertedDoc) {
        setDocuments((prev) => [insertedDoc, ...prev]);
      }

      alert("✅ Fichier envoyé avec succès !");
    } catch (error) {
      console.error("❌ Erreur envoi fichier via API Vercel :", error);
    }
  };

  // const handleDeleteDocument = async (docId: string) => {
  //   const { error } = await supabase
  //     .from("user_documents")
  //     .delete()
  //     .eq("id", docId);
  //   if (!error) setDocuments((prev) => prev.filter((d) => d.id !== docId));
  // };

  const handleDeleteDocument = async (docId: string, filePath: string) => {
    // 1. Supprimer du storage
    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (storageError) {
      console.error("❌ Erreur suppression fichier storage :", storageError);
      return;
    }

    // 2. Supprimer de la BDD
    const { error: dbError } = await supabase
      .from("user_documents")
      .delete()
      .eq("id", docId);

    if (dbError) {
      console.error("❌ Erreur suppression base :", dbError);
      return;
    }

    // 3. Mise à jour de l’état local
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
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
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setSelectedClient(null)}
            >
              <Text style={styles.uploadButtonText}>
                Sélectionner un client
              </Text>
            </TouchableOpacity>

            {clients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={[
                  styles.clientButton,
                  selectedClient?.id === client.id &&
                    styles.clientButtonSelected,
                ]}
                onPress={() => setSelectedClient(client)}
              >
                <Text
                  style={{
                    color:
                      selectedClient?.id === client.id ? "#fff" : "#374151",
                  }}
                >
                  {client.first_name} {client.last_name} — {client.email}
                </Text>
              </TouchableOpacity>
            ))}
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
                      {/* <TouchableOpacity
                        onPress={() => Linking.openURL(doc.file_url)}
                      >
                        <Text style={styles.docLink}>Voir le fichier</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={async () => {
                          console.log(
                            "📁 URL du fichier original :",
                            doc.file_url
                          );

                          if (!doc.file_url) {
                            Alert.alert(
                              "Erreur",
                              "Le lien du fichier est manquant."
                            );
                            return;
                          }

                          const proxyUrl = `https://mon-backend-node.vercel.app/api/download?url=${
                            doc.file_url
                          }&filename=${encodeURIComponent(doc.file_name)}`;

                          console.log("🔁 URL proxy :", proxyUrl);

                          const supported = await Linking.canOpenURL(proxyUrl);
                          if (supported) {
                            try {
                              await Linking.openURL(proxyUrl);
                              console.log("✅ Lien proxy ouvert avec succès");
                            } catch (err) {
                              console.log("❌ Erreur ouverture proxy :", err);
                              Alert.alert(
                                "Erreur",
                                "Impossible d’ouvrir le fichier. Voici le lien à copier :\n\n" +
                                  proxyUrl
                              );
                            }
                          } else {
                            Alert.alert(
                              "Non supporté",
                              "Ce lien ne peut pas être ouvert. Voici l’URL à copier :\n\n" +
                                proxyUrl
                            );
                          }
                        }}
                      >
                        <Text
                          style={{
                            color: "blue",
                            textDecorationLine: "underline",
                          }}
                        >
                          Voir le fichier
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Confirmation", "Supprimer ce document ?", [
                          { text: "Annuler", style: "cancel" },
                          {
                            text: "Supprimer",
                            style: "destructive",
                            // onPress: () => handleDeleteDocument(doc.id),
                            onPress: () =>
                              handleDeleteDocument(
                                doc.id,
                                `${doc.user_id}/${doc.file_name}`
                              ),
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
  clientButton: {
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  clientButtonSelected: {
    backgroundColor: "#5cb9bc",
  },
});
