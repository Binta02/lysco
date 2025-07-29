
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Tarifs = () => {
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
                <BreadcrumbLink to="/tarifs">Nos Tarifs</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nos Tarifs</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Découvrez nos différentes offres tarifaires adaptées à vos besoins. Que vous soyez une entreprise en 
            développement ou un entrepreneur indépendant, nous avons la solution qui vous convient.
          </p>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-lysco-turquoise">Domiciliation d'entreprise</h2>
            <Table>
              <TableCaption>Tarifs applicables à partir du 1er janvier 2025</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Service</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Micro-Entreprise</TableHead>
                  <TableHead>Entreprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Domiciliation d'entreprise</TableCell>
                  <TableCell>3 mois</TableCell>
                  <TableCell>90 €</TableCell>
                  <TableCell>120 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Domiciliation d'entreprise</TableCell>
                  <TableCell>6 mois</TableCell>
                  <TableCell>160 €</TableCell>
                  <TableCell>220 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Domiciliation d'entreprise</TableCell>
                  <TableCell>1 an</TableCell>
                  <TableCell>290 €</TableCell>
                  <TableCell>390 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pack domicilié</TableCell>
                  <TableCell>1 an</TableCell>
                  <TableCell>450 €</TableCell>
                  <TableCell>550 €</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Link to="/domiciliation">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Voir les détails des offres de domiciliation
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-lysco-pink">Services administratifs</h2>
            <Table>
              <TableCaption>Tarifs indicatifs - sur devis pour projets spécifiques</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Service</TableHead>
                  <TableHead>Unité</TableHead>
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Inscription Auto Entreprise</TableCell>
                  <TableCell>Forfait</TableCell>
                  <TableCell>150 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Inscription Entreprise Individuelle</TableCell>
                  <TableCell>Forfait</TableCell>
                  <TableCell>150 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rédaction Formalités de Création</TableCell>
                  <TableCell>Forfait</TableCell>
                  <TableCell>600 € *</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Modification Société</TableCell>
                  <TableCell>Forfait</TableCell>
                  <TableCell>900 € *</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Assistance Administrative</TableCell>
                  <TableCell>Heure</TableCell>
                  <TableCell>30 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Création de Devis/Factures</TableCell>
                  <TableCell>Page</TableCell>
                  <TableCell>15 €</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="mt-2 text-sm text-gray-500">* Hors coûts organismes</p>
            <div className="mt-4 text-center">
              <Link to="/services-admin">
                <Button className="bg-lysco-pink hover:bg-lysco-pink/90 text-white">
                  Voir les détails des services administratifs
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-lysco-turquoise">Services de communication</h2>
            <Table>
              <TableCaption>Tarifs de base - devis personnalisés disponibles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Service</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>À partir de</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Site Internet</TableCell>
                  <TableCell>Site vitrine responsive 5 pages</TableCell>
                  <TableCell>990 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Community Management</TableCell>
                  <TableCell>Gestion mensuelle 2 réseaux</TableCell>
                  <TableCell>350 €/mois</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Création logo</TableCell>
                  <TableCell>3 propositions + fichiers sources</TableCell>
                  <TableCell>290 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pack photos</TableCell>
                  <TableCell>Séance 2h + 15 photos retouchées</TableCell>
                  <TableCell>350 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Stratégie de communication</TableCell>
                  <TableCell>Audit et plan d'action</TableCell>
                  <TableCell>590 €</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Link to="/communication">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Voir les détails des services de communication
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-lysco-pink">Espaces de travail</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Service</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/coworking-space" className="text-lysco-turquoise hover:underline">
                      Espace coworking
                    </Link>
                  </TableCell>
                  <TableCell>Journée</TableCell>
                  <TableCell>20 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/coworking-space" className="text-lysco-turquoise hover:underline">
                      Espace coworking
                    </Link>
                  </TableCell>
                  <TableCell>Semaine</TableCell>
                  <TableCell>80 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/coworking-space" className="text-lysco-turquoise hover:underline">
                      Espace coworking
                    </Link>
                  </TableCell>
                  <TableCell>Mois</TableCell>
                  <TableCell>250 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/location-bureau" className="text-lysco-turquoise hover:underline">
                      Bureau privé
                    </Link>
                  </TableCell>
                  <TableCell>Journée</TableCell>
                  <TableCell>40 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/location-bureau" className="text-lysco-turquoise hover:underline">
                      Bureau privé
                    </Link>
                  </TableCell>
                  <TableCell>Mois</TableCell>
                  <TableCell>500 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/formation-room" className="text-lysco-turquoise hover:underline">
                      Salle de réunion
                    </Link>
                  </TableCell>
                  <TableCell>Heure</TableCell>
                  <TableCell>30 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link to="/services/formation-room" className="text-lysco-turquoise hover:underline">
                      Salle de réunion
                    </Link>
                  </TableCell>
                  <TableCell>Journée</TableCell>
                  <TableCell>180 €</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Link to="/espaces-travail">
                <Button className="bg-lysco-pink hover:bg-lysco-pink/90 text-white">
                  Découvrir nos espaces de travail
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Besoin d'un devis personnalisé ?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nous proposons des solutions sur mesure adaptées à vos besoins spécifiques. 
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white px-8">
                  Nous contacter
                </Button>
              </Link>
              <Link to="/demande-devis">
                <Button variant="outline" className="border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white px-8">
                  Demander un devis
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

export default Tarifs;
