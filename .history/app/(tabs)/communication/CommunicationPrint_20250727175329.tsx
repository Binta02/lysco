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
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Communication Print</Text>

        <Text style={styles.paragraph}>
          Faites de la communication print une alliée ! Porte-parole de votre
          image de marque et binôme de la communication web, elle vous permettra
          de vous démarquer de vos concurrents et d’attirer (ou de fidéliser)
          votre clientèle !
        </Text>

        <Text style={styles.paragraph}>
          Tous les canaux de distribution sont étudiés y compris une
          communication tangible. Pensez alors à distribuer des brochures, des
          goodies, des cartes de visite au cours d’événements, de rencontres,
          etc. N’avez-vous jamais croisé des hôtesses de street marketing ? Ces
          dernières, ne vous ont-elles pas donné un flyer d’une enseigne de
          produits de beauté ?
        </Text>

        <Text style={styles.paragraph}>
          Lys Conseil créera l’ensemble de vos supports print sous tout type de
          format : Cartes de visite, Plaquettes, Flyers, Catalogues, Affiches,
          Brochures, Kakémono, Roll-ups, etc.
        </Text>

        <Text style={styles.subSectionTitle}>Logo</Text>
        <Text style={styles.paragraph}>
          Le logo est très important, car il est sur tous vos supports de
          communication. Il peut être simple ou plus élaboré en fonction du type
          d’entreprise. On vous propose de créer le logo qui vous correspond en
          fonction de votre personnalité et du type d’entreprise.
        </Text>
        <Text style={styles.price}>À partir de 300€</Text>

        <Text style={styles.subSectionTitle}>Brochures</Text>
        <Text style={styles.paragraph}>
          Besoin de présenter votre entreprise via une brochure, un livret, etc.
          Vous nous envoyez vos couleurs, vos envies et on s’occupe de tout.
        </Text>
        <Text style={styles.price}>À partir de 300€</Text>

        <Text style={styles.subSectionTitle}>
          Communiqué de presse / Dossier de presse
        </Text>
        <Text style={styles.paragraph}>
          Vous avez besoin de présenter votre entreprise à la presse. Il vous
          faut un communiqué de presse ou un dossier de presse bien présenté.
          Nous avons de l’expérience pour toute sorte d’activités, entreprises,
          associations, politiques…
        </Text>
        <Text style={styles.price}>À partir de 99€</Text>

        <Text style={styles.subSectionTitle}>
          Cartes de visite, Flyers, Affiches
        </Text>
        <Text style={styles.paragraph}>
          Nous travaillons ensemble sur vos cartes de visite, flyers, affiches,
          dépliants pour montrer qui vous êtes à vos futurs prospects.
        </Text>
        <Text style={styles.price}>À partir de 99€</Text>

        <Text style={styles.subSectionTitle}>Supports pour restaurants</Text>
        <Text style={styles.paragraph}>
          Vous êtes les pros dans votre cuisine alors montrons-le. Menus,
          présentoirs, etc. Donnons-leur envie de déguster vos plats.
        </Text>
        <Text style={styles.price}>Sur devis</Text>

        <Text style={styles.subSectionTitle}>Présentoirs</Text>
        <Text style={styles.paragraph}>
          Nous nous occupons de tous les présentoirs pour vos magasins ou
          événements. Kakémonos, présentoirs cartons, lumineux, ou autres.
        </Text>
        <Text style={styles.price}>Sur devis</Text>

        <Text style={styles.subSectionTitle}>Goodies</Text>
        <Text style={styles.paragraph}>
          Grâce aux différents cadeaux d’entreprise sur des supports aux formes
          et aux couleurs de votre entreprise, vous pourrez accentuer la
          visibilité de votre entreprise.
        </Text>
        <Text style={styles.price}>Sur devis</Text>

        <Text style={styles.subSectionTitle}>PowerPoint</Text>
        <Text style={styles.paragraph}>
          Besoin d’aide pour créer des présentations. N’hésitez pas à faire
          appel à nous. Pour des présentations plus organisées, plus fun, plus
          engageantes en fonction de vos besoins.
        </Text>
        <Text style={styles.price}>Sur devis</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/contact" as any)}
        >
          <Text style={styles.buttonText}>Faire un devis</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default CommunicationPrint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5cb9bc",
    textAlign: "center",
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec4899",
    marginTop: 20,
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
  button: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
