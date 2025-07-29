// import React, { useState, useEffect } from "react";
// import { supabase } from "@/integrations/supabase/client";

// export default function AdminDashboard() {
//   const [clients, setClients] = useState<any[]>([]);
//   const [selectedClient, setSelectedClient] = useState<any | null>(null);
//   const [documents, setDocuments] = useState<any[]>([]);
//   const [file, setFile] = useState<File | null>(null);

//   // Charger tous les clients
//   useEffect(() => {
//     const fetchClients = async () => {
//       console.log("🔍 DÉBUT fetchClients");

//       const { data: userData, error: userError } =
//         await supabase.auth.getUser();

//       if (userError || !userData?.user) {
//         console.error(
//           "❌ Erreur récupération utilisateur connecté :",
//           userError
//         );
//         return;
//       }

//       const currentUserId = userData.user.id;
//       console.log("👤 ID utilisateur connecté :", currentUserId);

//       // Récupère le champ is_admin du profil actuel
//       const { data: profileData, error: profileError } = await supabase
//         .from("profiles")
//         .select("is_admin")
//         .eq("id", currentUserId)
//         .single();

//       if (profileError) {
//         console.error("❌ Erreur récupération profil admin :", profileError);
//         return;
//       }

//       console.log("🔐 Est admin :", profileData?.is_admin);

//       if (!profileData?.is_admin) {
//         console.warn("⛔️ Utilisateur non admin, accès refusé");
//         return;
//       }

//       // Requête pour TOUS les profils
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("id, email, first_name, last_name");
//       console.log("✅ USERS :", data);
//       console.log("❌ error :", error);

//       if (error) {
//         console.error("❌ Erreur chargement profils :", error);
//       } else {
//         console.log("✅ Profils récupérés :", data);
//         setClients(data || []);
//       }
//     };

//     fetchClients();
//   }, []);

//   // Charger les documents du client sélectionné
//   useEffect(() => {
//     const fetchDocuments = async () => {
//       if (!selectedClient) return;
//       const { data, error } = await supabase
//         .from("user_documents")
//         .select("*")
//         .eq("user_id", selectedClient.id)
//         .order("uploaded_at", { ascending: false });

//       if (error) console.error("Erreur chargement documents", error);
//       else setDocuments(data || []);
//     };

//     fetchDocuments();
//   }, [selectedClient]);

//   const handleUpload = async () => {
//     if (!file || !selectedClient) return;

//     const filePath = `${selectedClient.id}/${file.name}`;

//     // 1) Upload dans le bucket documents
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from("documents")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error("Erreur upload", uploadError);
//       return;
//     }

//     // 2) Récupérer l'URL publique
//     const { data: publicUrl } = supabase.storage
//       .from("documents")
//       .getPublicUrl(filePath);

//     // 3) Insérer dans user_documents et récupérer l'objet inséré (avec id)
//     const { data: insertedRow, error: insertError } = await supabase
//       .from("user_documents")
//       .insert({
//         user_id: selectedClient.id,
//         file_name: file.name,
//         file_url: publicUrl.publicUrl,
//       })
//       .select()
//       .single();

//     if (insertError) {
//       console.error("Erreur insertion", insertError);
//     } else {
//       // insérer l'objet complet avec son id dans le state
//       setFile(null);
//       setDocuments((prev) => [insertedRow, ...prev]);
//     }
//   };

//   const handleDelete = async (docId: string) => {
//     const { error } = await supabase
//       .from("user_documents")
//       .delete()
//       .eq("id", docId);
//     if (error) console.error("Erreur suppression", error);
//     else setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Gestion des clients et de leurs documents
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Liste des clients */}
//           <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               Clients
//             </h2>
//             <select
//               className="w-full border rounded p-2 text-gray-700"
//               onChange={(e) => {
//                 const client = clients.find((c) => c.id === e.target.value);
//                 setSelectedClient(client || null);
//               }}
//               value={selectedClient?.id || ""}
//             >
//               <option value="">Sélectionner un client</option>
//               {clients.map((client) => (
//                 <option key={client.id} value={client.id}>
//                   {client.first_name} {client.last_name} — {client.email}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Détails du client sélectionné */}
//           {selectedClient && (
//             <div className="w-full lg:w-2/3 space-y-6">
//               <div className="bg-white shadow rounded-lg p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">
//                   Documents de{" "}
//                   <span className="text-blue-600">
//                     {selectedClient.first_name} {selectedClient.last_name}
//                   </span>
//                 </h2>

//                 {/* Zone d’upload */}
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
//                   <input
//                     type="file"
//                     className="block w-full sm:w-auto text-gray-600 file:mr-4 file:py-2 file:px-4
//                              file:rounded file:border-0 file:text-sm file:font-semibold
//                              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     onChange={(e) => setFile(e.target.files?.[0] || null)}
//                   />
//                   <button
//                     className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg
//                              shadow hover:bg-blue-700 transition-colors duration-150"
//                     onClick={handleUpload}
//                   >
//                     Upload
//                   </button>
//                 </div>

//                 {/* Liste des documents */}
//                 {documents.length === 0 ? (
//                   <p className="text-gray-500">
//                     Aucun document pour ce client.
//                   </p>
//                 ) : (
//                   <ul className="space-y-4">
//                     {documents.map((doc) => (
//                       <li
//                         key={doc.id}
//                         className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row
//                                  justify-between items-start sm:items-center shadow-sm"
//                       >
//                         <div className="flex-1">
//                           <p className="text-gray-800 font-medium">
//                             {doc.file_name}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             {new Date(doc.uploaded_at).toLocaleDateString(
//                               "fr-FR",
//                               {
//                                 day: "2-digit",
//                                 month: "long",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               }
//                             )}
//                           </p>
//                           <a
//                             href={doc.file_url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-block mt-2 text-sm text-blue-600 hover:underline"
//                           >
//                             Voir le fichier
//                           </a>
//                         </div>
//                         <button
//                           onClick={() => handleDelete(doc.id)}
//                           className="mt-4 sm:mt-0 text-red-600 hover:text-red-800 transition-colors duration-150
//                                    font-medium text-sm"
//                         >
//                           Supprimer
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // États pour les avis
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true);

  // État pour savoir si c'est bien un admin
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // --- 1) Vérification admin + fetch clients (inchangé) ---
  useEffect(() => {
    const fetchClientsAndCheckAdmin = async () => {
      // console.log("🔍 DÉBUT fetchClientsAndCheckAdmin");

      // 1.1 Récupérer l'utilisateur courant
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error(
          "❌ Erreur récupération utilisateur connecté :",
          userError
        );
        return;
      }
      const currentUserId = userData.user.id;
      // console.log("👤 ID utilisateur connecté :", currentUserId);

      // 1.2 Vérifier le champ is_admin dans profiles
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", currentUserId)
        .single();

      if (profileError) {
        console.error("❌ Erreur récupération profil admin :", profileError);
        return;
      }
      // console.log("🔐 Est admin :", profileData?.is_admin);
      if (!profileData?.is_admin) {
        console.warn("⛔️ Utilisateur non admin, accès refusé");
        return;
      }

      setIsAdmin(true);

      // 1.3 Charger tous les profils (clients)
      const { data: allProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name");

      if (profilesError) {
        console.error("❌ Erreur chargement profils :", profilesError);
      } else {
        // console.log("✅ Profils récupérés :", allProfiles);
        setClients(allProfiles || []);
      }
    };

    fetchClientsAndCheckAdmin();
  }, []);

  // --- 2) Fetch documents du client sélectionné (inchangé) ---
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedClient) return;
      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", selectedClient.id)
        .order("uploaded_at", { ascending: false });

      if (error) {
        console.error("❌ Erreur chargement documents", error);
      } else {
        setDocuments(data || []);
      }
    };
    fetchDocuments();
  }, [selectedClient]);

  // --- 3) Fetch ALL Reviews + leurs auteurs en 2 requêtes ---
  useEffect(() => {
    const fetchAllReviews = async () => {
      // Si on n'est pas admin (ou qu'on n'a pas encore validé isAdmin), on arrête
      if (!isAdmin) {
        setLoadingReviews(false);
        return;
      }

      setLoadingReviews(true);
      try {
        // 3.1) Récupérer TOUTES les reviews (sans join)
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select(
            "id, comment, rating, product_id, product_name, created_at, user_id"
          )
          .order("created_at", { ascending: false });

        if (reviewsError) {
          throw reviewsError;
        }
        if (!reviewsData || reviewsData.length === 0) {
          setReviews([]);
          setLoadingReviews(false);
          return;
        }

        // 3.2) Construire la liste unique des user_id
        const userIds = Array.from(
          new Set(reviewsData.map((r) => r.user_id))
        ).filter((uid) => uid !== null && uid !== undefined);

        // 3.3) Récupérer les profils correspondants pour obtenir first_name / last_name
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name")
          .in("id", userIds as string[]);

        if (profilesError) {
          throw profilesError;
        }

        // 3.4) Construire un map { user_id → { first_name, last_name } }
        const profileMap: Record<
          string,
          { first_name: string; last_name: string }
        > = {};
        if (profilesData) {
          profilesData.forEach((p: any) => {
            profileMap[p.id] = {
              first_name: p.first_name || "",
              last_name: p.last_name || "",
            };
          });
        }

        // 3.5) Formatter chaque review pour ajouter user_name
        const formatted = reviewsData.map((r: any) => {
          const prof = profileMap[r.user_id] || {
            first_name: "",
            last_name: "",
          };
          let userName = "Client";
          if (prof.first_name || prof.last_name) {
            userName = `${prof.first_name} ${prof.last_name}`.trim();
          }
          return {
            id: r.id,
            comment: r.comment,
            rating: r.rating,
            product_id: r.product_id,
            product_name: r.product_name,
            created_at: r.created_at,
            user_id: r.user_id,
            user_name: userName,
          };
        });

        setReviews(formatted);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des avis :", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchAllReviews();
  }, [isAdmin]);

  // --- 4) Fonction pour supprimer un avis (admin) ---
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) {
      return;
    }
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) {
        console.error("❌ Erreur suppression avis :", error);
        return;
      }

      // On retire l'avis supprimé du state local
      setReviews((prev) => prev.filter((rev) => rev.id !== reviewId));
      alert("✅ Avis supprimé avec succès");
    } catch (err) {
      console.error("❌ Erreur lors de la suppression de l'avis :", err);
    }
  };

  // --- 5) Upload de document (inchangé) ---
  const handleUpload = async () => {
    if (!file || !selectedClient) return;

    const filePath = `${selectedClient.id}/${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error("❌ Erreur upload", uploadError);
      return;
    }
    // 2) Récupérer l'URL publique

    const { data: publicUrl } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);
    const fileUrl = publicUrl.publicUrl;

    const { data: insertedRow, error: insertError } = await supabase
      .from("user_documents")
      .insert({
        user_id: selectedClient.id,
        file_name: file.name,
        file_url: publicUrl.publicUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Erreur insertion", insertError);
    } else {
      setFile(null);
      setDocuments((prev) => [insertedRow, ...prev]);
      // 5) ENVOYER L’E-MAIL AU CLIENT
      try {
        const response = await fetch(
          "https://mon-backend-node.vercel.app/api/send-document-notification",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: selectedClient.email, // adresse e-mail du client
              fileName: file.name, // nom du fichier (affiché dans l’e-mail)
              fileUrl: fileUrl, // URL publique du document
            }),
          }
        );

        if (!response.ok) {
          const err = await response.json();
          console.error(
            "❌ Erreur envoi e-mail :",
            err.error || response.statusText
          );
        }
        // else {
        //   console.log(
        //     "✅ E-mail de notification envoyé à",
        //     selectedClient.email
        //   );
        // }
      } catch (err) {
        console.error(
          "❌ Exception lors de l’appel à send-document-notification :",
          err
        );
      }
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    const { error } = await supabase
      .from("user_documents")
      .delete()
      .eq("id", docId);
    if (error) {
      console.error("❌ Erreur suppression document", error);
    } else {
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    }
  };

  // --- Rendu JSX final ---
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestion des clients, documents et avis
        </h1>

        {/* === SECTION CLIENTS === */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Clients
            </h2>
            <select
              className="w-full border rounded p-2 text-gray-700"
              onChange={(e) => {
                const client = clients.find((c) => c.id === e.target.value);
                setSelectedClient(client || null);
              }}
              value={selectedClient?.id || ""}
            >
              <option value="">Sélectionner un client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name} — {client.email}
                </option>
              ))}
            </select>
          </div>

          {/* Détails du client sélectionné */}
          {selectedClient && (
            <div className="w-full lg:w-2/3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Documents de{" "}
                    <span className="text-blue-600">
                      {selectedClient.first_name} {selectedClient.last_name}
                    </span>
                  </h2>

                  {/* Zone d’upload */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <input
                      type="file"
                      className="block w-full sm:w-auto text-gray-600 file:mr-4 file:py-2 file:px-4
                               file:rounded file:border-0 file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <button
                      className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg
                               shadow hover:bg-blue-700 transition-colors duration-150"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  </div>

                  {/* Liste des documents */}
                  {documents.length === 0 ? (
                    <p className="text-gray-500">
                      Aucun document pour ce client.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {documents.map((doc) => (
                        <li
                          key={doc.id}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row
                                   justify-between items-start sm:items-center shadow-sm"
                        >
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">
                              {doc.file_name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(doc.uploaded_at).toLocaleDateString(
                                "fr-FR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                            >
                              Voir le fichier
                            </a>
                          </div>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="mt-4 sm:mt-0 text-red-600 hover:text-red-800 transition-colors duration-150
                                     font-medium text-sm"
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* === SECTION AVIS (VISIBLE UNIQUEMENT SI ADMIN) === */}
        {isAdmin && (
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Gestion des avis ({loadingReviews ? "..." : reviews.length})
                </h2>

                {loadingReviews ? (
                  <p className="text-gray-500">Chargement des avis…</p>
                ) : reviews.length === 0 ? (
                  <p className="text-gray-500">Aucun avis trouvé.</p>
                ) : (
                  <div className="w-full overflow-x-auto">
                    {/* Affichage en tableau pour écrans md+ */}
                    <table className="min-w-full table-auto border-collapse hidden md:table">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Utilisateur
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Produit
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Note
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Commentaire
                          </th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((rev) => (
                          <tr
                            key={rev.id}
                            className="border-t hover:bg-gray-50"
                          >
                            <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">
                              {new Date(rev.created_at).toLocaleDateString(
                                "fr-FR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                              {rev.user_name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                              {rev.product_name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                              {rev.rating} / 5
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {rev.comment}
                            </td>
                            <td className="px-4 py-2 text-sm text-right whitespace-nowrap">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteReview(rev.id)}
                              >
                                Supprimer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Affichage en cartes pour écrans sm */}
                    <div className="flex flex-col space-y-4 md:hidden">
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
                        >
                          <div className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                {new Date(rev.created_at).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteReview(rev.id)}
                              >
                                Supprimer
                              </Button>
                            </div>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">
                                Utilisateur&nbsp;:
                              </span>{" "}
                              {rev.user_name}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">
                                Produit&nbsp;:
                              </span>{" "}
                              {rev.product_name}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Note&nbsp;:</span>{" "}
                              {rev.rating} / 5
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">
                                Commentaire&nbsp;:
                              </span>{" "}
                              {rev.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
