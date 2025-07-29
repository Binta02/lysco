import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCreations = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-lysco-turquoise mb-16">
            Les créations de Lys&Co
          </h1>

          {/* Logos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-4">Les logos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105723.png" alt="Logo 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105730.png" alt="Logo 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105710.png" alt="Logo 3" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/logo-.jpg" alt="Logo 4" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105649.png" alt="Logo 5" />
            </div>
          </section>

          {/* Sites web */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-4">Les sites web</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105754-1.png" alt="Site 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105810-1.png" alt="Site 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1221.jpg" alt="Site 3" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105827-1.png" alt="Site 4" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105838.png" alt="Site 5" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105854.png" alt="Site 6" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105908.png" alt="Site 7" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105922.png" alt="Site 8" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105933.png" alt="Site 9" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1220.jpg" alt="Site 10" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1222.jpg" alt="Site 11" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105746-1.png" alt="Site 12" />
            </div>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Praticienne : <a href="https://www.nid-hypnose.com" className="text-lysco-turquoise underline" target="_blank">www.nid-hypnose.com</a></li>
              <li>Coiffeur : <a href="https://incantohairstudio.com" className="text-lysco-turquoise underline" target="_blank">incantohairstudio.com</a></li>
              <li>Construction de maison : <a href="https://maisonsjltconstruction.com" className="text-lysco-turquoise underline" target="_blank">maisonsjltconstruction.com</a></li>
            </ul>
          </section>

          {/* Photos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-6">Les photos</h2>

            {/* Objet */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Objet</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/objet4.jpg" alt="Objet 1" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/objet1.jpg" alt="Objet 2" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/objet5.jpg" alt="Objet 3" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/objet3.jpg" alt="Objet 4" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/objet2.jpg" alt="Objet 5" />
            </div>

            {/* Portrait */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Portrait</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110044.png" alt="Portrait 9" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0042-2048x1360.jpg" alt="Portrait 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0046-2048x1360.jpg" alt="Portrait 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0059-2048x1360.jpg" alt="Portrait 3" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0057-2048x1360.jpg" alt="Portrait 4" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0083-2048x1360.jpg" alt="Portrait 5" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/DSC_0065-2048x1360.jpg" alt="Portrait 6" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110102.png" alt="Portrait 7" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110052.png" alt="Portrait 8" />
            </div>

            {/* Métiers de bouches */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Métiers de bouches</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-05-213115.png" alt="Food 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110125.png" alt="Food 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110115.png" alt="Food 3" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/photo-matisse-scaled.jpeg" alt="Food 4" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/photo-matisse-2-2048x1536.jpeg" alt="Food 5" />
            </div>

            {/* Locaux */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Locaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/locaux1.jpg" alt="Locaux 1" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/locaux3.jpg" alt="Locaux 2" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/locaux2.jpg" alt="Locaux 3" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/locaux.jpg" alt="Locaux 4" />
            </div>
          </section>

          {/* Créations Print */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-4">Créations Prints</h2>

            {/* Métiers divers */}
            <h3 className="text-lg font-medium mb-2 text-pink-600">Métiers de divers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/image-restaurant.jpeg" alt="Menu 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110210.png" alt="Menu 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110217.png" alt="Menu 3" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110228.png" alt="Menu 4" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110238.png" alt="Menu 5" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110247.png" alt="Menu 6" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-110257.png" alt="Menu 7" />

            </div>

            {/* Cartes de visite */}
            <h3 className="text-lg font-medium mb-2 text-pink-600">Cartes de visite</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.51.39.jpeg" alt="Carte 1" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.57.31.jpeg" alt="Carte 2" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.51.40.jpeg" alt="Carte 3" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/cv3.png" alt="Carte 4" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/cv2.png" alt="Carte 5" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/cv1.png" alt="Carte 6" />
            </div>

            {/* Présentoirs */}
            <h3 className="text-lg font-medium mb-2 text-pink-600">Présentoirs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <img src="http://lys-conseil.com/wp-content/uploads/2024/01/p.jpg" alt="Présentoir" />
            </div>

            {/* Réseaux sociaux */}
            <h3 className="text-lg font-medium mb-2 text-pink-600">Post réseaux sociaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.52.27.jpeg" alt="Réseau 1" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.56.05.jpeg" alt="Réseau 2" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-11.56.04.jpeg" alt="Réseau 3" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/res-1.png" alt="Réseau 4" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/res2.png" alt="Réseau 5" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/01/res3.png" alt="Réseau 6" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-13.00.21.jpeg" alt="Réseau 7" />
              <img src="https://lys-conseil.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-07-at-13.00.22.jpeg" alt="Réseau 8" />
            </div>
          </section>

          <div className="text-center mt-20">
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

export default CommunicationCreations;
