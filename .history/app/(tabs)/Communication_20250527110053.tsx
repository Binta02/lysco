
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunicationHero from '@/components/communication/CommunicationHero';
import CommunicationServices from '@/components/communication/CommunicationServices';
import CommunicationFAQ from '@/components/communication/CommunicationFAQ';

const Communication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
