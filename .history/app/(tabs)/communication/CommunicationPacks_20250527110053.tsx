import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationPacks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-lysco-turquoise mb-10">
            Nos Packs de Communication
          </h1>

          <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-14">
            Lys Conseil met à votre disposition trois packs complets, spécialement conçus pour répondre à vos besoins
            en communication, tout en respectant votre budget. Chacun d’eux inclut un accompagnement stratégique et une
            flexibilité maximale dans les modalités de paiement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pack Starter */}
            <div className="border border-gray-200 rounded-2xl bg-white p-6 shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Pack Starter</h2>
              <p className="text-center text-lysco-pink font-medium mb-4">Lancez-vous</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Création de logo</li>
                <li>Identité visuelle</li>
                <li>Carte de visite (hors impression)</li>
                <li>Site web one page</li>
              </ul>
              <p className="text-center font-bold text-lg text-gray-900">À partir de 1500€</p>
            </div>

            {/* Pack Moyen */}
            <div className="border border-gray-200 rounded-2xl bg-white p-6 shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Pack Moyen</h2>
              <p className="text-center text-lysco-pink font-medium mb-4">Repensez votre image</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Création de logo</li>
                <li>Identité visuelle</li>
                <li>Carte de visite (hors impression)</li>
                <li>Site vitrine 3 pages</li>
                <li>10 photos professionnelles incluses</li>
                <li>Page réseau social</li>
              </ul>
              <p className="text-center font-bold text-lg text-gray-900">À partir de 2000€</p>
            </div>

            {/* Pack Pro */}
            <div className="border border-gray-200 rounded-2xl bg-white p-6 shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Pack Pro</h2>
              <p className="text-center text-lysco-pink font-medium mb-4">La solution pour performer</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Création de logo</li>
                <li>Identité visuelle</li>
                <li>Flyer recto</li>
                <li>Carte de visite (hors impression)</li>
                <li>Site vitrine 5 pages</li>
                <li>Pages réseaux sociaux (3 pages)</li>
              </ul>
              <p className="text-center font-bold text-lg text-gray-900">À partir de 2600€</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button className="text-lg px-8 py-4 rounded-xl bg-lysco-turquoise text-white hover:bg-lysco-turquoise/90 shadow">
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

export default CommunicationPacks;
