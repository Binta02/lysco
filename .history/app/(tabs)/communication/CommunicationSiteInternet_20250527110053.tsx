import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationSiteInternet = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-lysco-turquoise">
            Création de Site Internet
          </h1>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Un site internet est comparable à une vitrine d’une enseigne. Plus cette vitrine est attrayante, plus le
              potentiel acheteur se rend sur le site. <strong>Lys Conseil</strong> conçoit des sites internet avec un
              excellent UX Design, adaptés à tous les terminaux et optimisés pour le SEO.
            </p>

            <p>
              En fonction de votre activité, vous pourrez opter pour un site e-commerce (avec catalogue produit) ou un
              site vitrine. Tous nos sites sont <strong>responsive</strong> et conçus avec soin pour optimiser
              l’expérience utilisateur. Le contenu est pensé pour le référencement naturel afin d’être visible sur les
              moteurs de recherche.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-center mt-16 mb-8 text-lysco-pink">Nos Offres</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Site vitrine */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-lysco-turquoise">Site Vitrine</h3>
              <p className="text-gray-600 mb-4">
                Présentez vos services en ligne avec un site simple, élégant, et percutant.
              </p>
              <p className="text-gray-900 font-bold">À partir de 1000€</p>
            </div>

            {/* Site e-commerce */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-lysco-turquoise">Site e-commerce</h3>
              <p className="text-gray-600 mb-4">
                Offrez une boutique en ligne fluide avec gestion de catalogue, panier, paiement sécurisé.
              </p>
              <p className="text-gray-900 font-bold">À partir de 1500€</p>
            </div>

            {/* Refonte SEO */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-lysco-turquoise">Refonte & SEO</h3>
              <p className="text-gray-600 mb-4">
                Optimisez votre site actuel avec un meilleur design, une navigation fluide et un SEO performant.
              </p>
              <p className="text-gray-900 font-bold">À partir de 50€/heure</p>
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

export default CommunicationSiteInternet;
