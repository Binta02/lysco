import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  link: string;
}

interface RelatedProductsProps {
  currentId: string;
  currentCategory: string;
}

const PRODUCTS: Product[] = [
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

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentId,
  currentCategory,
}) => {
  const router = useRouter();

  const related = PRODUCTS.filter(
    (p) => p.category === currentCategory && p.id !== currentId
  );
  const relatedLimited = shuffle(related).slice(0, 3);

  if (relatedLimited.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produits similaires</Text>
      <View style={styles.productGrid}>
        {relatedLimited.map((prod) => (
          <View key={prod.id} style={styles.card}>
            <Text style={styles.cardTitle}>{prod.title}</Text>
            <Text style={styles.cardPrice}>{prod.price.toFixed(2)} €</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(prod.link as any)}
            >
              <Text style={styles.buttonText}>Voir le produit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#06b6d4",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#06b6d4",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RelatedProducts;
