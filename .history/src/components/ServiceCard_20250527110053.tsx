
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color?: 'turquoise' | 'pink';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  color = 'turquoise',
}) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          color === 'turquoise' ? 'bg-lysco-turquoise/10 text-lysco-turquoise' : 'bg-lysco-pink/10 text-lysco-pink'
        }`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 mb-4">{description}</CardDescription>
        <Link to={link}>
          <Button
            variant="outline"
            className={`w-full ${
              color === 'turquoise'
                ? 'border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white'
                : 'border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white'
            }`}
          >
            En savoir plus
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
