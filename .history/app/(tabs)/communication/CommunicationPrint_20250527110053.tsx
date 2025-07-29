import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationPrint = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-lysco-turquoise">
            Communication Print
          </h1>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Faites de la communication print une alliée ! Elle vous permettra de vous démarquer de vos concurrents
              et d’attirer ou de fidéliser votre clientèle. <strong>Lys Conseil</strong> conçoit pour vous tous types
              de supports imprimés, pensés sur mesure selon votre image et vos objectifs.
            </p>

            <p>Voici une sélection de ce que nous réalisons :</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600 text-base pl-4">
              <span className="before:content-['•'] before:mr-2">Cartes de visite</span>
              <span className="before:content-['•'] before:mr-2">Flyers</span>
              <span className="before:content-['•'] before:mr-2">Affiches</span>
              <span className="before:content-['•'] before:mr-2">Brochures</span>
              <span className="before:content-['•'] before:mr-2">Dépliants</span>
              <span className="before:content-['•'] before:mr-2">Catalogues</span>
              <span className="before:content-['•'] before:mr-2">Menus</span>
              <span className="before:content-['•'] before:mr-2">Stickers</span>
              <span className="before:content-['•'] before:mr-2">Packaging</span>
              <span className="before:content-['•'] before:mr-2">Signalétique</span>
              <span className="before:content-['•'] before:mr-2">Roll-up</span>
              <span className="before:content-['•'] before:mr-2">PLV (Publicité sur le Lieu de Vente)</span>
            </div>

            <p>
              Chaque support est travaillé avec soin, tant sur le plan graphique que stratégique, pour garantir un
              rendu professionnel qui vous distingue.
            </p>
          </div>

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button size="lg" className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white text-lg px-8 py-4 rounded-xl shadow-md">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunicationPrint;
