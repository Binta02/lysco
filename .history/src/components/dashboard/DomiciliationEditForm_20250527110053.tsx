
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserDomiciliation } from '@/hooks/useUserData';
import { useState } from 'react';

interface DomiciliationEditFormProps {
  domiciliation: UserDomiciliation | null;
  onUpdate: (updatedDomiciliation: Partial<UserDomiciliation>) => Promise<boolean>;
  onCancel: () => void;
}

const DomiciliationEditForm = ({ domiciliation, onUpdate, onCancel }: DomiciliationEditFormProps) => {
  const [formData, setFormData] = useState({
    address: domiciliation?.address || '',
    renewal_date: domiciliation?.renewal_date ? 
      new Date(domiciliation.renewal_date).toISOString().split('T')[0] : 
      new Date().toISOString().split('T')[0],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await onUpdate(formData);
      if (success) {
        onCancel();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier les informations de domiciliation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="renewal_date" className="block text-sm font-medium text-gray-700">Date de renouvellement</label>
            <Input
              id="renewal_date"
              name="renewal_date"
              type="date"
              value={formData.renewal_date}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DomiciliationEditForm;
