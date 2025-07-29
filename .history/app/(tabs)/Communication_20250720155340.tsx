import Footer from "@/src/components/Footer";
import CommunicationFAQ from "@/src/components/communication/CommunicationFAQ";
import CommunicationHero from "@/src/components/communication/CommunicationHero";
import CommunicationServices from "@/src/components/communication/CommunicationServices";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Communication = () => {
  const [session, setSession] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container1}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        {" "}
        <CommunicationHero />
        <CommunicationServices />
        <CommunicationFAQ />
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#f9fafb",
    flex: 1,
  },
});
export default Communication;
