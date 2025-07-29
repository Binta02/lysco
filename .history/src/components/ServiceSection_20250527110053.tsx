
import React from 'react';
import ServiceCard from './ServiceCard';
import { Home, FileText, MessageCircle } from 'lucide-react';

const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lys&Co propose une gamme complète de services pour vous accompagner dans le développement de votre entreprise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Domiciliation commerciale"
            description="Domiciliez votre entreprise à une adresse professionnelle et bénéficiez d'une gestion complète de votre courrier."
            icon={<Home />}
            link="/domiciliation"
            color="turquoise"
          />
          
          <ServiceCard
            title="Services administratifs"
            description="Confiez-nous vos tâches administratives pour vous concentrer sur le développement de votre activité."
            icon={<FileText />}
            link="/services-admin"
            color="pink"
          />
          
          <ServiceCard
            title="Communication & Marketing"
            description="Stratégies de communication, création de contenu et gestion des réseaux sociaux pour augmenter votre visibilité."
            icon={<MessageCircle />}
            link="/communication"
            color="turquoise"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
