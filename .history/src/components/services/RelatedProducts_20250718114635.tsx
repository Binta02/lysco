// export default RelatedProducts;
import React from "react";

// Tableau local des produits
const PRODUCTS = [
  // Catégorie courrier
  {
    id: "reexpedition-courrier",
    title: "Réexpédition courrier (3 mois)",
    price: 30,
    category: "courrier",
    link: "/services/reexpedition-courrier",
  },
  {
    id: "scan-courrier",
    title: "Scan de courrier (3 mois)",
    price: 18,
    category: "courrier",
    link: "/services/scan-courrier",
  },
  {
    id: "reception-colis",
    title: "Réception colis (3 mois)",
    price: 18,
    category: "courrier",
    link: "/services/reception-colis",
  },

  // Catégorie domiciliation
  {
    id: "domiciliation-1an-entreprise",
    title: "Domiciliation 1 an – Entreprise",
    price: 361.8,
    category: "domiciliation",
    link: "/domiciliation/1an-entreprise",
  },
  {
    id: "domiciliation-3mois-entreprise",
    title: "Domiciliation 3 mois – Entreprise",
    price: 108,
    category: "domiciliation",
    link: "/domiciliation/3mois-entreprise",
  },
  {
    id: "domiciliation-3mois-micro",
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: 72,
    category: "domiciliation",
    link: "/domiciliation/3mois-micro-entreprise",
  },
  {
    id: "domiciliation-6mois-entreprise",
    title: "Domiciliation 6 mois – Entreprise",
    price: 162,
    category: "domiciliation",
    link: "/domiciliation/6mois-entreprise",
  },
  {
    id: "domiciliation-6mois-micro",
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: 108,
    category: "domiciliation",
    link: "/domiciliation/6mois-micro-entreprise",
  },
  {
    id: "pack-domicilie",
    title: "Pack domicilié",
    price: 1514,
    category: "domiciliation",
    link: "/domiciliation/pack-domicilie",
  },

  // Catégorie admin
  {
    id: "company-creation",
    title: "Accompagnement ouverture de votre société",
    price: 600,
    category: "admin",
    link: "/services/company-creation",
  },
  {
    id: "micro-company",
    title: "Accompagnement ouverture micro entreprise",
    price: 150,
    category: "admin",
    link: "/services/micro-company",
  },
  {
    id: "company-transfer",
    title: "Accompagnement transfert de société",
    price: 600,
    category: "admin",
    link: "/services/company-transfer",
  },
  {
    id: "share-transfer",
    title: "Cession de parts",
    price: 200,
    category: "admin",
    link: "/services/share-transfer",
  },
  {
    id: "commercial-ad",
    title: "Création annonce commerciale pour site d'annonces",
    price: 15,
    category: "admin",
    link: "/services/commercial-ad",
  },
  {
    id: "quote-creation",
    title: "Création devis ou service",
    price: 15,
    category: "admin",
    link: "/services/quote-creation",
  },
  {
    id: "annual-accounts",
    title: "Dépôt des comptes annuels",
    price: 300,
    category: "admin",
    link: "/services/annual-accounts",
  },
  {
    id: "company-modification",
    title: "Modification société",
    price: 900,
    category: "admin",
    link: "/services/company-modification",
  },
  {
    id: "bank-account",
    title: "Modification société",
    price: 150,
    category: "admin",
    link: "/services/bank-account",
  },
  {
    id: "vtc-creation",
    title: "Accompagnement création VTC – Driel",
    price: 900,
    category: "admin",
    link: "/services/vtc-creation",
  },
];
// ...existing code...
function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const RelatedProducts = ({ currentId, currentCategory }) => {
  const related = PRODUCTS.filter(
    (p) => p.category === currentCategory && p.id !== currentId
  );
  // Mélange les produits similaires avant de limiter à 3
  const relatedLimited = shuffle(related).slice(0, 3);

  if (relatedLimited.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedLimited.map((prod) => (
          <Card key={prod.id}>
            <CardHeader>
              <CardTitle>{prod.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-semibold text-lysco-turquoise">
                {prod.price.toFixed(2)} €
              </p>
              <Link to={prod.link}>
                <Button className="w-full">Voir le produit</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
// ...existing code...

export default RelatedProducts;
