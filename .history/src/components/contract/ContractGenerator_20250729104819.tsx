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
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          /* Reset et styles de base */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: "Helvetica Neue", Arial, sans-serif;
            color: #333;
            line-height: 1.5;
            font-size: 11pt;
            padding: 0;
            margin: 0;
          }

          /* Gestion des pages */
          .page {
            width: 100%;
            height: 100%;
            padding: 2cm;
            position: relative;
            page-break-after: always;
          }

          .last-page {
            page-break-after: auto;
          }

          /* En-tête */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 10px;
          }

          .logo-container {
            width: 30%;
          }

          .logo {
            width: 95px;
            height: 95px;
            object-fit: contain;
          }

          .address {
            width: 65%;
            font-size: 10pt;
            text-align: right;
            color: #555;
          }

          .company-name {
            font-weight: bold;
            margin-bottom: 5px;
          }

          /* Titre principal */
          .title {
            text-align: center;
            font-size: 14pt;
            font-weight: bold;
            margin: 15px 0;
            text-transform: uppercase;
            color: #222;
          }

          /* Cartes de contenu */
          .card {
            background-color: #f9f9f9;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
            page-break-inside: avoid;
          }

          /* Titres de section */
          .section-title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e0e0e0;
          }

          .section-marker {
            width: 4px;
            height: 18px;
            background-color: #4CAF50;
            margin-right: 8px;
          }

          .section-title-text {
            font-size: 12pt;
            font-weight: bold;
            color: #333;
          }

          /* Textes et labels */
          .text {
            margin-bottom: 8px;
            font-size: 10.5pt;
            line-height: 1.4;
            text-align: justify;
          }

          .label {
            font-weight: bold;
            display: inline-block;
            min-width: 120px;
          }

          /* Listes */
          .list {
            margin: 10px 0 10px 20px;
          }

          .list-item {
            margin-bottom: 5px;
            display: flex;
          }

          .bullet {
            margin-right: 8px;
            min-width: 10px;
          }

          .list-text {
            flex: 1;
          }

          /* Mise en page colonnes */
          .row {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .column {
            width: 48%;
          }

          /* Pied de page */
          .footer {
            position: absolute;
            bottom: 20px;
            left: 2cm;
            right: 2cm;
            font-size: 8pt;
            color: #666;
            text-align: center;
            padding-top: 10px;
            border-top: 1px solid #ddd;
          }

          /* Styles spécifiques */
          .highlight {
            color: #2E7D32;
            font-weight: bold;
          }

          .signature-line {
            height: 1px;
            background-color: #333;
            margin: 15px 0 5px;
            width: 80%;
          }

          .signature-label {
            font-size: 9pt;
            font-style: italic;
          }

          /* Amélioration de l'espacement */
          .spacer {
            height: 10px;
          }

          .double-spacer {
            height: 20px;
          }

          /* Empêcher les veuves et orphelines */
          p, .text {
            orphans: 3;
            widows: 3;
          }
        </style>
      </head>
      <body>
        <!-- Page 1 -->
        <div class="page">
          <div class="header">
            <div class="logo-container">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/logo-lysco-e1752521126604.jpg" class="logo" />
            </div>
            <div class="address">
              <div class="company-name">Lys&amp;Co</div>
              28 Rue de l'église<br/>
              95170 Deuil-la-Barre
            </div>
          </div>

          <h1 class="title">CONTRAT DE DOMICILIATION COMMERCIALE</h1>
          
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Entre les soussignés :</div>
            </div>

            <div class="text">
              <span class="label">Nom :</span> Europe Domiciliation
            </div>
            <div class="text">
              <span class="label">Adresse :</span> 28 Rue de l'Église – 95170 Deuil-la-Barre
            </div>
            <div class="text">
              <span class="label">SIRET :</span> 804 180 792
            </div>
            <div class="text">
              <span class="label">Agrément :</span> 04_95_2023
            </div>
            <div class="text">
              <span class="label">Représenté par :</span> Barbara EZELIS, gérante
            </div>

            <div class="spacer"></div>
            <div class="text" style="font-weight: bold;">ET</div>
            <div class="spacer"></div>

            <div class="text">
              <span class="label">Société :</span> ${data.companyName}
            </div>
            <div class="text">
              <span class="label">Nom et Prénom :</span> ${data.fullName}
            </div>
            <div class="text">
              <span class="label">Adresse :</span> ${data.address}
            </div>
            ${
              data.addressDetails
                ? `
            <div class="text">
              <span class="label">Complément :</span> ${data.addressDetails}
            </div>
            `
                : ""
            }
            <div class="text">
              <span class="label">Code postal/Ville :</span> ${
                data.postalCode
              } ${data.city}
            </div>
            <div class="text">
              <span class="label">SIRET :</span> ${data.siretNumber}
            </div>
            <div class="text">
              <span class="label">Activité :</span> ${data.businessActivity}
            </div>
            <div class="text">
              <span class="label">Représenté par :</span> ${data.fullName}
            </div>
          </div>
        </div>
        <!-- Page 2 -->
        <div class="page">
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 1 – Objet du contrat</div>
            </div>
            <div class="text">
              Le présent contrat a pour objet de permettre au Domicilié d'établir son siège social 
              à l'adresse suivante :
            </div>
            <div class="text" style="font-weight: bold; text-align: center;">
              28 Rue de l'Église – 95170 Deuil-la Barre
            </div>
            <div class="text">
              Cette adresse sera utilisée par le Domicilié pour ses démarches administratives, 
              fiscales et commerciales, conformément à la réglementation en vigueur.
            </div>
            <div class="text">
              L'adresse de domiciliation devra donc devenir le siège social de l'entreprise. 
              Le Domicilié est habilité par la présente convention à recevoir à cette même adresse 
              le courrier qui lui est destiné.
            </div>
            <div class="text">
              Le présent engagement de domiciliation est fait aux conditions prévues par les 
              recommandations émises par la Chambre de Commerce et d'Industrie de Pontoise.
            </div>
          </div>

          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 2 – Obligations du Domiciliaire</div>
            </div>
            <div class="text">Le Domiciliaire s'engage à :</div>
            <div class="list">
              ${[
                "Mettre à disposition l'adresse mentionnée pour l'établissement du siège social",
                "Assurer la réception, conservation et mise à disposition du courrier",
                "Tenir à disposition les documents nécessaires en cas de contrôle",
              ]
                .map(
                  (item) => `
                <div class="list-item">
                  <div class="bullet">•</div>
                  <div class="list-text">${item}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- Page 3 -->
        <div class="page">
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 3 – Obligations du Domicilié</div>
            </div>
            <div class="text">Le Domicilié s'engage à :</div>
            <div class="list">
              ${[
                "Utiliser l'adresse exclusivement pour son activité professionnelle",
                "Communiquer toute modification administrative ou légale par écrit",
                "Fournir les documents requis lors de la signature du contrat",
              ]
                .map(
                  (item) => `
                <div class="list-item">
                  <div class="bullet">•</div>
                  <div class="list-text">${item}</div>
                </div>
              `
                )
                .join("")}
            </div>
            
            <div class="text" style="margin-top: 10px;">
              Documents requis :
            </div>
            <div class="list">
              ${[
                "Justificatif d'identité du gérant",
                "Justificatif de domicile personnel (moins de 6 mois)",
                "Adresse du comptable (si applicable)",
                "Extrait Kbis ou avis de situation Sirene",
                "Copie des statuts (pour les entreprises)",
                "Procuration postale pour recommandés",
              ]
                .map(
                  (item) => `
                <div class="list-item">
                  <div class="bullet">-</div>
                  <div class="list-text">${item}</div>
                </div>
              `
                )
                .join("")}
            </div>
            
            <div class="text" style="margin-top: 10px;">
              Le Domicilié certifie sur l'honneur l'exactitude des renseignements fournis.
            </div>
          </div>

          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 4 – Prestations de services</div>
            </div>
            <div class="text">
              En regard des sommes versées, le Domiciliaire s'engage à fournir :
            </div>
            <div class="list">
              ${[
                "Domiciliation commerciale à l'adresse indiquée",
                "Réception, tri et mise à disposition du courrier (garde ≤ 21 jours)",
                "Réexpédition hebdomadaire (surcoût si >14€ de timbres)",
              ]
                .map(
                  (item) => `
                <div class="list-item">
                  <div class="bullet">•</div>
                  <div class="list-text">${item}</div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="text">
              Le Domiciliaire met à disposition un bureau pour les réunions et consultation des documents.
            </div>
          </div>
        </div>

        <!-- Page 4 -->
        <div class="last-page">
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 5 – Durée du contrat</div>
            </div>
            <div class="text">
              Durée de 6 mois à compter du ${today}, renouvelable tacitement. 
              Résiliation avec préavis de 15 jours.
            </div>
          </div>

          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 6 – Tarifs et paiement</div>
            </div>
            <div class="text">
              Formule : <span class="highlight">${data.planName}</span> – 
              <span class="highlight">${data.planPrice} €/mois</span>.
            </div>
            <div class="text">
              Paiement par virement, espèces ou carte. Pénalités de 10% en cas de retard.
            </div>
          </div>

          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Article 7 – Résiliation</div>
            </div>
            <div class="list">
              ${[
                "Par le Domicilié : préavis de 15 jours",
                "Par le Domiciliaire en cas de non-respect ou non-paiement",
                "Obligation de changer l'adresse du siège social après résiliation",
              ]
                .map(
                  (item) => `
                <div class="list-item">
                  <div class="bullet">•</div>
                  <div class="list-text">${item}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Signatures</div>
            </div>
            <div class="text">
              Fait à Deuil-la-Barre, le ${today}
            </div>
            <div class="row">
              <div class="column">
                <div class="text" style="font-weight: bold;">Pour le Domiciliaire :</div>
                <div class="text">Nom : EZELIS</div>
                <div class="text">Fonction : Gérante</div>
                <div class="signature-line"></div>
                <div class="signature-label">Signature</div>
              </div>
              <div class="column">
                <div class="text" style="font-weight: bold;">Pour le Domicilié :</div>
                <div class="text">Nom : ${data.fullName}</div>
                <div class="signature-line"></div>
                <div class="signature-label">Signature (précédée de « Lu et approuvé »)</div>
              </div>
            </div>
          </div>

          <div class="footer">
            28 Rue de l'église, 95170 Deuil-la-Barre • lys-and-co.com • contact@lys-and-co.com<br/>
            Tél : 09.53.42.11.63 • Agrément : 04_95_2023 • © 2025 Lys & Co
          </div>
        </div>
      </body>
    </html>
  `;

  const handleGeneratePdf = async () => {
    try {
      const html = generateContractHtml();

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
        width: 595, // Format A4 en points
        height: 842,
      });

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
