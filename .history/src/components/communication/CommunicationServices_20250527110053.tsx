import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Stratégie",
    description: "Audit et accompagnement stratégique pour optimiser votre communication.",
    link: "/communication/strategie",
  },
  {
    title: "Community Management",
    description: "Gestion et animation de vos réseaux sociaux.",
    link: "/communication/community-management",
  },
  {
    title: "Créations",
    description: "Supports visuels sur mesure pour votre image.",
    link: "/communication/creations",
  },
  {
    title: "Communication Print",
    description: "Cartes de visites, flyers, brochures, etc.",
    link: "/communication/print",
  },
  {
    title: "Site Internet",
    description: "Conception et refonte de votre site web.",
    link: "/communication/site-internet",
  },
  {
    title: "Photos",
    description: "Shooting professionnel produit ou personnel.",
    link: "/communication/photos",
  },
  {
    title: "Media Training",
    description: "Formations à la prise de parole en public.",
    link: "/communication/media-training",
  },
  {
    title: "Packs de Communication",
    description: "Formules complètes pour démarrer ou booster.",
    link: "/communication/packs",
  },
];


const CommunicationServices = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nos Prestations de Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href={service.link}>
                <Button variant="ghost" className="text-lysco-turquoise hover:text-lysco-turquoise/90">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunicationServices;
