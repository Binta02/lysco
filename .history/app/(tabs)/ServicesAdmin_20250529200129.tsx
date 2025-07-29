import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminServiceOffers from "@/components/admin/AdminServiceOffers";
import { Button } from "@/components/ui/button";
import { FileText, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PriceCard from "@/components/services/PriceCard";

const ServicesAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Formalités Entreprises */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <FileText className="w-16 h-16 text-lysco-turquoise" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                FORMALITÉS ENTREPRISES – ADMINISTRATIF
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vous êtes en création d'entreprise, en changement de siège
                social ou face à des modifications importantes ? Notre
                expert-comptable partenaire vous accompagne à chaque étape,
                offrant une assistance personnalisée et des conseils experts
                pour des démarches administratives en toute sérénité.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white"
                  >
                    Contactez-nous
                  </Button>
                </Link>
                <a href="#admin-services-offers">
                  <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                    Voir nos services
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Service Offers */}
        <section id="admin-services-offers">
          <AdminServiceOffers />
        </section>

        <p className="max-w-3xl mx-auto mt-8 mb-12 text-lg text-gray-700 text-center leading-relaxed">
          <strong>FORMALITÉS ENTREPRISES – ADMINISTRATIF</strong>
          <br />
          <br />
          Si vous êtes en pleine <strong>création d’entreprise</strong>,
          envisagez de <strong>changer votre siège social</strong>
          ou devez gérer d’autres <strong>modifications importantes</strong>,
          mais que le <strong>temps</strong> ou les
          <strong>connaissances</strong> vous manquent pour aborder les{" "}
          <strong>démarches administratives</strong>, sachez que vous n’êtes pas
          seul. Notre partenaire, un
          <strong>expert-comptable qualifié</strong>, est prêt à vous épauler à
          chaque étape du processus. Il vous offrira une{" "}
          <strong>assistance personnalisée</strong>
          et des <strong>conseils avisés</strong> pour naviguer aisément à
          travers ces formalités, assurant ainsi une
          <strong>transition en douceur</strong> et conforme aux
          <strong>exigences légales</strong>. N’attendez plus pour
          <strong>demander de l’aide</strong> !
        </p>
        {/* Tarifs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Nos Tarifs de Formalités
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des solutions administratives transparentes et adaptées à chaque
                besoin professionnel.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PriceCard service="Inscription Auto Entreprise" price="150 €" />
              <PriceCard
                service="Inscription Entreprise Individuelle"
                price="150 €"
              />
              <PriceCard
                service="Rédaction Formalités de Création"
                price="600 €"
                note="*hors coûts organismes"
              />
              <PriceCard
                service="VTC – Driel (Registre Transports)"
                price="900 €"
                note="*hors coûts organismes"
              />
              <PriceCard
                service="Modification Société"
                price="900 €"
                note="*hors coûts organismes"
              />
              <PriceCard
                service="Dépôt Comptes Annuels"
                price="300 €"
                note="*hors coûts organismes"
              />
              <PriceCard service="Cession de Part" price="200 €" />
              <PriceCard
                service="Accompagnement Compte en Ligne"
                price="150 €"
                note="hors frais"
              />
            </div>
          </div>
        </section>
        {/* Assistanat Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex justify-center mb-6">
                  <ClipboardCheck className="w-16 h-16 text-lysco-pink" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  ASSISTANAT
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Imaginez <strong>déléguer</strong> toute la{" "}
                  <strong>gestion administrative</strong>,
                  <strong>comptable</strong> et <strong>commerciale</strong> à
                  des <strong>assistants experts</strong>, vous permettant ainsi
                  de vous recentrer sur l’
                  <strong>essentiel</strong>
                  de votre activité. Nos partenaires{" "}
                  <strong>secrétaires</strong> prennent en charge toutes vos{" "}
                  <strong>obligations</strong>, de la{" "}
                  <strong>paperasserie quotidienne</strong> à la{" "}
                  <strong>comptabilité</strong>, en passant par le{" "}
                  <strong>suivi commercial</strong>. Ce service vous offre la{" "}
                  <strong>liberté</strong> de vous consacrer pleinement à ce que
                  vous faites de mieux, tout en ayant la{" "}
                  <strong>tranquillité d’esprit</strong> que les aspects les
                  plus <strong>fastidieux</strong> de votre entreprise sont{" "}
                  <strong>gérés efficacement</strong> et{" "}
                  <strong>professionnellement</strong>.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 gap-4">
                  <PriceCard
                    service="Assistance Administrative"
                    price="30 € /heure"
                  />
                  <PriceCard service="Création de Devis" price="15 € /page" />
                  <PriceCard
                    service="Création de Factures"
                    price="15 € /page"
                  />
                  <PriceCard
                    service="Annonces Commerciales"
                    price="10 € /annonce"
                    note="destinées aux sites d'annonces"
                  />
                  <PriceCard
                    service="Courriers Administratifs"
                    price="Sur devis"
                    note="selon les spécificités"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Votre Partenaire Administratif
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Chez Lys&Co, nous offrons des solutions sur mesure qui répondent
                précisément à vos exigences professionnelles. Notre équipe est
                dédiée à la qualité et à l'efficacité, garantissant que chaque
                service soit parfaitement adapté à vos objectifs.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/contact">
                  <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                    Discuter de votre projet
                  </Button>
                </Link>
                <Link to="/tarifs">
                  <Button
                    variant="outline"
                    className="border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white"
                  >
                    Nos tarifs détaillés
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesAdmin;
