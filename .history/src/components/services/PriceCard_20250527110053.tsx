
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceCardProps {
  service: string;
  price: string;
  note?: string;
}

const PriceCard = ({ service, price, note }: PriceCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-900">{service}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-lysco-turquoise">{price}</p>
        {note && <p className="text-sm text-gray-500 mt-2">{note}</p>}
      </CardContent>
    </Card>
  );
};

export default PriceCard;
