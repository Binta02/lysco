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
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          h1, h2 { text-align: center; }
          .section { margin-bottom: 20px; }
          .bold { font-weight: bold; }
          .card { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
          .small { font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Contrat de Domiciliation Commerciale</h1>
        <div class="card">
          <p><span class="bold">Société :</span> Europe Domiciliation</p>
          <p><span class="bold">Adresse :</span> 28 Rue de l’Église, 95170 Deuil-la-Barre</p>
          <p><span class="bold">SIRET :</span> 804 180 792</p>
          <p><span class="bold">Agrément préfectoral :</span> 04_95_2023</p>
          <p><span class="bold">Représenté par :</span> Barbara EZELIS, Gérante</p>
        </div>

        <div class="card">
          <p><span class="bold">Société cliente :</span> ${
            data.companyName || "N/A"
          }</p>
          <p><span class="bold">Nom et Prénom :</span> ${data.fullName}</p>
          <p><span class="bold">Adresse :</span> ${data.address} ${
    data.addressDetails || ""
  }</p>
          <p><span class="bold">Code postal / Ville :</span> ${
            data.postalCode
          } ${data.city}</p>
          <p><span class="bold">SIRET :</span> ${data.siretNumber || "N/A"}</p>
          <p><span class="bold">Activité :</span> ${
            data.businessActivity || "Non précisé"
          }</p>
        </div>

        <div class="section">
          <h2>Article 1 – Objet du contrat</h2>
          <p>Permettre au Domicilié d'établir son siège social à l'adresse de Europe Domiciliation.</p>
        </div>

        <div class="section">
          <h2>Article 2 – Obligations du Domicilié</h2>
          <ul>
            <li>Utiliser l'adresse exclusivement pour son activité professionnelle.</li>
            <li>Communiquer tout changement administratif ou légal.</li>
            <li>Fournir justificatifs : identité, domicile, statuts, etc.</li>
          </ul>
        </div>

        <div class="section">
          <h2>Article 3 – Prestations de services</h2>
          <p>Domiciliation commerciale, réception et réexpédition du courrier selon modalités convenues.</p>
        </div>

        <div class="section">
          <h2>Article 4 – Tarifs et paiement</h2>
          <p>Formule : <span class="bold">${data.planName}</span> – ${
    data.planPrice
  } €/mois.</p>
          <p>Paiements par virement, espèces ou carte.</p>
        </div>

        <div class="section">
          <h2>Article 5 – Durée et résiliation</h2>
          <p>Durée : 6 mois à compter du ${today}, renouvelable tacitement.</p>
          <p>Résiliation possible avec préavis de 15 jours.</p>
        </div>

        <div class="section">
          <h2>Signatures</h2>
          <table width="100%">
            <tr>
              <td>
                <p class="bold">Pour le Domicilié :</p>
                <p>Nom : ${data.fullName}</p>
                <p>Signature : ________________________</p>
              </td>
              <td>
                <p class="bold">Pour le Domiciliaire :</p>
                <p>Nom : Barbara EZELIS</p>
                <p>Fonction : Gérante</p>
                <p>Signature : ________________________</p>
              </td>
            </tr>
          </table>
          <p class="small">(Précédée de la mention « Lu et Approuvé »)</p>
        </div>

        <footer class="small" style="text-align:center; margin-top:30px;">
          28 Rue de l’Église, 95170 Deuil-la-Barre • lys-and-co.com • contact@lys-and-co.com
        </footer>
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
