
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EspacesTravail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="/espaces-travail">Nos espaces de travail</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nos espaces de travail</h1>
          
          {/* Services disponibles - Nouvelle section avec cartes */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center text-lysco-turquoise">
              Réservez dès maintenant nos espaces
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Espace de coworking */}
              <Card className="overflow-hidden">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  {/* <p className="text-gray-500">Image de l'espace de coworking</p> */}
                  <img src="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_a915053597e240a9baa31a00123ab7afmv2.webp" alt="espace de coworking" className="w-full h-full object-cover rounded-lg" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Espace de coworking</h3>
                  <p className="text-gray-600 mb-4">
                    Espace de coworking pour 8 personnes avec Wi-Fi et espace calme.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>À partir de 5€/heure</span>
                  </div>
                  <Link to="/services/coworking-space">
                    <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                      Réserver maintenant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Salle de formation */}
              <Card className="overflow-hidden">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  {/* <p className="text-gray-500">Image de la salle de formation</p> */}
                  <img src="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_701844a302db4d7babbfbd3ff9bdbabemv2.webp" alt="Salle de formation" className="w-full h-full object-cover rounded-lg" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Salle de formation</h3>
                  <p className="text-gray-600 mb-4">
                    Salle pour 10 personnes avec équipement pédagogique.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>10€/h, 25€/demi-journée, 45€/journée</span>
                  </div>
                  <Link to="/services/formation-room">
                    <Button className="w-full bg-lysco-pink hover:bg-lysco-pink/90">
                      Réserver maintenant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Location de bureau */}
              <Card className="overflow-hidden">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  {/* <p className="text-gray-500">Image du bureau privé</p> */}
                  <img src="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_d5ce529552664ec3b89f4e4099e76269mv2.webp" alt="Bureau privé" className="w-full h-full object-cover rounded-lg" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Location de bureau</h3>
                  <p className="text-gray-600 mb-4">
                    Espaces privés et calmes pour un travail concentré.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>125€/demi-journée, 250€/journée</span>
                  </div>
                  <Link to="/services/location-bureau">
                    <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                      Réserver maintenant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-lysco-turquoise">Espace de coworking moderne</h2>
              <p className="text-gray-600 mb-4">
                Notre espace de coworking offre un environnement moderne et stimulant pour les entrepreneurs et les équipes. 
                Avec des espaces de travail flexibles, une connexion internet haut débit, et toutes les commodités nécessaires, 
                vous pourrez travailler efficacement dans un cadre professionnel.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Postes de travail ergonomiques</li>
                <li>Salles de réunion équipées</li>
                <li>Coin café et détente</li>
                <li>Connexion internet haut débit sécurisée</li>
                <li>Imprimantes et scanners accessibles</li>
              </ul>
              <Link to="/services/coworking-space">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Réserver un espace
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              {/* <p className="text-gray-500">Image de l'espace de coworking</p> */}
              <img src="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_a915053597e240a9baa31a00123ab7afmv2.webp" alt="Salle de réunion" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="order-2 md:order-1 bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              {/* <p className="text-gray-500">Image des bureaux privés</p> */}
              <img src="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_d5ce529552664ec3b89f4e4099e76269mv2.webp" alt="Salle de réunion" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-semibold mb-4 text-lysco-pink">Bureaux privés</h2>
              <p className="text-gray-600 mb-4">
                Pour ceux qui recherchent plus de confidentialité et d'espace dédié, nos bureaux privés offrent 
                l'environnement parfait pour les équipes et les professionnels. Entièrement équipés et personnalisables, 
                ces espaces vous permettent de vous concentrer pleinement sur votre activité.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Espaces sécurisés et privés</li>
                <li>Mobilier de qualité</li>
                <li>Accès 24/7</li>
                <li>Services de réception</li>
                <li>Forfaits flexibles : journalier, hebdomadaire ou mensuel</li>
              </ul>
              <Link to="/services/location-bureau">
                <Button className="bg-lysco-pink hover:bg-lysco-pink/90 text-white">
                  Réserver un bureau
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-lysco-turquoise">Salles de réunion</h2>
              <p className="text-gray-600 mb-4">
                Organisez vos réunions, formations ou événements dans nos salles parfaitement équipées. 
                Disponibles à l'heure ou à la journée, nos salles de réunion sont conçues pour répondre 
                à tous vos besoins professionnels.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Capacité de 2 à 20 personnes</li>
                <li>Équipement audiovisuel moderne</li>
                <li>Tableaux blancs et paperboards</li>
                <li>Service de restauration sur demande</li>
                <li>Assistance technique disponible</li>
              </ul>
              <Link to="/services/formation-room ">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Réserver une salle
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <img src="https://lys-and-co.com/wp-content/uploads/2024/02/ad1bff_701844a302db4d7babbfbd3ff9bdbabemv2.webp" alt="Salle de réunion" className="w-full h-full object-cover rounded-lg" />
              {/* <p className="text-gray-500">Image des salles de réunion</p> */}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-6">Vous cherchez une solution adaptée à vos besoins ?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white px-8">
                  Nous contacter
                </Button>
              </Link>
              <Link to="/tarifs">
                <Button variant="outline" className="border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white px-8">
                  Voir nos tarifs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EspacesTravail;
