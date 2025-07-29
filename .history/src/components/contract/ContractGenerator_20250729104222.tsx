import * as Sharing from "expo-sharing";
import React from "react";
import { Alert, Button, View } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

// Ton type
type ContractData = {
  companyName: string;
  fullName: string;
  address: string;
  addressDetails?: string;
  postalCode: string;
  city: string;
  siretNumber: string;
  businessActivity: string;
  planPrice: number | string;
  planName: string;
};

type ContractGeneratorProps = {
  data: ContractData;
};

const ContractGenerator: React.FC<ContractGeneratorProps> = ({ data }) => {
  const today = new Date().toLocaleDateString("fr-FR");

  const generateContractHtml = () => {
    return `<!DOCTYPE html>
    <html><head><meta charset="UTF-8"><style>
      body {
        font-family: Arial, sans-serif;
        font-size: 11pt;
        color: #333;
        margin: 0;
        padding: 20px;
      }
      h1 {
        text-align: center;
        text-transform: uppercase;
      }
      .section {
        margin-bottom: 30px;
      }
      .label {
        font-weight: bold;
      }
      .signature {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
      }
      .footer {
        font-size: 9pt;
        color: #888;
        text-align: center;
        margin-top: 40px;
        border-top: 1px solid #ccc;
        padding-top: 10px;
      }
    </style></head>
    <body>
      <h1>Contrat de domiciliation commerciale</h1>
      <div class="section">
        <p><span class="label">Domiciliaire :</span> Europe Domiciliation</p>
        <p><span class="label">Adresse :</span> 28 Rue de l'Église – 95170 Deuil-la-Barre</p>
        <p><span class="label">SIRET :</span> 804 180 792</p>
        <p><span class="label">Représenté par :</span> Barbara EZELIS</p>
      </div>

      <div class="section">
        <p><span class="label">Société :</span> ${data.companyName}</p>
        <p><span class="label">Nom et prénom :</span> ${data.fullName}</p>
        <p><span class="label">Adresse :</span> ${data.address}</p>
        ${
          data.addressDetails
            ? `<p><span class="label">Complément :</span> ${data.addressDetails}</p>`
            : ""
        }
        <p><span class="label">Code postal/Ville :</span> ${data.postalCode} ${
      data.city
    }</p>
        <p><span class="label">SIRET :</span> ${data.siretNumber}</p>
        <p><span class="label">Activité :</span> ${data.businessActivity}</p>
        <p><span class="label">Formule :</span> ${data.planName} (${
      data.planPrice
    } €/mois)</p>
      </div>

      <div class="section">
        <p>Le présent contrat est conclu le ${today} pour une durée de 6 mois, renouvelable tacitement.</p>
        <p>Le domicilié certifie l'exactitude des informations fournies.</p>
      </div>

      <div class="signature">
        <div>
          <p><strong>Domiciliaire</strong></p>
          <p>Signature :</p>
        </div>
        <div>
          <p><strong>Domicilié</strong></p>
          <p>Nom : ${data.fullName}</p>
          <p>Signature :</p>
        </div>
      </div>

      <div class="footer">
        Lys & Co – 28 Rue de l'Église – 95170 Deuil-la-Barre – www.lys-and-co.com
      </div>
    </body></html>`;
  };

  const handleGeneratePdf = async () => {
    try {
      const html = generateContractHtml();

      const result = await RNHTMLtoPDF.convert({
        html,
        fileName: `contrat_domiciliation_${data.fullName.replace(/\s/g, "_")}`,
        base64: false,
      });

      if (result?.filePath && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(result.filePath);
      } else {
        Alert.alert("PDF généré", `Fichier : ${result?.filePath}`);
      }
    } catch (err) {
      console.error("Erreur PDF:", err);
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
