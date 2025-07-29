
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
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

const ServicesComplementaires = () => {
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
                <BreadcrumbLink to="/services-complementaires">Nos Services Complémentaires</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nos Services Complémentaires</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Découvrez notre gamme complète de services complémentaires pour vous accompagner 
            dans le développement de votre entreprise. Des solutions sur mesure pour répondre à tous vos besoins.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-t-4 border-t-lysco-turquoise">
              <CardHeader>
                <CardTitle>Permanence téléphonique</CardTitle>
                <CardDescription>Une réponse professionnelle à tous vos appels</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Réponse personnalisée au nom de votre entreprise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Transfert d'appels selon vos consignes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Prise de messages et transmission par email</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Service disponible aux heures ouvrables</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 mb-4">À partir de 120€/mois</p>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                    En savoir plus
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-t-4 border-t-lysco-pink">
              <CardHeader>
                <CardTitle>Gestion du courrier</CardTitle>
                <CardDescription>Traitement professionnel de votre courrier</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Réception et tri du courrier</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Numérisation et envoi par email</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Transfert postal hebdomadaire</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Archivage sécurisé sur demande</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 mb-4">À partir de 80€/mois</p>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-lysco-pink hover:bg-lysco-pink/90">
                    En savoir plus
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-t-4 border-t-lysco-turquoise">
              <CardHeader>
                <CardTitle>Service de traduction</CardTitle>
                <CardDescription>Traductions professionnelles multilingues</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Traduction de documents commerciaux</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Contrats et documents juridiques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Supports marketing multilingues</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Traducteurs spécialisés par secteur</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 mb-4">Sur devis selon volume</p>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                    Demander un devis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-t-4 border-t-lysco-pink">
              <CardHeader>
                <CardTitle>Organisation d'événements</CardTitle>
                <CardDescription>Des événements professionnels clé en main</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Séminaires et conférences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Lancements de produits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Team buildings et journées d'entreprise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Gestion complète de A à Z</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 mb-4">Sur devis personnalisé</p>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-lysco-pink hover:bg-lysco-pink/90">
                    Demander un devis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-t-4 border-t-lysco-turquoise">
              <CardHeader>
                <CardTitle>Conseil en développement</CardTitle>
                <CardDescription>Expertise pour accélérer votre croissance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Audit et stratégie d'entreprise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Accompagnement commercial</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Recherche de financement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise mr-2 flex-shrink-0" />
                    <span>Développement international</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 mb-4">À partir de 400€/session</p>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                    En savoir plus
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-t-4 border-t-lysco-pink">
              <CardHeader>
                <CardTitle>Formations professionnelles</CardTitle>
                <CardDescription>Développez les compétences de votre équipe</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Communication et marketing digital</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Gestion de projet et productivité</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Compétences managériales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-lysco-pink mr-2 flex-shrink-0" />
                    <span>Formations certifiantes sur mesure</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 mb-4">À partir de 650€/jour</p>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-lysco-pink hover:bg-lysco-pink/90">
                    Programme des formations
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">Packages sur mesure</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-6">
              Nous proposons des packages combinant plusieurs services complémentaires pour répondre 
              parfaitement à vos besoins tout en vous offrant un tarif avantageux. Contactez-nous pour 
              créer votre package personnalisé.
            </p>
            <div className="flex justify-center">
              <Link to="/demande-devis">
                <Button className="bg-gradient-to-r from-lysco-turquoise to-lysco-pink text-white hover:from-lysco-turquoise/90 hover:to-lysco-pink/90">
                  Demander votre package sur mesure
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Vous avez besoin d'un service spécifique ?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour discuter de vos besoins particuliers 
              et vous proposer des solutions adaptées à votre activité.
            </p>
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

export default ServicesComplementaires;
