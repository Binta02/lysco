import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationStrategie = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-lysco-turquoise">
            Accompagnement Stratégique
          </h1>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Vous avez plein d’idées d’entrepreneuriat mais êtes perdue dans vos choix ? Ou votre entreprise stagne ?
              Ne restez pas seule et faites-vous accompagner par <strong>Lys Conseil</strong>. Nous réalisons un audit
              pour déterminer ce qui ne convient pas et vous proposons un coaching personnalisé.
            </p>

            <p>Nous vous proposons d’être coachée et guidée sur les éléments suivants :</p>

            <ul className="list-disc list-inside pl-4 text-gray-700">
              <li>L’organisation de votre temps de travail afin de pouvoir consacrer également du temps à vos proches</li>
              <li>La communication de votre image de marque</li>
              <li>Un accompagnement d’un point de vue commercial</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-center mt-16 mb-8 text-lysco-pink">Nos Prestations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Audit communication */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-lysco-turquoise">Audit Communication</h3>
              <p className="text-gray-600 mb-4">
                Voyons ensemble la communication la plus adéquate pour votre activité.
              </p>
              <p className="text-gray-900 font-bold">300€ le dossier</p>
            </div>

            {/* Audit commercial */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-lysco-turquoise">Audit Commercial</h3>
              <p className="text-gray-600 mb-4">
                Construisons une stratégie solide pour faire de votre entreprise un véritable aimant à clients.
              </p>
              <p className="text-gray-900 font-bold">300€ le dossier</p>
            </div>

            {/* Organisation */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-lysco-turquoise">Coaching Organisation</h3>
              <p className="text-gray-600 mb-4">
                Nous vous aidons à structurer vos journées, gérer votre temps, et fixer des priorités efficaces.
              </p>
              <p className="text-gray-900 font-bold">60€ / heure</p>
            </div>
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

export default CommunicationStrategie;
