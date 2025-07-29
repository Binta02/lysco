import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React from "react";
import { Alert, Button, View } from "react-native";

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

  const generateContractHtml = () => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 12pt;
          color: #000;
          padding: 20px;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 18pt;
          color: #333;
        }
        .info-block {
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .info-block strong {
          display: inline-block;
          width: 160px;
        }
        .article {
          margin-bottom: 30px;
        }
        .article h2 {
          font-size: 14pt;
          color: #1a1a1a;
          border-bottom: 1px solid #aaa;
          margin-bottom: 10px;
        }
        .signature-section {
          display: flex;
          justify-content: space-between;
          margin-top: 60px;
        }
        .signature-block {
          width: 45%;
          text-align: center;
        }
        .signature-line {
          margin-top: 60px;
          border-top: 1px solid #000;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
        }
        footer {
          position: fixed;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 10pt;
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>Contrat de Domiciliation</h1>
      <div class="info-block">
        <p><strong>Société domiciliataire :</strong> Lys & Co, 28 Rue de l'Église, 95170 Deuil-la-Barre</p>
        <p><strong>SIRET :</strong> 804 180 792 • Agrément : 04_95_2023</p>
        <p><strong>Représentée par :</strong> Barbara EZELIS</p>
      </div>
      <div class="info-block">
        <p><strong>Société domiciliée :</strong> ${data.companyName}</p>
        <p><strong>Nom complet :</strong> ${data.fullName}</p>
        <p><strong>Adresse :</strong> ${data.address}</p>
        ${
          data.addressDetails
            ? `<p><strong>Complément :</strong> ${data.addressDetails}</p>`
            : ""
        }
        <p><strong>Code postal/Ville :</strong> ${data.postalCode} ${
    data.city
  }</p>
        <p><strong>SIRET :</strong> ${data.siretNumber}</p>
        <p><strong>Activité :</strong> ${data.businessActivity}</p>
        <p><strong>Formule :</strong> ${data.planName} - ${
    data.planPrice
  }€/mois</p>
      </div>
      <div class="article">
        <h2>Article 1 – Objet</h2>
        <p>Ce contrat permet d'établir le siège social du domicilié à l'adresse : 28 Rue de l'Église, 95170 Deuil-la-Barre.</p>
      </div>
      <div class="article">
        <h2>Article 2 – Engagements</h2>
        <p>Le domiciliataire s'engage à fournir l'adresse, réceptionner le courrier et respecter la réglementation. Le domicilié s'engage à fournir ses documents et à utiliser l'adresse uniquement pour son activité.</p>
      </div>
      <div class="article">
        <h2>Article 3 – Durée</h2>
        <p>Contrat de 6 mois à compter du ${today}, renouvelable tacitement avec préavis de 15 jours pour résiliation.</p>
      </div>
      <div class="article">
        <h2>Article 4 – Paiement</h2>
        <p>Le montant est de ${
          data.planPrice
        }€ par mois, à régler par virement, carte ou espèces. Des pénalités de 10% s’appliquent en cas de retard.</p>
      </div>
      <div class="signature-section">
        <div class="signature-block">
          <p>Pour le Domiciliataire</p>
          <p>Barbara EZELIS</p>
          <div class="signature-line"></div>
        </div>
        <div class="signature-block">
          <p>Pour le Domicilié</p>
          <p>${data.fullName}</p>
          <div class="signature-line"></div>
        </div>
      </div>
      <footer>
        Lys & Co – 28 Rue de l'Église, 95170 Deuil-la-Barre – contact@lys-and-co.com – 09.53.42.11.63
      </footer>
    </body>
    </html>
  `;

  const handleGeneratePdf = async () => {
    try {
      const html = generateContractHtml();
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("PDF généré", `Fichier enregistré : ${uri}`);
      }
    } catch (error) {
      console.error("Erreur PDF:", error);
      Alert.alert("Erreur", "Échec de la génération du contrat.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="📄 Générer le contrat PDF" onPress={handleGeneratePdf} />
    </View>
  );
};

export default ContractGenerator;
