// src/components/contract/ContractGenerator.tsx
import React from "react"
import { Document, Page, Text, View, StyleSheet, pdf, Image, Link } from "@react-pdf/renderer"
import { saveAs } from "file-saver"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"


// --- Styles identiques ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#0F172A",
    lineHeight: 1.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 95,
    height: 95,
  },
  address: {
    fontSize: 14,
    color: "#374151",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionMarker: {
    width: 4,
    height: 24,
    backgroundColor: "#4ADE80",
    marginRight: 8,
    borderRadius: 2,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 7,
  },
  text: {
    marginBottom: 6,
    fontSize: 13,
    lineHeight: 1.5,
    color: "#374151",
  },
  strong:{
    color: "#111827",
    fontWeight: "bold",
  },
  list: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    listStyleType: "disc",
    paddingLeft: 10,
  },
  bullet: {
    width: 6,
    marginRight: 6,
  },
  listText: {
    flex: 1,
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  column: {
    width: "48%",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 8,
    fontSize: 9,
    color: "#6B7280",
    textAlign: "center",
  },
  highlight: {
    color: "#16A34A",
    fontWeight: "bold",
  },
  nondeco: {
    textDecoration: "none",
    color: "#16A34A",
  },
})

interface ContractData {
  companyName: string
  fullName: string
  address: string
  addressDetails?: string
  city: string
  postalCode: string
  siretNumber: string
  businessActivity: string
  planPrice: number
  planName: string
  date: string
}

export const ContractDocument: React.FC<{ data: ContractData }> = ({ data }) => {
    const today = new Date().toLocaleDateString("fr-FR");

  return (
<Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête avec logo et adresse */}
        <View style={styles.header}>
          <Image
            src="/assets/lys-co-logo.jpg"
            style={styles.logo}
          />
          <Text style={styles.address}>
            <Text style={styles.label}> Lys&amp;Co{"\n"}</Text>
            28 Rue de l’église, 95170 Deuil-la-Barre
          </Text>
        </View>

        {/* Titre */}
        <Text style={styles.title}>
          CONTRAT DE DOMICILIATION COMMERCIALE
        </Text>
        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <View style={styles.sectionMarker}/>
            <Text style={styles.sectionTitleText}>Entre les soussignés :</Text>
          </View>

          {/* Société de domiciliation */}
          <Text style={styles.text}>
            <Text style={styles.label}>Nom :</Text> Europe Domiciliation
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Adresse :</Text> 28 Rue de l’Église – 95170 Deuil-la-Barre
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>SIRET :</Text> 804 180 792
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Agrément préfectoral :</Text> 04_95_2023
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Représenté par :</Text> Barbara EZELIS, gérante
          </Text>

          <Text style={[styles.text, { marginTop: 12 }]}>
            <Text style={styles.label}>ET</Text>
          </Text>

          {/* Le domicilié */}
          <Text style={styles.text}>
            <Text style={styles.label}>Société :</Text> {data.companyName}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Nom et Prénom :</Text> {data.fullName}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Adresse :</Text> {data.address}
          </Text>
          {data.addressDetails && (
            <Text style={styles.text}>
              <Text style={styles.label}>Complément :</Text> {data.addressDetails}
            </Text>
          )}
          <Text style={styles.text}>
            <Text style={styles.label}>Code postal / Ville :</Text> {data.postalCode} {data.city}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>SIRET :</Text> {data.siretNumber}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Activité :</Text> {data.businessActivity}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Représenté par :</Text> {data.fullName}
          </Text>
        </View>

        </Page>
<Page size="A4" style={styles.page}>
        {/* Préambule */}
        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <View style={styles.sectionMarker} />
            <Text style={styles.sectionTitleText}>Préambule</Text>
          </View>
          <Text style={styles.text}>
            Le Domiciliaire, en sa qualité d'entreprise agréée (n° préfectoral
            d'agrément : 04_95_2023) conformément aux dispositions du Code du
            commerce et aux articles R.123-167 à R.123-168, propose des services
            de domiciliation d'entreprise.          </Text>
          <Text style={styles.text}>
Le Domicilié souhaite bénéficier de ces services pour y établir son
            siège social.          </Text>
          <Text style={styles.text}>
            Les parties conviennent de ce qui suit :
          </Text>
        </View>
{/* Exemple Article 1 */}
        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <View style={styles.sectionMarker} />
            <Text style={styles.sectionTitleText}>
              Article 1 – Objet du contrat
            </Text>
          </View>
          <Text style={styles.text}>
            Le présent contrat a pour objet de permettre au Domicilié d'établir
            son siège social à l'adresse suivante :
          </Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            28 Rue de l’Église – 95170 Deuil-la Barre
          </Text>
          <Text style={styles.text}>
            Cette adresse sera utilisée par le Domicilié pour ses démarches
            administratives, fiscales et commerciales, conformément à la
            réglementation en vigueur.
          </Text>
          <Text style={styles.text}>
           L'adresse de domiciliation devra donc devenir le siège social de
            l'entreprise. Le Domicilié est habilité par la présente convention à
            recevoir à cette même adresse le courrier qui lui est destiné. Il
            pourra également utiliser cette adresse sur son papier à en-tête
            ainsi que sur ses documents commerciaux.
          </Text>
          <Text style={styles.text}>
            Le présent engagement de domiciliation est fait aux conditions
            prévues par les recommandations émises par la Chambre de Commerce et
            d'Industrie de Pontoise pour l'exercice de la domiciliation
            commerciale.
          </Text>
        </View>
{/* Article 2 – Obligations du Domiciliaire */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 2 – Obligations du Domiciliaire
    </Text>
  </View>
  <Text style={styles.text}>Le Domiciliaire s’engage à :</Text>
  <View style={styles.list}>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Mettre à disposition l’adresse mentionnée à l’article 1 pour l’établissement du siège social du Domicilié.
      </Text>
    </View>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Assurer la réception, la conservation et, le cas échéant, la mise
        à disposition ou l'envoi des courriers du Domicilié selon les
        modalités définies à l'Article 4.
      </Text>
    </View>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Tenir à disposition les documents nécessaires en cas de contrôle
        par les autorités compétentes.
      </Text>
    </View>
  </View>
</View>

{/* Article 3 – Obligations du Domicilié */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 3 – Obligations du Domicilié
    </Text>
  </View>
  <Text style={styles.text}>Le Domicilié s’engage à :</Text>
  <View style={styles.list}>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Utiliser l’adresse exclusivement pour son activité professionnelle.
      </Text>
    </View>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Communiquer au Domiciliaire toute modification concernant sa
              situation administrative ou légale (changement de statut, de
              gérant, cessation d'activité, etc.) et devra le notifier par écrit
              au Domiciliaire et fournir tout nouveau document justificatif dès
              que ce changement aura été pris en compte par l'organisme
              d'immatriculation concerné.      </Text>
    </View>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Fournir les documents requis lors de la signature du contrat, notamment :
      </Text>
    </View>
    {[
      "Un justificatif d’identité du gérant",
      "Un justificatif de domicile personnel du gérant (de moins de 6 mois)",
      "Adresse du comptable (si comptable)",
      "Un extrait Kbis pour les sociétés immatriculées (ou preuve de dépôt de dossier pour une immatriculation en cours) ou un avis de situation Sirene pour ceux qui n'ont pas de Kbis",
      "Une copie des statuts pour les entreprises",
      "La procuration postale (à faire à La Poste) qui autorise le Domiciliaire à signer les recommandés.",
    ].map((item, i) => (
      <View key={i} style={styles.listItem}>
        <Text style={styles.bullet}>–</Text>
        <Text style={styles.listText}>{item}</Text>
      </View>
    ))}
  </View>
  <Text style={styles.text}>
    Le Domicilié certifie sur l'honneur l'exactitude des renseignements
    fournis au Domiciliaire et nécessaires à la conclusion du contrat.
    Le contrat est ferme et définitif à la signature et aucun
    remboursement partiel ou total ne pourra être revendiqué par le
    Domicilié pour quelque motif que ce soit.
  </Text>
</View>
</Page>
<Page size="A4" style={styles.page}>
{/* Article 4 – Description des prestations de services */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 4 – Description des prestations de services
    </Text>
  </View>
  <Text style={styles.text}>
    En regard des sommes versées à la conclusion du contrat, le Domiciliaire s’engage à fournir les prestations suivantes :
  </Text>
  <View style={styles.list}>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Domiciliation commerciale dans les locaux sis : 28 Rue de l’Église – 95170 Deuil-la-Barre
      </Text>
    </View>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        {/* Réception, tri et mise à disposition du courrier chaque jour ouvré selon les horaires du Domiciliaire (garde ≤ 21 jours, réexpédition hebdomadaire, timbres en sus &gt;14 €). */}
        Réception, tri et mise à disposition du courrier destiné au
        Domicilié chaque jour ouvré pendant les horaires définis par le
        Domiciliaire. La garde du courrier ne peut excéder 21 (vingt et
         un) jours. Concernant l'option « Réexpédition », elle sera faite
              une fois par semaine. Un surcoût sera demandé en cas de
              dépassement de 14€ de timbres.
      </Text>
    </View>
  </View>
  <Text style={styles.text}>
            Le Domiciliataire met à la disposition du Domicilié un bureau
            permettant une réunion régulière des organes chargés de la
            direction, de l'administration ou de la surveillance de l'entreprise
            et l'installation des services nécessaires à la tenue, conservation
            et la consultation de leurs registres et documents prescrits par les
            lois et règlements (Décret N.85.1280du 5 décembre 1985, modifié par
            le décret N°2007.750 du 9 Mai)
          </Text>
          <Text style={styles.text}>
            En aucun cas, la location de bureau ne peut être utilisée par le
            Domicilié pour le recrutement de personnel. « France Travail » devra
            diriger les postulants à l'adresse d'activité du Domicilié et non à
            l'adresse de son siège social.
          </Text>
          <Text style={styles.text}>
            Le Domicilié doit donner procuration au Domiciliaire pour le retrait
            de lettres recommandées. Celles-ci seront acheminées par courrier
            ordinaire. Le Domiciliaire se dégage de toute responsabilité en cas
            de perte ou de transmission tardive de tous courriers.
          </Text>
</View>

{/* Article 5 – Durée du contrat */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 5 – Durée du contrat
    </Text>
  </View>
  <Text style={styles.text}>
            Le présent contrat est conclu pour une durée de 6 mois, à compter du{" "}
            {today}, renouvelable par tacite reconduction, sauf dénonciation par
            l'une des parties avec un préavis de 15 (quinze) jours.
          </Text>
</View>

{/* Article 6 – Tarifs et conditions de paiement */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 6 – Tarifs et conditions de paiement
    </Text>
  </View>
  <Text style={styles.text}>
    Le montant de la domiciliation est fixé à <Text style={styles.highlight}>{data.planPrice} €</Text> par mois pour la formule « {data.planName} ».
  </Text>
  <Text style={styles.text}>
            Les paiements devront être effectués par virement bancaire, espèce
            ou carte bleu.
          </Text>
          <Text style={styles.text}>
            En cas de retard de paiement, des pénalités équivalentes à 10%
            pourront être appliquées.
          </Text>
</View>


{/* Article 7 – Résiliation du contrat */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 7 – Résiliation du contrat
    </Text>
  </View>
  <Text style={styles.text}>
    Le contrat pourra être résilié dans les conditions suivantes :
  </Text>
  <View style={styles.list}>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
        Par le Domicilié, avec un préavis de 15 jours.
      </Text>
    </View>
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>
Par le Domiciliaire, en cas de non-respect des obligations
              contractuelles du Domicilié ou de non-paiement des sommes dues.      </Text>
    </View>
  </View>
  <Text style={styles.text}>
            À l'expiration ou la résiliation du contrat, le Domicilié s'engage à
            procéder immédiatement au changement de son adresse de siège social.
          </Text>
          <Text style={styles.text}>
            Conformément au décret n°5.12.85, le Domiciliaire s'oblige à
            informer le greffier du Tribunal de Commerce, à l'expiration du
            contrat ou en cas de résiliation de celui-ci, de la cessation de la
            domiciliation de l'entreprise dans ses locaux. De plus, les ordres
            de réexpédition des sociétés domiciliées donnés à la poste, ne
            seront pas acceptés conformément à l'instruction du 26/01/2001.
          </Text>
</View>

{/* Article 8 – Responsabilité */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 8 – Responsabilité
    </Text>
  </View>
  <Text style={styles.text}>
            Le Domiciliaire ne pourra être tenu responsable des conséquences
            liées à un retard ou à une perte de courrier imputable à des tiers
            (ex : service postal) ou à un cas de force majeure.
          </Text>
          <Text style={styles.text}>
            Le Domicilié dégage le Domiciliataire de toute responsabilité quant
            à la transmission du courrier effectuée par la Poste ou par des
            entreprises assimilées ainsi que pour tout envoi mal libellé
            (adresse incomplète ou illisible, absence de cédex, ou tout autre
            nom, etc.) reçu à l'intention du Domicilié.
          </Text>
          <Text style={styles.text}>
            Étant précisé que l'autorisation que le Domiciliaire lui accorde ne
            saurait en aucun cas engager sa responsabilité, sous quelque forme
            que ce soit, présente et à venir.
          </Text>
          <Text style={styles.text}>
            Le Domiciliaire ne saurait être tenu en aucune façon responsable du
            rejet du Domicilié par les différents organismes administratifs
            nécessaires à son inscription ou pour tout autre motif et ne
            procédera donc à aucun remboursement.
          </Text>
</View>

{/* Article 9 – Confidentialité */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 9 – Confidentialité
    </Text>
  </View>
  <Text style={styles.text}>
            Les parties s'engagent à préserver la confidentialité des
            informations échangées dans le cadre du présent contrat.
          </Text>
</View>

{/* Article 10 – Clauses résolutoires */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Article 10 – Clauses résolutoires
    </Text>
  </View>
  <Text style={styles.text}>
            A défaut de paiement d'une seule facture à son échéance ou en cas
            d'inexécution d'une des clauses du présent engagement, la prestation
            de tous les services sera suspendue après mise en demeure. A défaut
            de règlement d'une ou plusieurs factures, rappelé par les soins du
            Domiciliaire, le courrier ne pourra être réexpédié au domicilié. Il
            sera tenu à sa disposition dans nos locaux comme stipulé à l'article
            4 du contrat, dans la limite de 21 (vingt et un) jours. Au-delà, il
            sera renvoyé à l'expéditeur.
          </Text>
<Text style={styles.text}>
            Le contrat pourra être dénoncé de plein droit par le Domiciliaire
            sans notification en respectant un préavis de 30 jours et la carence
            du Domicilié sera signalée au greffe du Tribunal de Commerce ou au
            Registre des Métiers afin de procéder à la radiation d'office de
            l'entreprise.
          </Text>
<Text style={styles.text}>
            En cas de contestation liée aux présentes, seul le Tribunal de
            Commerce concerné sera compétent.
          </Text>
</View>
</Page>
<Page size="A4" style={styles.page}>
{/* Litiges */}
<View style={styles.card}>
  <View style={styles.sectionTitle}>
    <View style={styles.sectionMarker} />
    <Text style={styles.sectionTitleText}>
      Litiges
    </Text>
  </View>
  <Text style={styles.text}>
            En cas de litige relatif à l'exécution ou l'interprétation du
            présent contrat, les parties s'efforceront de le résoudre à
            l'amiable. À défaut, le litige sera soumis aux juridictions
            compétentes du ressort du siège du Domiciliaire.
          </Text>
</View>
{/* Signature */}
        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <View style={styles.sectionMarker} />
            <Text style={styles.sectionTitleText}>Signature</Text>
          </View>
          <Text style={styles.text}>
            Fait en double exemplaire, à Deuil-la-Barre le {today}
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Pour le Domiciliaire :</Text>
              <Text style={styles.text}>Nom : EZELIS</Text>
              <Text style={styles.text}>Fonction : GÉRANTE</Text>
              <Text style={styles.text}>Signature :</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Pour le Domicilié :</Text>
              <Text style={styles.text}>Nom : ________________________</Text>
              <Text style={styles.text}>Signature :</Text>
              <Text style={{ fontStyle: "italic", fontSize: 10 }}>
                (Précédée de la mention « Lu et Approuvé »)
              </Text>
            </View>
          </View>
        </View>

        {/* Pied de page */}
        <Text style={styles.footer}>
          28 Rue de l’église, 95170 Deuil-la-Barre{"\n"}
          lys-and-co.com – tél : 09.53.42.11.63 / 07.56.85.37.02 – contact@lys-and-co.com{"\n"}
          <Text style={styles.strong}>
        Lien du site :{' '}
        <Link style={styles.nondeco} src="https://lys-and-co.com">
          lys-and-co.com
        </Link>
      </Text> –– 
          <Text style={styles.strong}>N° Agrément : 04_95_2023</Text>{"\n"}
          © 2025 Lys & Co – Tous droits réservés.
        </Text>
      </Page>
    </Document>
  )
}

interface ContractGeneratorProps {
  clientInfo: {
    firstName: string
    lastName: string
    companyName: string
    businessActivity: string
    siretNumber: string
    address: string
    addressDetails?: string
    city: string
    postalCode: string
  }
  planDetails: { name: string; price: number }
}

const ContractGenerator: React.FC<ContractGeneratorProps> = ({
  clientInfo,
  planDetails,
}) => {
  const data: ContractData = {
    companyName: clientInfo.companyName,
    fullName: `${clientInfo.firstName} ${clientInfo.lastName}`,
    address: clientInfo.address,
    addressDetails: clientInfo.addressDetails,
    city: clientInfo.city,
    postalCode: clientInfo.postalCode,
    siretNumber: clientInfo.siretNumber,
    businessActivity: clientInfo.businessActivity,
    planPrice: planDetails.price,
    planName: planDetails.name,
    date: new Date().toLocaleDateString("fr-FR"),
  }

  const handleDownload = async () => {
    // Génère le PDF en mémoire
    const blob = await pdf(<ContractDocument data={data} />).toBlob()
    // Déclenche le téléchargement
    saveAs(blob, `contrat-${data.companyName.replace(/\s+/g, "-").toLowerCase()}.pdf`)
  }

  return (
    <Button
      onClick={handleDownload}
      className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90"
    >
      <FileText className="mr-2 h-4 w-4" />
      Télécharger votre contrat
    </Button>
  )
}

export default ContractGenerator
