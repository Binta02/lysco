
import React from 'react';
import { useUserData } from '@/hooks/useUserData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DashboardAdmin = () => {
  const { userServices, adminServices, loading } = useUserData();
  
  // Filtrer uniquement les services administratifs
  const adminServicesList = userServices.filter(service => service.category === 'admin');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: fr });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Actif</Badge>;
    } else if (status === 'pending') {
      return <Badge className="bg-amber-500">En attente</Badge>;
    } else if (status === 'completed') {
      return <Badge className="bg-blue-500">Terminé</Badge>;
    } else {
      return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Services administratifs</CardTitle>
          <CardDescription>
            Gérez tous vos services administratifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {adminServicesList.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Statut</TableHead>
                  {adminServicesList.some(service => service.price) && <TableHead>Prix</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminServicesList.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    {adminServicesList.some(service => service.price) && (
                      <TableCell>
                        {service.price ? `${service.price}€` : '-'}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">Aucun service administratif trouvé</p>
              <p className="text-sm text-gray-400 mt-1">Rendez-vous sur la page "Services administratifs" pour vous abonner</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="/services-admin">Voir les offres</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prochains traitements</CardTitle>
          <CardDescription>
            Calendrier des prochaines tâches administratives
          </CardDescription>
        </CardHeader>
        <CardContent>
          {adminServices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminServices.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>{service.service}</TableCell>
                    <TableCell className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-lysco-turquoise" />
                      {formatDate(service.next_processing)}
                    </TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun traitement planifié</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents administratifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-lysco-turquoise/10 p-4 rounded-lg">
              <h4 className="font-medium flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-lysco-turquoise" />
                Envoi automatisé des documents
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                Les documents administratifs vous sont automatiquement envoyés par email dès leur validation.
              </p>
            </div>

            <Button variant="outline" onClick={() => alert('Fonctionnalité en développement')}>
              Voir tous mes documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAdmin;
