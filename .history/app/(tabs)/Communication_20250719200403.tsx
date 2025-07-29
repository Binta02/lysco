import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import CommunicationFAQ from "@/src/components/communication/CommunicationFAQ";
import CommunicationHero from "@/src/components/communication/CommunicationHero";
import CommunicationServices from "@/src/components/communication/CommunicationServices";
import React from "react";
import { Text, View } from "react-native";

const Communication = () => {
  const [session, setSession] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Navbar session={session} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <Text className="flex-1">
        <CommunicationHero />
        <CommunicationServices />
        <CommunicationFAQ />
      </Text>
      <Footer />
    </View>
  );
};

export default Communication;
