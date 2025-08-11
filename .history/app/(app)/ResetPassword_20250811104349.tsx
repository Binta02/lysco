// import Footer from "@/src/components/Footer";
// import { supabase } from "@/src/integrations/supabase/client";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Linking,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   // Récupérer access_token et refresh_token du lien (deep link)
//   useEffect(() => {
//     const handleDeepLink = async () => {
//       const initialUrl = await Linking.getInitialURL();
//       if (!initialUrl) return;

//       try {
//         const parsedUrl = new URL(initialUrl);
//         const access_token = parsedUrl.searchParams.get("access_token");
//         const refresh_token = parsedUrl.searchParams.get("refresh_token");

//         if (access_token && refresh_token) {
//           const { error } = await supabase.auth.setSession({
//             access_token,
//             refresh_token,
//           });

//           if (error) {
//             console.error("Erreur de session :", error.message);
//           }
//         }
//       } catch (err) {
//         console.error("Erreur parsing URL :", err);
//       }
//     };

//     handleDeepLink();
//   }, []);

//   const handleResetPassword = async () => {
//     if (newPassword.length < 8) {
//       Alert.alert(
//         "Erreur",
//         "Le mot de passe doit contenir au moins 8 caractères."
//       );
//       return;
//     }
//     try {
//       const { error } = await supabase.auth.updateUser({
//         password: newPassword,
//       });

//       if (error) {
//         Alert.alert("Erreur", error.message);
//         return;
//       }

//       Alert.alert("Succès", "Votre mot de passe a été modifié avec succès.");
//       router.push("/(app)/Login");
//     } catch (error) {
//       console.error("Password update error:", error);
//       Alert.alert("Erreur", "Une erreur inattendue est survenue.");
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.card}>
//           <Text style={styles.title}>Réinitialisation du mot de passe</Text>
//           <Text style={styles.subtitle}>Entrez votre nouveau mot de passe</Text>

//           <View style={styles.inputContainer}>
//             <MaterialCommunityIcons
//               name="lock-outline"
//               size={20}
//               color="#9ca3af"
//               style={styles.icon}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Nouveau mot de passe"
//               secureTextEntry={!showPassword}
//               value={newPassword}
//               onChangeText={setNewPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.iconRight}
//             >
//               <MaterialCommunityIcons
//                 name={showPassword ? "eye-off-outline" : "eye-outline"}
//                 size={20}
//                 color="#9ca3af"
//               />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.hintText}>
//             Le mot de passe doit contenir au moins 8 caractères.
//           </Text>

//           <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//             <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       <Footer />
//     </View>
//   );
// };

// export default ResetPassword;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 8,
//     color: "#0f172a",
//   },
//   subtitle: {
//     textAlign: "center",
//     fontSize: 14,
//     color: "#6b7280",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#d1d5db",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   input: {
//     flex: 1,
//     height: 44,
//     fontSize: 14,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 4,
//   },
//   iconRight: {
//     padding: 4,
//   },
//   hintText: {
//     fontSize: 12,
//     color: "#6b7280",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#5cb9bc",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import Footer from "@/src/components/Footer";
import { supabase } from "@/src/integrations/supabase/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-url-polyfill/auto";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  const parseTokens = (url: string) => {
    console.log("🔹 [parseTokens] URL reçue :", url);

    const u = new URL(url);
    console.log("🔹 [parseTokens] Hostname :", u.hostname);
    console.log("🔹 [parseTokens] Search params initiaux :", u.search);
    console.log("🔹 [parseTokens] Hash initial :", u.hash);

    let access_token = u.searchParams.get("access_token");
    let refresh_token = u.searchParams.get("refresh_token");
    let type = u.searchParams.get("type");
    let email = u.searchParams.get("email");

    console.log("📍 [parseTokens] Tokens trouvés dans search :", {
      access_token: access_token ? "[PRESENT]" : null,
      refresh_token: refresh_token ? "[PRESENT]" : null,
      type,
      email,
    });

    // Vérifie aussi dans le hash (#)
    if ((!access_token || !refresh_token) && u.hash) {
      const hashParams = new URLSearchParams(u.hash.slice(1));
      console.log(
        "📍 [parseTokens] Analyse du hash :",
        Object.fromEntries(hashParams.entries())
      );

      access_token = access_token || hashParams.get("access_token");
      refresh_token = refresh_token || hashParams.get("refresh_token");
      type = type || hashParams.get("type");
      email = email || hashParams.get("email");
    }

    console.log("✅ [parseTokens] Tokens finaux :", {
      access_token: access_token ? "[PRESENT]" : null,
      refresh_token: refresh_token ? "[PRESENT]" : null,
      type,
      email,
    });

    return { access_token, refresh_token, type, email };
  };

  const trySetSessionFromUrl = async (url: string | null) => {
    console.log("🔹 [trySetSessionFromUrl] URL reçue :", url);

    if (!url) {
      console.log("❌ [trySetSessionFromUrl] Pas d'URL reçue");
      return;
    }

    try {
      // Log dans Supabase (utile si TestFlight et pas de console)
      console.log("📤 [trySetSessionFromUrl] Envoi du log dans reset_logs");
      await supabase
        .from("reset_logs")
        .insert({ raw_url: url, created_at: new Date().toISOString() });
      console.log("✅ [trySetSessionFromUrl] Log envoyé dans reset_logs");
    } catch (logErr) {
      console.log(
        "⚠️ [trySetSessionFromUrl] Erreur lors de l'envoi du log :",
        logErr
      );
    }

    console.log("🔍 [trySetSessionFromUrl] Parsing des tokens...");
    const { access_token, refresh_token, type, email } = parseTokens(url);
    console.log("🔍 Résultat parseTokens :", {
      access_token: access_token ? "[PRESENT]" : null,
      refresh_token: refresh_token ? "[PRESENT]" : null,
      type,
      email,
    });

    if (email) {
      console.log("📩 [trySetSessionFromUrl] Email détecté :", email);
      setEmail(email);
    }

    if (type !== "recovery") {
      console.log(
        `⚠️ [trySetSessionFromUrl] Type différent de 'recovery' (${type}), arrêt.`
      );
      return;
    }

    // Cas 1 : access_token + refresh_token
    if (access_token && refresh_token) {
      console.log(
        "🔐 [trySetSessionFromUrl] Tentative de setSession avec access_token + refresh_token..."
      );
      try {
        await supabase.auth.signOut();
        console.log(
          "ℹ️ [trySetSessionFromUrl] Session précédente déconnectée."
        );
      } catch (signOutErr) {
        console.log(
          "⚠️ [trySetSessionFromUrl] Erreur signOut (non bloquant) :",
          signOutErr
        );
      }

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      console.log("📊 [trySetSessionFromUrl] Résultat setSession :", {
        data,
        error,
      });

      if (error) {
        console.log(
          "❌ [trySetSessionFromUrl] Erreur setSession :",
          error.message
        );
      }

      if (data?.session) {
        console.log("✅ [trySetSessionFromUrl] Session créée avec succès.");
        setHasSession(true);
      } else {
        console.log(
          "❌ [trySetSessionFromUrl] Pas de session après setSession."
        );
      }
    }
    // Cas 2 : seulement access_token + email
    else if (access_token && email) {
      console.log(
        "🔐 [trySetSessionFromUrl] Pas de refresh_token → verifyOtp avec email..."
      );
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: access_token,
        type: "recovery",
      });

      console.log("📊 [trySetSessionFromUrl] Résultat verifyOtp :", {
        data,
        error,
      });

      if (error) {
        console.log(
          "❌ [trySetSessionFromUrl] Erreur verifyOtp :",
          error.message
        );
      }

      if (data?.session) {
        console.log(
          "✅ [trySetSessionFromUrl] Session créée avec succès via verifyOtp."
        );
        setHasSession(true);
      } else {
        console.log(
          "❌ [trySetSessionFromUrl] Pas de session après verifyOtp."
        );
      }
    }
    // Cas 3 : tokens manquants
    else {
      console.log(
        "❌ [trySetSessionFromUrl] Ni refresh_token ni email disponibles pour créer la session."
      );
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => trySetSessionFromUrl(url));

    const sub = Linking.addEventListener("url", ({ url }) => {
      trySetSessionFromUrl(url);
    });

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setHasSession(true);
      }
    })();

    return () => sub.remove();
  }, []);

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 8 caractères."
      );
      return;
    }

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      Alert.alert(
        "Lien invalide ou expiré",
        "Veuillez rouvrir le lien de réinitialisation depuis l'email."
      );
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      Alert.alert("Erreur", error.message);
      return;
    }

    Alert.alert("Succès", "Votre mot de passe a été modifié avec succès.");
    router.push("/(app)/Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Réinitialisation du mot de passe</Text>
          <Text style={styles.subtitle}>Entrez votre nouveau mot de passe</Text>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#9ca3af"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nouveau mot de passe"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconRight}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.hintText}>
            Le mot de passe doit contenir au moins 8 caractères.
          </Text>

          <TouchableOpacity
            style={[styles.button, !hasSession && { backgroundColor: "#ccc" }]}
            onPress={handleResetPassword}
            disabled={!hasSession}
          >
            <Text style={styles.buttonText}>
              {hasSession
                ? "Réinitialiser le mot de passe"
                : "Ouverture du lien..."}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#0f172a",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  input: { flex: 1, height: 44, fontSize: 14, paddingHorizontal: 8 },
  icon: { marginRight: 4 },
  iconRight: { padding: 4 },
  hintText: { fontSize: 12, color: "#6b7280", marginBottom: 20 },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
