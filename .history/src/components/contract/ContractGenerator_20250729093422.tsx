import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React from "react";
import { Alert, Button, View } from "react-native";

type ContractData = {
  companyName?: string;
  fullName: string;
  address: string;
  addressDetails?: string;
  postalCode: string;
  city: string;
  siretNumber?: string;
  businessActivity?: string;
  planName: string;
  planPrice: number | string;
};

type ContractGeneratorProps = {
  data: ContractData;
};

const ContractGenerator: React.FC<ContractGeneratorProps> = ({ data }) => {
  const today = new Date().toLocaleDateString("fr-FR");

  const generateContractHtml = () => `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; color: #111; line-height: 1.6; }
          h1, h2 { text-align: center; text-transform: uppercase; }
          .card { border: 1px solid #ccc; border-radius: 6px; padding: 20px; margin-bottom: 20px; background: #f9f9f9; }
          .section-title { font-weight: bold; font-size: 16px; margin-top: 30px; border-left: 4px solid #4ADE80; padding-left: 10px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
          .footer { font-size: 12px; text-align: center; color: #666; margin-top: 40px; }
        </style>
      </head>
      <body>
        <h1>Contrat de Domiciliation Commerciale</h1>

        <div class="card">
          <p><strong>Société :</strong> Europe Domiciliation</p>
          <p><strong>Adresse :</strong> 28 Rue de l’Église – 95170 Deuil-la-Barre</p>
          <p><strong>SIRET :</strong> 804 180 792</p>
          <p><strong>Agrément préfectoral :</strong> 04_95_2023</p>
          <p><strong>Représenté par :</strong> Barbara EZELIS, Gérante</p>
        </div>

        <div class="card">
          <p><strong>Société cliente :</strong> ${data.companyName}</p>
          <p><strong>Nom et prénom :</strong> ${data.fullName}</p>
          <p><strong>Adresse :</strong> ${data.address} ${
    data.addressDetails || ""
  }</p>
          <p><strong>Code postal / Ville :</strong> ${data.postalCode} ${
    data.city
  }</p>
          <p><strong>SIRET :</strong> ${data.siretNumber}</p>
          <p><strong>Activité :</strong> ${data.businessActivity}</p>
        </div>

        <p class="section-title">Préambule</p>
        <p>Le Domiciliaire, en sa qualité d'entreprise agréée (n° 04_95_2023), propose des services de domiciliation d'entreprise. Le Domicilié souhaite bénéficier de ces services pour y établir son siège social.</p>

        <p class="section-title">Article 1 – Objet du contrat</p>
        <p>Permettre au Domicilié d'établir son siège social à l’adresse suivante : <strong>28 Rue de l’Église – 95170 Deuil-la-Barre</strong>.</p>

        <p class="section-title">Article 2 – Obligations du Domiciliaire</p>
        <ul>
          <li>Mettre à disposition l’adresse pour le siège social du Domicilié.</li>
          <li>Réceptionner et conserver le courrier du Domicilié.</li>
          <li>Fournir les documents nécessaires aux autorités en cas de contrôle.</li>
        </ul>

        <p class="section-title">Article 3 – Obligations du Domicilié</p>
        <ul>
          <li>Utiliser l’adresse exclusivement pour son activité professionnelle.</li>
          <li>Notifier toute modification administrative ou légale.</li>
          <li>Fournir :
            <ul>
              <li>Justificatif d'identité et de domicile du gérant</li>
              <li>Extrait Kbis ou preuve d’immatriculation</li>
              <li>Copie des statuts</li>
              <li>Procuration postale</li>
            </ul>
          </li>
        </ul>

        <p class="section-title">Article 4 – Description des prestations de services</p>
        <ul>
          <li>Domiciliation à l’adresse indiquée</li>
          <li>Réception du courrier avec garde de 21 jours</li>
          <li>Réexpédition hebdomadaire (avec supplément si > 14€)</li>
        </ul>
        <p>Le Domiciliataire met également un bureau à disposition pour consultation des documents obligatoires.</p>

        <p class="section-title">Article 5 – Durée du contrat</p>
        <p>Durée de 6 mois à compter du ${today}, renouvelable tacitement. Résiliation avec préavis de 15 jours.</p>

        <p class="section-title">Article 6 – Tarifs et paiements</p>
        <p>Formule : <strong>${data.planName}</strong> – <strong>${
    data.planPrice
  } €</strong> / mois.</p>
        <p>Paiement par virement, espèces ou carte. Pénalités de 10% en cas de retard.</p>

        <p class="section-title">Article 7 – Résiliation</p>
        <ul>
          <li>Par le Domicilié : préavis de 15 jours</li>
          <li>Par le Domiciliaire en cas de non-respect ou non-paiement</li>
        </ul>
        <p>Le Domicilié devra changer l’adresse de son siège social à la fin du contrat.</p>

        <p class="section-title">Article 8 – Responsabilité</p>
        <p>Le Domiciliaire décline toute responsabilité en cas de perte de courrier ou de rejet administratif.</p>

        <p class="section-title">Article 9 – Confidentialité</p>
        <p>Les deux parties s’engagent à préserver la confidentialité des informations échangées.</p>

        <p class="section-title">Article 10 – Clauses résolutoires</p>
        <p>En cas d’impayé ou manquement, les services peuvent être suspendus et la société signalée au greffe.</p>

        <p class="section-title">Litiges</p>
        <p>Tout litige sera soumis aux juridictions du siège du Domiciliaire.</p>

        <p class="section-title">Signatures</p>
        <table width="100%" style="margin-top: 20px;">
          <tr>
            <td><strong>Pour le Domiciliaire :</strong><br/>Nom : EZELIS<br/>Fonction : Gérante<br/>Signature : ____________</td>
            <td><strong>Pour le Domicilié :</strong><br/>Nom : ${
              data.fullName
            }<br/>Signature : ____________<br/><em>(Précédé de la mention « Lu et approuvé »)</em></td>
          </tr>
        </table>

        <div class="footer">
          28 Rue de l’église, 95170 Deuil-la-Barre – lys-and-co.com – contact@lys-and-co.com<br/>
          Agrément préfectoral : 04_95_2023 – © 2025 Lys & Co
        </div>
      </body>
    </html>
  `;

  const handleGeneratePdf = async () => {
    try {
      const html = generateContractHtml();

      const { uri } = await Print.printToFileAsync({ html, base64: false });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("PDF généré", `Le fichier a été enregistré : ${uri}`);
      }
    } catch (error) {
      console.error("Erreur génération PDF :", error);
      Alert.alert("Erreur", "La génération du contrat a échoué.");
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="📄 Générer le contrat PDF" onPress={handleGeneratePdf} />
    </View>
  );
};

export default ContractGenerator;
