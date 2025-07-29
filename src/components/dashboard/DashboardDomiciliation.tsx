
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useUserData } from '@/hooks/useUserData';
import DomiciliationEditForm from './DomiciliationEditForm';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, CheckCircle } from 'lucide-react';

const DashboardDomiciliation = () => {
  const { domiciliation, userServices, loading, updateDomiciliation } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  
  // Filtrer uniquement les services liés à la domiciliation
  const domiciliationServices = userServices.filter(service => service.category === 'domiciliation');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <DomiciliationEditForm 
        domiciliation={domiciliation} 
        onUpdate={updateDomiciliation} 
        onCancel={() => setIsEditing(false)} 
      />
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
    } else if (status === 'option') {
      return <Badge className="bg-amber-500">En option</Badge>;
    } else if (status === 'pending') {
      return <Badge className="bg-blue-500">En attente</Badge>;
    } else {
      return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations de domiciliation</CardTitle>
          <CardDescription>Détails de votre adresse commerciale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm">Adresse de domiciliation</h4>
                <p className="text-gray-600">{domiciliation?.address || 'Non définie'}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Statut du contrat</h4>
                <p className={domiciliation?.status === 'active' ? 'text-green-600' : 'text-amber-600'}>
                  {domiciliation?.status === 'active' ? 'Actif' : domiciliation?.status === 'pending' ? 'En attente' : 'Inactif'}
                </p>
                {domiciliation?.renewal_date && (
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Renouvellement: {formatDate(domiciliation.renewal_date)}</span>
                  </div>
                )}
                {domiciliation?.plan_type && (
                  <p className="text-sm text-gray-600 mt-1">
                    Type de plan: {domiciliation.plan_type}
                  </p>
                )}
                {domiciliation?.duration && (
                  <p className="text-sm text-gray-600">
                    Durée: {domiciliation.duration}
                  </p>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(true)}>Modifier les informations</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services inclus</CardTitle>
        </CardHeader>
        <CardContent>
          {domiciliationServices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Statut</TableHead>
                  {domiciliationServices.some(service => service.price) && <TableHead>Prix</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {domiciliationServices.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    {domiciliationServices.some(service => service.price) && (
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
              <p className="text-gray-500">Aucun service de domiciliation trouvé</p>
              <p className="text-sm text-gray-400 mt-1">Rendez-vous sur la page "Domiciliation" pour vous abonner</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="/domiciliation">Voir les offres</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardDomiciliation;
