import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Détail pour le service : {id}</Text>
    </View>
  );
}
