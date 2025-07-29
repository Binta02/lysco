import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCommunityManagement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-lysco-turquoise mb-12">
            Community Management
          </h1>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Notre agence de communication 360° vous aide à bâtir et à fédérer une communauté engagée autour de votre marque. Votre présence sur les réseaux sociaux devient un véritable levier de fidélisation.
            </p>
            <p>
              Notre équipe de community managers tisse des liens solides avec votre audience. Nous créons du contenu pertinent et engageant, répondons aux commentaires et messages, et gérons les échanges sur toutes vos plateformes.
            </p>
            <p>
              Nous assurons une veille concurrentielle constante pour vous proposer des actions pertinentes, des campagnes créatives et une gestion de crise en cas de besoin.
            </p>
            <p>
              Vos campagnes sont analysées avec des outils puissants afin de mesurer les performances et ajuster les actions pour des résultats toujours meilleurs.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-lysco-turquoise">Création de pages réseaux</h3>
              <p className="text-gray-600 mb-2">
                Des pages attractives et personnalisées, conçues pour valoriser votre marque sur les réseaux sociaux les plus pertinents.
              </p>
              <p className="text-gray-800 font-bold">À partir de 99 €</p>
            </div>

            <div className="bg-white border rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-lysco-turquoise">Gestion de pages réseaux</h3>
              <p className="text-gray-600 mb-2">
                Confiez-nous l’animation et la gestion quotidienne de vos comptes : on s’occupe de tout.
              </p>
              <p className="text-gray-800 font-bold">Sur devis</p>
            </div>

            <div className="bg-white border rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-lysco-turquoise">Refonte de pages réseaux</h3>
              <p className="text-gray-600 mb-2">
                Vos pages manquent d’impact ? Nous les modernisons pour qu’elles captivent à nouveau votre audience.
              </p>
              <p className="text-gray-800 font-bold">À partir de 99 €</p>
            </div>

            <div className="bg-white border rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-lysco-turquoise">Création de page Google</h3>
              <p className="text-gray-600 mb-2">
                Optimisez votre visibilité locale avec une fiche Google Business complète et bien référencée.
              </p>
              <p className="text-gray-800 font-bold">À partir de 99 €</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button className="bg-lysco-turquoise text-white px-8 py-4 text-lg hover:bg-lysco-turquoise/90 rounded-xl shadow">
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

export default CommunicationCommunityManagement;
