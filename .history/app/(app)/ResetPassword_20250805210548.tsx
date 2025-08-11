// import Footer from "@/src/components/Footer";
// import { supabase } from "@/src/integrations/supabase/client";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
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
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // ✅ Restaure la session Supabase à partir du lien (token)
  useEffect(() => {
    const restoreSession = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsed = Linking.parse(url);
        const { access_token, refresh_token } = parsed.queryParams || {};

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.exchangeCodeForSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("Erreur lors de l'échange de session :", error);
            Alert.alert("Erreur", "Impossible de réactiver votre session.");
          }
        }
      }
    };

    restoreSession();
  }, []);

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 8 caractères."
      );
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        Alert.alert("Erreur", error.message);
        return;
      }

      Alert.alert("Succès", "Votre mot de passe a été modifié avec succès.");
      router.push("/(app)/Login");
    } catch (error) {
      console.error("Password update error:", error);
      Alert.alert("Erreur", "Une erreur inattendue est survenue.");
    }
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

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
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
  input: {
    flex: 1,
    height: 44,
    fontSize: 14,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 4,
  },
  iconRight: {
    padding: 4,
  },
  hintText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
