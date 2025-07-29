import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceSection from '@/components/ServiceSection';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const Index: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Écouter les changements de session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Nettoyer l'abonnement
    return () => subscription.unsubscribe();
  }, []);

  const startLink = session ? "/dashboard" : "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-lysco-turquoise/90 to-lysco-pink/90 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Solutions de domiciliation, accompagnement et de communication pour votre entreprise
              </h1>
              <p className="text-lg sm:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Développez votre entreprise avec Lys&Co <br />
                Communication 360° – Accompagnement – Domiciliation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to={startLink}>
                  <Button className="w-full sm:w-auto bg-white text-lysco-pink hover:bg-opacity-90 py-6 px-8 text-lg">
                    {session ? "Accéder à mon espace" : "Créer un compte"}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full sm:w-auto border-white hover:bg-white/10 py-6 px-8 text-lg text-black">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Lys&Co ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nous offrons des solutions complètes adaptées aux besoins de votre entreprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg">
                <div className="w-16 h-16 bg-lysco-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-lysco-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplicité</h3>
                <p className="text-gray-600">
                  Des processus simplifiés pour vous permettre de vous concentrer sur votre activité.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg">
                <div className="w-16 h-16 bg-lysco-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-lysco-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rapidité</h3>
                <p className="text-gray-600">
                  Des solutions rapides et efficaces pour répondre à vos besoins immédiats.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg">
                <div className="w-16 h-16 bg-lysco-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-lysco-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
                <p className="text-gray-600">
                  Protection et confidentialité garanties pour vos données et documents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServiceSection />

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Prêt à développer votre entreprise ?</h2>
              <p className="text-lg opacity-90 mb-8">
                Rejoignez Lys&Co dès aujourd'hui et profitez de nos services adaptés à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={startLink}>
                  <Button className="w-full sm:w-auto bg-lysco-pink text-white hover:bg-opacity-90 py-6 px-8 text-lg">
                    {session ? "Accéder à mon espace" : "Créer un compte"}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full sm:w-auto border-white hover:bg-white/10 py-6 px-8 text-lg text-black">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
