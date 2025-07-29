import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationMediaTraining = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-lysco-turquoise mb-12">
            Media Training
          </h1>

          <div className="space-y-6 text-gray-700 text-lg">
            <p>
              Vous souhaitez améliorer votre prise de parole en public, que ce soit pour des présentations, des interviews ou des conférences ? Lys Conseil vous accompagne avec des coachs spécialisés pour :
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>Communiquer efficacement vos messages, assurant qu’ils soient clairs et percutants.</li>
              <li>Optimiser vos techniques de vente, pour transformer vos présentations en opportunités concrètes.</li>
              <li>Renforcer votre pouvoir de persuasion, afin de convaincre avec aisance et impact.</li>
              <li>Stimuler l’intérêt de vos clients, les incitant à choisir vos produits ou services.</li>
              <li>Exprimer votre perspective, en garantissant qu’elle soit comprise et appréciée à sa juste valeur.</li>
            </ul>

            <p>
              Un oral se prépare pour communiquer clairement ! Nous vous apprendrons à gérer votre stress, bien communiquer oralement et travailler votre langage corporel.
            </p>

            <h2 className="text-2xl font-semibold text-lysco-pink mt-10">Tarifs</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>60€</strong> de l’heure</li>
              <li><strong>90€</strong> de l’heure si déplacement</li>
            </ul>

            <h2 className="text-2xl font-semibold text-lysco-pink mt-10">Mini formation – 3 heures</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>160€ par personne <em>dans nos locaux</em> (minimum 2 personnes)</li>
              <li>250€ par personne <em>dans vos locaux</em> (minimum 2 personnes)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-lysco-pink mt-10">Formation en ligne</h2>
            <p>
              Vous recevez 3 vidéos expliquant comment bien préparer et bien communiquer pour différentes situations,
              accompagnées d'exercices pratiques.
            </p>
            <p className="font-bold">99€</p>
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

export default CommunicationMediaTraining;
