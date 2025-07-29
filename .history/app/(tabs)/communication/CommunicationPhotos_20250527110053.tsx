import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationPhotos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-lysco-turquoise">
            Service de Photographie
          </h1>

          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <p>
              La satisfaction de nos clients est notre moteur. Être à l’écoute de vos attentes et vous proposer des
              services de qualité au meilleur prix font partie de nos engagements. Lys Conseil vous propose un service
              photographique complet pour sublimer votre image et vos produits.
            </p>

            <p>
              Que ce soit pour soigner votre présence professionnelle ou valoriser vos offres, notre équipe met tout en
              œuvre pour que vos visuels fassent la différence.
            </p>

            <div className="border-l-4 border-lysco-pink pl-4">
              <h2 className="text-2xl font-semibold mb-2">Service de portraits</h2>
              <p>
                Réalisés dans nos locaux ou chez vous, les portraits professionnels mettent en avant votre image avec
                authenticité : parfaits pour vos réseaux sociaux, présentations ou cartes de visite.
              </p>
            </div>

            <div className="border-l-4 border-lysco-turquoise pl-4">
              <h2 className="text-2xl font-semibold mb-2">Photos de produits</h2>
              <p>
                Pour susciter l’acte d’achat, rien de tel qu’une image percutante. Nous organisons des shootings
                produits soignés, pour montrer la qualité et les atouts de vos articles.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Tarifs</h2>
              <p className="text-center text-gray-700 mb-1">
                <strong>Sur devis</strong>
              </p>
              <p className="text-center text-gray-500">
                <em>Prestations disponibles en Île-de-France, Guadeloupe et Orléans</em>
              </p>
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

export default CommunicationPhotos;
