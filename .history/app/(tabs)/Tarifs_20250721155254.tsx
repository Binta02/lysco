import Footer from "@/src/components/Footer";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TableSectionProps = {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
  buttonText?: string;
  link?: string;
};
const Tarifs = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);

  const TableSection: React.FC<TableSectionProps> = ({
    title,
    caption,
    headers,
    rows,
    buttonText,
    link,
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.caption}>{caption}</Text>
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          {headers.map((header, idx) => (
            <Text key={idx} style={[styles.cell, styles.headerCell]}>
              {header}
            </Text>
          ))}
        </View>
        {rows.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            {row.map((cell, cIdx) => (
              <Text key={cIdx} style={styles.cell}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
      {link && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(link as any)}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View style={{ padding: 8 }}>
          {" "}
          {/* Breadcrumb */}
          <Text style={styles.title}>Nos Tarifs</Text>
          <Text style={styles.description}>
            Découvrez nos différentes offres tarifaires adaptées à vos besoins.
            Que vous soyez une entreprise en développement ou un entrepreneur
            indépendant, nous avons la solution qui vous convient.
          </Text>
          {/* Domiciliation */}
          <TableSection
            title="Domiciliation d'entreprise"
            caption="Tarifs applicables à partir du 1er janvier 2025"
            headers={["Service", "Durée", "Micro-Entreprise", "Entreprise"]}
            rows={[
              ["Domiciliation d'entreprise", "3 mois", "90 €", "120 €"],
              ["Domiciliation d'entreprise", "6 mois", "160 €", "220 €"],
              ["Domiciliation d'entreprise", "1 an", "290 €", "390 €"],
              ["Pack domicilié", "1 an", "450 €", "550 €"],
            ]}
            buttonText="Voir les détails des offres de domiciliation"
            link="/(tabs)/Domiciliation"
          />
          {/* Services administratifs */}
          <TableSection
            title="Services administratifs"
            caption="Tarifs indicatifs - sur devis pour projets spécifiques"
            headers={["Service", "Unité", "Prix"]}
            rows={[
              ["Inscription Auto Entreprise", "Forfait", "150 €"],
              ["Inscription Entreprise Individuelle", "Forfait", "150 €"],
              ["Rédaction Formalités de Création", "Forfait", "600 € *"],
              ["Modification Société", "Forfait", "900 € *"],
              ["Assistance Administrative", "Heure", "30 €"],
              ["Création de Devis/Factures", "Page", "15 €"],
            ]}
            buttonText="Voir les détails des services administratifs"
            link="/(tabs)/ServicesAdmin"
          />
          {/* Services de communication */}
          <TableSection
            title="Services de communication"
            caption="Tarifs de base - devis personnalisés disponibles"
            headers={["Service", "Description", "À partir de"]}
            rows={[
              ["Site Internet", "Site vitrine responsive 5 pages", "990 €"],
              [
                "Community Management",
                "Gestion mensuelle 2 réseaux",
                "350 €/mois",
              ],
              ["Création logo", "3 propositions + fichiers sources", "290 €"],
              ["Pack photos", "Séance 2h + 15 photos retouchées", "350 €"],
              ["Stratégie de communication", "Audit et plan d'action", "590 €"],
            ]}
            buttonText="Voir les détails des services de communication"
            link="/(tabs)/Communication"
          />
          {/* Espaces de travail */}
          <TableSection
            title="Espaces de travail"
            caption=""
            headers={["Service", "Durée", "Prix"]}
            rows={[
              ["Espace coworking", "Journée", "20 €"],
              ["Espace coworking", "Semaine", "80 €"],
              ["Espace coworking", "Mois", "250 €"],
              ["Bureau privé", "Journée", "40 €"],
              ["Bureau privé", "Mois", "500 €"],
              ["Salle de réunion", "Heure", "30 €"],
              ["Salle de réunion", "Journée", "180 €"],
            ]}
            buttonText="Découvrir nos espaces de travail"
            link="/(tabs)/EspacesTravail"
          />
          {/* Bloc devis personnalisé */}
          <View style={styles.customQuote}>
            <Text style={styles.sectionTitle}>
              Besoin d'un devis personnalisé ?
            </Text>
            <Text style={styles.description}>
              Nous proposons des solutions sur mesure adaptées à vos besoins
              spécifiques. Contactez-nous pour discuter de votre projet et
              obtenir un devis personnalisé.
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#5cb9bc", marginRight: 8 },
                ]}
                onPress={() => router.push("/(tabs)/Contact")}
              >
                <Text style={styles.buttonText}>Nous contacter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderWidth: 1,
                    borderColor: "#f43f5e",
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={() => router.push("/(tabs)/DemandeDevis")} //demande-devis
              >
                <Text style={[styles.buttonText, { color: "#f43f5e" }]}>
                  Demander un devis
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Footer */}
        <Footer />
      </ScrollView>
    </View>
  );
};

export default Tarifs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  breadcrumb: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#0f172a",
  },
  description: {
    textAlign: "center",
    color: "#475569",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#5cb9bc",
  },
  caption: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 8,
  },
  table: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
  },
  headerCell: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#5cb9bc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  customQuote: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
});
