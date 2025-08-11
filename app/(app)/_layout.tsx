// app/(app)/_layout
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // pour éviter que “index” ou autre s'affiche en haut
      }}
    />
  );
}
