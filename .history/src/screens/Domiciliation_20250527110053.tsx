import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DomiciliationServices from "@/components/domiciliation/DomiciliationServices";
import DomiciliationPricing from "@/components/domiciliation/DomiciliationPricing";
import DomiciliationOffers from "@/components/domiciliation/DomiciliationOffers";
import ComplementaryServices from "@/components/domiciliation/ComplementaryServices";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChevronRight,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  PiggyBank,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Domiciliation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Background */}
        <div className="bg-gradient-to-r from-lysco-turquoise/20 to-lysco-pink/20 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Domiciliation d'entreprise à Deuil-la-Barre
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Domiciliez votre entreprise à Deuil-la-Barre et bénéficiez de nombreux
                services pour faciliter votre gestion administrative.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-t-4 border-lysco-turquoise">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lysco-turquoise/10 mb-4 mx-auto">
                    <MapPin className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <h3 className="font-bold text-center mb-2">
                    Adresse professionnelle
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    Une adresse commerciale valorisante pour votre entreprise
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-t-4 border-lysco-pink">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lysco-pink/10 mb-4 mx-auto">
                    <Clock className="h-6 w-6 text-lysco-pink" />
                  </div>
                  <h3 className="font-bold text-center mb-2">
                    Installation rapide
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    Votre domiciliation mise en place en 24h
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-t-4 border-lysco-turquoise">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lysco-turquoise/10 mb-4 mx-auto">
                    <ShieldCheck className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <h3 className="font-bold text-center mb-2">
                    Conformité légale
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    Service agréé avec le numéro 04_95_2023
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="/domiciliation">
                  Domiciliation
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}

          <section className="mb-16">
            <div className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 rounded-lg p-8 text-center mb-12">
              <h2 className="text-2xl font-semibold mb-6">
                Nos formules d'abonnement mensuel
              </h2>
              <p className="mb-8 text-gray-600">
                Choisissez la formule qui correspond le mieux à votre statut et
                à vos besoins
              </p>

              <DomiciliationPricing />
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-8 text-center mb-12">
              <DomiciliationOffers />
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-lysco-turquoise" />
                    Pourquoi se domicilier chez Lys&Co ?
                  </CardTitle>
                  <CardDescription>
                    Une solution flexible et sans engagement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Vous n'avez pas encore de locaux pour votre entreprise et
                    vous ne souhaitez pas divulguer votre adresse personnelle ?
                    Domiciliez-vous chez Lys&Co en donnant à votre entreprise
                    une adresse sûre et une boîte aux lettres ouverte du lundi
                    au vendredi !
                  </p>
                  <ul className="grid gap-2">
                    {[
                      "Offre flexible et sans engagement",
                      "Mise en place rapide et sans tracas",
                      "Paiement sécurisé en ligne",
                      "Pas de dépôt de garantie ni frais de dossier",
                      "-5% sur l'abonnement annuel pour tout paiement anticipé de 12 mois",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-green-800 font-medium flex items-center">
                      <PiggyBank className="h-5 w-5 mr-2" />
                      -50% sur vos 3 premiers mois pour tout engagement de 6
                      mois !
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pack Exclusif Card with modern styling */}
              <Card className="relative bg-gradient-to-br from-white to-lysco-turquoise/5 border border-lysco-turquoise/20 shadow-sm overflow-hidden">
                {/* Ruban EXCLUSIF en haut à droite */}
                <div className="absolute top-4 right-[-10px] z-10">
                  <div className="bg-lysco-pink text-white text-xs font-bold px-3 py-1 transform rotate-45">
                    EXCLUSIF
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Pack domicilié à 1514,00€</CardTitle>
                  <CardDescription>
                    Pack Exclusif pour Nouveaux Domiciliés : Boostez votre
                    entreprise !
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-lysco-turquoise bg-lysco-turquoise/10 p-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <span>
                        Site Internet sur Mesure : Conception professionnelle
                        incluse (hébergement à part)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lysco-turquoise bg-lysco-turquoise/10 p-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <span>
                        100 Cartes de Visite Professionnelles personnalisées
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lysco-turquoise bg-lysco-turquoise/10 p-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <span>
                        Création et optimisation de pages Instagram et LinkedIn
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lysco-turquoise bg-lysco-turquoise/10 p-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <span>
                        3 Mois de Domiciliation Gratuite (engagement 6 mois)
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/domiciliation/pack-domicilie">
                      <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90 flex items-center justify-center">
                        Je profite de l'offre{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-lysco-pink/10 to-lysco-turquoise/10 rounded-lg p-8 text-center mb-12">
              <ComplementaryServices />
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-6">
                Vous avez des questions ?
              </h2>
              <div className="flex justify-center flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                    Contactez-nous
                  </Button>
                </Link>
                <Link to="/services-complementaires">
                  <Button
                    variant="outline"
                    className="border-lysco-pink text-lysco-pink hover:bg-lysco-pink/10"
                  >
                    En savoir plus sur nos services
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Location de bureaux Section with improved styling */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Nos espaces de travail à Deuil-la-Barre
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Espace Coworking</CardTitle>
                  <CardDescription>
                    Espace de travail partagé, idéal pour les freelances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Capacité</span>
                    <p className="font-semibold">8 personnes</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Tarif</span>
                    <p className="text-2xl font-bold text-lysco-turquoise">
                      5€
                      <span className="text-base font-normal text-gray-600">
                        /heure
                      </span>
                    </p>
                  </div>
                  <Link to="/services/coworking-space">
                    <Button variant="outline" className="w-full mt-2">
                      Plus d'infos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Salle de Formation</CardTitle>
                  <CardDescription>
                    Salle équipée pour formations et réunions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Capacité</span>
                    <p className="font-semibold">10 personnes</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Tarifs</span>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>À l'heure</span>
                        <span className="font-medium">10€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Demi-journée</span>
                        <span className="font-medium">25€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Journée</span>
                        <span className="font-medium">45€</span>
                      </li>
                    </ul>
                  </div>
                  <Link to="/services/formation-room">
                    <Button variant="outline" className="w-full mt-2">
                      Plus d'infos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Bureau Privé</CardTitle>
                  <CardDescription>
                    Bureau fermé pour 2 personnes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Capacité</span>
                    <p className="font-semibold">2 personnes</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">
                      Tarifs mensuels
                    </span>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>Demi-journée</span>
                        <span className="font-medium">125€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Journée complète</span>
                        <span className="font-medium">250€</span>
                      </li>
                    </ul>
                  </div>
                  <Link to="/services/location-bureau">
                    <Button variant="outline" className="w-full mt-2">
                      Plus d'infos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Link to="/espaces-travail">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                  Découvrir tous nos espaces
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Domiciliation;
