
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, FileText, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const DomiciliationServices = () => {
  return (
    <div className="space-y-12">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-lysco-turquoise" />
            </div>
            <CardTitle>REEX</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Service de réexpédition hebdomadaire de votre courrier, envois chaque mardi.
            </CardDescription>
            <p className="text-2xl font-bold mb-4">10€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600 mb-4">Hors frais de timbres</p>
            <Link to="/service/reexpedition-courrier">
              <Button variant="outline" className="w-full flex items-center justify-center">
                En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-lysco-pink" />
            </div>
            <CardTitle>Scan de courrier</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Numérisation de vos courriers dès réception pour un accès immédiat à vos documents.
            </CardDescription>
            <p className="text-2xl font-bold mb-4">5€<span className="text-base font-normal">/mois</span></p>
            <Link to="/service/scan-courrier">
              <Button variant="outline" className="w-full flex items-center justify-center">
                En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-lysco-turquoise" />
            </div>
            <CardTitle>Service Colis</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Service de garde de colis en toute sécurité pour les professionnels et particuliers.
            </CardDescription>
            <p className="text-2xl font-bold mb-4">6€<span className="text-base font-normal">/mois</span></p>
            <Link to="/service/reception-colis">
              <Button variant="outline" className="w-full flex items-center justify-center">
                En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-lysco-pink" />
            </div>
            <CardTitle>Location de bureau</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Espace de coworking (8 pers.) et salle de formation disponibles.
            </CardDescription>
            <p className="text-sm text-gray-600">À partir de</p>
            <p className="text-2xl font-bold mb-4">5€<span className="text-base font-normal">/heure</span></p>
            <Link to="/service/location-bureau">
              <Button variant="outline" className="w-full flex items-center justify-center">
                En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DomiciliationServices;
