import Footer from "@/src/components/Footer";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CommunicationPrint = () => {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
      }}
    >
      <Text style={styles.title}>Communication Print</Text>

      <Text style={styles.paragraph}>
        Faites de la communication print une alliée ! Porte-parole de votre
        image de marque et binôme de la communication web, elle vous permettra
        de vous démarquer de vos concurrents et d’attirer (ou de fidéliser)
        votre clientèle !
      </Text>

      <Text style={styles.paragraph}>
        Tous les canaux de distribution sont étudiés y compris une communication
        tangible. Pensez alors à distribuer des brochures, des goodies, des
        cartes de visite au cours d’événements, de rencontres, etc. N’avez-vous
        jamais croisé des hôtesses de street marketing ? Ces dernières, ne vous
        ont-elles pas donné un flyer d’une enseigne de produits de beauté ?
      </Text>

      <Text style={styles.paragraph}>
        Lys Conseil créera l’ensemble de vos supports print sous tout type de
        format : Cartes de visite, Plaquettes, Flyers, Catalogues, Affiches,
        Brochures, Kakémono, Roll-ups, etc.
      </Text>

      {services.map(({ title, description, price }, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.subSectionTitle}>{title}</Text>
          <Text style={styles.paragraph}>{description}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/contact" as any)}
      >
        <Text style={styles.buttonText}>Faire un devis</Text>
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
};

const services = [
  {
    title: "Logo",
    description:
      "Le logo est très important, car il est sur tous vos supports de communication. Il peut être simple ou plus élaboré en fonction du type d’entreprise. On vous propose de créer le logo qui vous correspond en fonction de votre personnalité et du type d’entreprise.",
    price: "À partir de 300€",
  },
  {
    title: "Brochures",
    description:
      "Besoin de présenter votre entreprise via une brochure, un livret, etc. Vous nous envoyez vos couleurs, vos envies et on s’occupe de tout.",
    price: "À partir de 300€",
  },
  {
    title: "Communiqué de presse / Dossier de presse",
    description:
      "Vous avez besoin de présenter votre entreprise à la presse. Il vous faut un communiqué de presse ou un dossier de presse bien présenté. Nous avons de l’expérience pour toute sorte d’activités, entreprises, associations, politiques…",
    price: "À partir de 99€",
  },
  {
    title: "Cartes de visite, Flyers, Affiches",
    description:
      "Nous travaillons ensemble sur vos cartes de visite, flyers, affiches, dépliants pour montrer qui vous êtes à vos futurs prospects.",
    price: "À partir de 99€",
  },
  {
    title: "Supports pour restaurants",
    description:
      "Vous êtes les pros dans votre cuisine alors montrons-le. Menus, présentoirs, etc. Donnons-leur envie de déguster vos plats.",
    price: "Sur devis",
  },
  {
    title: "Présentoirs",
    description:
      "Nous nous occupons de tous les présentoirs pour vos magasins ou événements. Kakémonos, présentoirs cartons, lumineux, ou autres.",
    price: "Sur devis",
  },
  {
    title: "Goodies",
    description:
      "Grâce aux différents cadeaux d’entreprise sur des supports aux formes et aux couleurs de votre entreprise, vous pourrez accentuer la visibilité de votre entreprise.",
    price: "Sur devis",
  },
  {
    title: "PowerPoint",
    description:
      "Besoin d’aide pour créer des présentations. N’hésitez pas à faire appel à nous. Pour des présentations plus organisées, plus fun, plus engageantes en fonction de vos besoins.",
    price: "Sur devis",
  },
];

export default CommunicationPrint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 24,
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 22,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  card: {
    marginBottom: 24,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
