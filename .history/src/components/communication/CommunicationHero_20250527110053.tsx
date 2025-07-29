
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationHero = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">NOS PRESTATIONS DE COMMUNICATION</h1>
          <div className="space-y-4 mb-8 text-gray-600">
            <p>
              Experts en communication pour TPE/PME, nous vous accompagnons dans tous les aspects de votre communication (digitale, print, orale, image de marque) à des tarifs accessibles.
            </p>
            <p>
              Notre équipe (rédacteurs, graphistes, webmasters, vidéastes…) analyse vos besoins et pilote votre projet de A à Z.
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/contact">
              <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                Prenez RDV !
              </Button>
            </Link>
            <Link to="/communication/packs">
              <Button variant="outline" className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise/10">
                Nos packs de communication
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunicationHero;
