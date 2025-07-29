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
          /* Reset complet */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          /* Nouvelle structure de page */
          body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
          }

          .page-container {
            width: 21cm;
            min-height: 29.7cm;
            margin: 0 auto;
            padding: 2cm;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            position: relative;
          }

          .page-break {
            page-break-after: always;
            height: 0;
          }

          /* En-tête moderne */
          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #1d5759ff;
          }

          .logo-title-container {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            width: 100%;
          }

          .logo {
            width: 80px;
            height: 80px;
            margin-right: 20px;
          }

          .header-title {
            flex: 1;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            color: #2c3e50;
            text-transform: uppercase;
          }

          .header-subtitle {
            font-size: 14px;
            color: #5c6262ff;
            text-align: center;
            margin-top: 5px;
          }

          /* Contenu principal */
          .contract-content {
            margin-top: 20px;
          }

          /* Sections modernes */
          .contract-section {
            margin-bottom: 30px;
            position: relative;
          }

          .section-header {
            background-color: #1d5759ff;
            color: white;
            padding: 8px 15px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 4px 4px 0 0;
            margin-bottom: 15px;
          }

          .section-body {
            padding: 0 15px;
          }

          /* Parties du contrat */
          .parties-container {
            display: flex;
            justify-content: space-between;
            margin: 25px 0;
          }

          .party {
            width: 48%;
            padding: 15px;
            background-color: #f1f5f9;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }

          .party-title {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
          }

          /* Détails du contrat */
          .contract-details {
            margin: 20px 0;
          }

          .detail-item {
            margin-bottom: 8px;
            display: flex;
          }

          .detail-label {
            font-weight: 600;
            min-width: 150px;
            color: #1d5759ff;
          }

          .detail-value {
            flex: 1;
          }

          /* Articles */
          .article {
            margin-bottom: 25px;
            border-left: 3px solid #1d5759ff;
            padding-left: 15px;
          }

          .article-title {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 15px;
          }

          .article-content {
            text-align: justify;
          }

          /* Listes modernes */
          .modern-list {
            list-style-type: none;
            margin: 10px 0;
          }

          .modern-list-item {
            padding: 5px 0;
            display: flex;
            align-items: flex-start;
          }

          .list-bullet {
            color: #1d5759ff;
            margin-right: 8px;
            font-weight: bold;
          }

          /* Signatures */
          .signatures-container {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
          }

          .signature-block {
            width: 45%;
            text-align: center;
          }

          .signature-line {
            height: 1px;
            background-color: #333;
            margin: 20px auto;
            width: 80%;
          }

          .signature-label {
            font-style: italic;
            color: #5e6566ff;
            font-size: 12px;
          }

          /* Pied de page */
          .footer {
            position: absolute;
            bottom: 20px;
            left: 2cm;
            right: 2cm;
            font-size: 10px;
            color: #3b3d3dff;
            text-align: center;
            padding-top: 10px;
            border-top: 1px solid #ddd;
          }
            .black{
            color: #3b3d3dff;
            }

          /* Éléments visuels */
          .highlight-box {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #1d5759ff;
          }

          .text-center {
            text-align: center;
          }

          .text-important {
            color: #1d5759ff;
            font-weight: 600;
          }

          .spacer {
            height: 15px;
          }
        </style>
      </head>
      <body>
        <!-- Page 1 -->
        <div class="page-container">
          <div class="header">
            <div class="logo-title-container">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/logo-lysco-e1752521126604.jpg" class="logo" />
              <div class="header-title">Contrat de Domiciliation Commerciale</div>
            </div>
            <div class="header-subtitle">Conforme aux dispositions légales en vigueur</div>
          </div>

          <div class="parties-container">
            <div class="party">
              <div class="party-title">DOMICILIAIRE</div>
              <div class="detail-item">
                <div class="detail-label">Nom :</div>
                <div class="detail-value">Europe Domiciliation</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Adresse :</div>
                <div class="detail-value">28 Rue de l'Église – 95170 Deuil-la-Barre</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">SIRET :</div>
                <div class="detail-value">804 180 792</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Agrément :</div>
                <div class="detail-value">04_95_2023</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Représenté par :</div>
                <div class="detail-value">Barbara EZELIS, gérante</div>
              </div>
            </div>

            <div class="party">
              <div class="party-title">DOMICILIÉ</div>
              <div class="detail-item">
                <div class="detail-label">Société :</div>
                <div class="detail-value">${data.companyName}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Nom et Prénom :</div>
                <div class="detail-value">${data.fullName}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Adresse :</div>
                <div class="detail-value">${data.address}</div>
              </div>
              ${
                data.addressDetails
                  ? `<div class="detail-item">
                     <div class="detail-label">Complément :</div>
                     <div class="detail-value">${data.addressDetails}</div>
                   </div>`
                  : ""
              }
              <div class="detail-item">
                <div class="detail-label">Code postal/Ville :</div>
                <div class="detail-value">${data.postalCode} ${data.city}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">SIRET :</div>
                <div class="detail-value">${data.siretNumber}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Activité :</div>
                <div class="detail-value">${data.businessActivity}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Représenté par :</div>
                <div class="detail-value">${data.fullName}</div>
              </div>
            </div>
          </div>

          <div class="spacer"></div>

          <div class="contract-section">
            <div class="section-header">PRÉAMBULE</div>
            <div class="section-body">
              <p>Le présent contrat est établi entre les parties ci-dessus désignées en date du ${today}.</p>
              <p>Il a pour objet de définir les conditions dans lesquelles le Domiciliaire met à disposition 
              son adresse commerciale au Domicilié pour l'établissement de son siège social.</p>
            </div>
          </div>

          <div class="highlight-box">
            <div class="text-center text-important">Adresse de domiciliation :</div>
            <div class="text-center" style="font-size: 16px; font-weight: 600; margin-top: 5px;">
              28 Rue de l'Église – 95170 Deuil-la Barre
            </div>
          </div>
        </div>

        <!-- Page 2 -->
        <div class="page-break"></div>
        <div class="page-container">
          <div class="contract-section">
            <div class="section-header">ARTICLE 1 - OBJET DU CONTRAT</div>
            <div class="section-body">
              <div class="article">
                <p>Le présent contrat a pour objet de permettre au Domicilié d'établir son siège social 
                à l'adresse mentionnée en préambule.</p>
                <p>Cette adresse sera utilisée par le Domicilié pour ses démarches administratives, 
                fiscales et commerciales, conformément à la réglementation en vigueur.</p>
              </div>

              <div class="article">
                <p>L'adresse de domiciliation devra donc devenir le siège social de l'entreprise. 
                Le Domicilié est habilité par la présente convention à recevoir à cette même adresse 
                le courrier qui lui est destiné.</p>
              </div>

              <div class="article">
                <p>Le présent engagement de domiciliation est fait aux conditions prévues par les 
                recommandations émises par la Chambre de Commerce et d'Industrie de Pontoise.</p>
              </div>
            </div>
          </div>

          <div class="contract-section">
            <div class="section-header">ARTICLE 2 - OBLIGATIONS DU DOMICILIAIRE</div>
            <div class="section-body">
              <p>Le Domiciliaire s'engage à :</p>
              <ul class="modern-list">
                ${[
                  "Mettre à disposition l'adresse mentionnée pour l'établissement du siège social",
                  "Assurer la réception, conservation et mise à disposition du courrier",
                  "Tenir à disposition les documents nécessaires en cas de contrôle",
                  "Informer le Domicilié de toute modification concernant l'agrément de domiciliation",
                ]
                  .map(
                    (item) => `
                  <li class="modern-list-item">
                    <span class="list-bullet">•</span>
                    <span>${item}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Page 3 -->
        <div class="page-break"></div>
        <div class="page-container">
          <div class="contract-section">
            <div class="section-header">ARTICLE 3 - OBLIGATIONS DU DOMICILIÉ</div>
            <div class="section-body">
              <p>Le Domicilié s'engage à :</p>
              <ul class="modern-list">
                ${[
                  "Utiliser l'adresse exclusivement pour son activité professionnelle",
                  "Communiquer toute modification administrative ou légale par écrit",
                  "Fournir les documents requis lors de la signature du contrat",
                  "Payer les frais de domiciliation dans les délais impartis",
                  "Respecter les règles de confidentialité et d'éthique professionnelle",
                ]
                  .map(
                    (item) => `
                  <li class="modern-list-item">
                    <span class="list-bullet">•</span>
                    <span>${item}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>

              <div class="spacer"></div>

              <div class="article-title">DOCUMENTS REQUIS :</div>
              <ul class="modern-list">
                ${[
                  "Justificatif d'identité du gérant (copie)",
                  "Justificatif de domicile personnel (moins de 6 mois)",
                  "Adresse du comptable (si applicable)",
                  "Extrait Kbis ou avis de situation Sirene",
                  "Copie des statuts (pour les entreprises)",
                  "Procuration postale pour recommandés",
                ]
                  .map(
                    (item) => `
                  <li class="modern-list-item">
                    <span class="list-bullet">-</span>
                    <span>${item}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>

              <div class="spacer"></div>
              <p>Le Domicilié certifie sur l'honneur l'exactitude des renseignements fournis.</p>
            </div>
          </div>

          <div class="contract-section">
            <div class="section-header">ARTICLE 4 - PRESTATIONS DE SERVICES</div>
            <div class="section-body">
              <p>En regard des sommes versées, le Domiciliaire s'engage à fournir :</p>
              <ul class="modern-list">
                ${[
                  "Domiciliation commerciale à l'adresse indiquée",
                  "Réception, tri et mise à disposition du courrier (garde ≤ 21 jours)",
                  "Réexpédition hebdomadaire (surcoût si >14€ de timbres)",
                  "Accès occasionnel à un bureau pour réunions",
                  "Consultation des documents sur rendez-vous",
                ]
                  .map(
                    (item) => `
                  <li class="modern-list-item">
                    <span class="list-bullet">•</span>
                    <span>${item}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Page 4 -->
        <div class="page-break"></div>
        <div class="page-container">
          <div class="contract-section">
            <div class="section-header">ARTICLE 5 - DURÉE DU CONTRAT</div>
            <div class="section-body">
              <p>Le présent contrat prend effet à compter du ${today} pour une durée initiale de 6 mois.</p>
              <p>Il est renouvelable tacitement par périodes successives de 6 mois, sauf résiliation par l'une 
              ou l'autre des parties avec un préavis de 15 jours avant la date d'échéance.</p>
            </div>
          </div>

          <div class="contract-section">
            <div class="section-header">ARTICLE 6 - TARIFS ET PAIEMENT</div>
            <div class="section-body">
              <div class="highlight-box">
                <div class="detail-item">
                  <div class="detail-label">Formule choisie :</div>
                  <div class="detail-value text-important">${
                    data.planName
                  }</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Montant mensuel :</div>
                  <div class="detail-value text-important">${
                    data.planPrice
                  } € HT</div>
                </div>
              </div>
              <p>Le paiement s'effectue par virement bancaire, espèces ou carte bancaire.</p>
              <p>Tout retard de paiement entraînera l'application de pénalités de 10% du montant dû.</p>
            </div>
          </div>

          <div class="contract-section">
            <div class="section-header">ARTICLE 7 - RÉSILIATION</div>
            <div class="section-body">
              <p>Le contrat peut être résilié dans les conditions suivantes :</p>
              <ul class="modern-list">
                ${[
                  "Par le Domicilié : par écrit avec un préavis de 15 jours",
                  "Par le Domiciliaire en cas de non-respect des obligations ou de non-paiement",
                  "De plein droit en cas de cessation d'activité de l'une des parties",
                ]
                  .map(
                    (item) => `
                  <li class="modern-list-item">
                    <span class="list-bullet">•</span>
                    <span>${item}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
              <p>En cas de résiliation, le Domicilié s'engage à modifier l'adresse de son siège social 
              dans un délai de 15 jours.</p>
            </div>
          </div>
        </div>

          <div class="page-break"></div>
        <div class="page-container">
          <div class="contract-section">
            <div class="section-header">SIGNATURES</div>
            <div class="section-body">
              <p>Fait à Deuil-la-Barre, le ${today}</p>
              
              <div class="signatures-container">
                <div class="signature-block">
                  <div class="text-important">Pour le Domiciliaire :</div>
                  <p>Nom : EZELIS</p>
                  <p>Fonction : Gérante</p>
                  <div class="signature-line"></div>
                  <div class="signature-label">Signature</div>
                </div>
                
                <div class="signature-block">
                  <div class="text-important">Pour le Domicilié :</div>
                  <p>Nom : ${data.fullName}</p>
                  <p>Fonction : Représentant légal</p>
                  <div class="signature-line"></div>
                  <div class="signature-label">Signature (précédée de « Lu et approuvé »)</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            28 Rue de l'église, 95170 Deuil-la-Barre • <a href="lys-and-co.com" class="black">lys-and-co.com</a> • contact@lys-and-co.com<br/>
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
        width: 595,
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
      <Button
        title="📄 Générer le contrat PDF"
        onPress={handleGeneratePdf}
        color="#1d5759ff"
      />
    </View>
  );
};

export default ContractGenerator;
