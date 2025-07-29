import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import CommunicationFAQ from "@/src/components/communication/CommunicationFAQ";
import CommunicationHero from "@/src/components/communication/CommunicationHero";
import CommunicationServices from "@/src/components/communication/CommunicationServices";
import React from "react";

const Communication = () => {
  const [session, setSession] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar session={session} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <main className="flex-1">
        <CommunicationHero />
        <CommunicationServices />
        <CommunicationFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Communication;
