
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/hooks/useUserData';

const DashboardMarketing = () => {
  const [lastPublication, setLastPublication] = useState<string | null>(null);
  const [siteUpdate, setSiteUpdate] = useState<string | null>(null);
  const [nextNewsletter, setNextNewsletter] = useState<string | null>(null);
  const [socialFollowers, setSocialFollowers] = useState<number | null>(null);
  const [siteVisits, setSiteVisits] = useState<number | null>(null);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<number | null>(null);

  // Permettre à l'utilisateur de définir ses propres valeurs
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string | null>>, value: string) => {
    setter(value);
  };

  const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<number | null>>, value: string) => {
    const numericValue = value === '' ? null : parseInt(value);
    setter(numericValue);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Réseaux sociaux</CardTitle>
          <CardDescription>Gérez votre présence sur les réseaux sociaux</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="lastPublication" className="font-medium text-sm sm:w-48">
                Dernière publication:
              </label>
              <input 
                id="lastPublication"
                type="date"
                className="border rounded px-2 py-1 flex-1"
                value={lastPublication || ''}
                onChange={(e) => handleInputChange(setLastPublication, e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="socialFollowers" className="font-medium text-sm sm:w-48">
                Nombre d'abonnés:
              </label>
              <input
                id="socialFollowers"
                type="number"
                className="border rounded px-2 py-1 flex-1"
                value={socialFollowers === null ? '' : socialFollowers}
                onChange={(e) => handleNumericInputChange(setSocialFollowers, e.target.value)}
              />
            </div>
            <Button variant="outline">Gérer les publications</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Site web</CardTitle>
          <CardDescription>Gérez votre site web</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="siteUpdate" className="font-medium text-sm sm:w-48">
                Dernière mise à jour:
              </label>
              <input
                id="siteUpdate"
                type="date"
                className="border rounded px-2 py-1 flex-1"
                value={siteUpdate || ''}
                onChange={(e) => handleInputChange(setSiteUpdate, e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="siteVisits" className="font-medium text-sm sm:w-48">
                Visites mensuelles:
              </label>
              <input
                id="siteVisits"
                type="number"
                className="border rounded px-2 py-1 flex-1"
                value={siteVisits === null ? '' : siteVisits}
                onChange={(e) => handleNumericInputChange(setSiteVisits, e.target.value)}
              />
            </div>
            <Button variant="outline">Modifier le site</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
          <CardDescription>Gérez vos campagnes d'emailing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="nextNewsletter" className="font-medium text-sm sm:w-48">
                Prochaine newsletter:
              </label>
              <input
                id="nextNewsletter"
                type="date"
                className="border rounded px-2 py-1 flex-1"
                value={nextNewsletter || ''}
                onChange={(e) => handleInputChange(setNextNewsletter, e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="newsletterSubscribers" className="font-medium text-sm sm:w-48">
                Abonnés:
              </label>
              <input
                id="newsletterSubscribers"
                type="number"
                className="border rounded px-2 py-1 flex-1"
                value={newsletterSubscribers === null ? '' : newsletterSubscribers}
                onChange={(e) => handleNumericInputChange(setNewsletterSubscribers, e.target.value)}
              />
            </div>
            <Button variant="outline">Gérer la newsletter</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques de communication</CardTitle>
          <CardDescription>Aperçu de vos performances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-lysco-turquoise/10 p-4 rounded-lg text-center">
              <h4 className="font-medium">Réseaux sociaux</h4>
              <p className="text-2xl font-bold mt-2">{socialFollowers || '0'}</p>
              <p className="text-sm text-gray-600">Abonnés</p>
            </div>
            
            <div className="bg-lysco-pink/10 p-4 rounded-lg text-center">
              <h4 className="font-medium">Site web</h4>
              <p className="text-2xl font-bold mt-2">{siteVisits || '0'}</p>
              <p className="text-sm text-gray-600">Visites/mois</p>
            </div>
            
            <div className="bg-lysco-turquoise/10 p-4 rounded-lg text-center">
              <h4 className="font-medium">Newsletter</h4>
              <p className="text-2xl font-bold mt-2">{newsletterSubscribers || '0'}</p>
              <p className="text-sm text-gray-600">Abonnés</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMarketing;
