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
  body { 
    font-family: Arial, sans-serif; 
    padding: 24px; 
    color: #0F172A; 
    line-height: 1.5;
    font-size: 11.5px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .logo {
    width: 95px;
    height: 95px;
  }

  .address {
    font-size: 13px;
    color: #374151;
  }

  .title {
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .card {
    background-color: #F8FAFC;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    border: 1px solid #E5E7EB;
  }

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .section-marker {
    width: 4px;
    height: 20px;
    background-color: #4ADE80;
    margin-right: 8px;
    border-radius: 2px;
  }

  .section-title-text {
    font-size: 15px;
    font-weight: bold;
  }

  .label {
    font-weight: bold;
    margin-bottom: 6px;
  }

  .text {
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 1.5;
    color: #374151;
  }

  .strong {
    color: #111827;
    font-weight: bold;
  }

  .list {
    padding-left: 16px;
    margin-bottom: 12px;
  }

  .list-item {
    display: flex;
    margin-bottom: 4px;
    padding-left: 10px;
  }

  .bullet {
    width: 6px;
    margin-right: 6px;
  }

  .list-text {
    flex: 1;
    font-size: 12px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    gap: 16px;
  }

  .column {
    width: 48%;
  }

  .footer {
    margin-top: 30px;
    border-top: 1px solid #E5E7EB;
    padding-top: 8px;
    font-size: 9px;
    color: #6B7280;
    text-align: center;
  }

  .highlight {
    color: #16A34A;
    font-weight: bold;
  }

  .nondeco {
    text-decoration: none;
    color: #5cb9bc;
  }

  /* Pagination douce */
  .page {
    page-break-after: always;
  }

  .last-page {
    page-break-after: avoid;
  }
</style>

      </head>
      <body>
        <!-- Page 1 -->
        <div class="page">
          <!-- En-tête avec logo et adresse -->
          <div class="header">
            <img src="https://lys-and-co.com/wp-content/uploads/2025/03/logo-lysco-e1752521126604.jpg" class="logo" />
            <div class="address">
              <div class="label">Lys&amp;Co</div>
              28 Rue de l'église, 95170 Deuil-la-Barre
            </div>
          </div>

          <!-- Titre -->
          <h1 class="title">CONTRAT DE DOMICILIATION COMMERCIALE</h1>
          
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Entre les soussignés :</div>
            </div>

            <!-- Société de domiciliation -->
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
              <span class="label">Agrément préfectoral :</span> 04_95_2023
            </div>
            <div class="text">
              <span class="label">Représenté par :</span> Barbara EZELIS, gérante
            </div>

            <div class="text" style="margin-top: 12px;">
              <span class="label">ET</span>
            </div>

            <!-- Le domicilié -->
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
              <span class="label">Code postal / Ville :</span> ${
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
          <!-- Préambule -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Préambule</div>
            </div>
            <div class="text">
              Le Domiciliaire, en sa qualité d'entreprise agréée (n° préfectoral
              d'agrément : 04_95_2023) conformément aux dispositions du Code du
              commerce et aux articles R.123-167 à R.123-168, propose des services
              de domiciliation d'entreprise.
            </div>
            <div class="text">
              Le Domicilié souhaite bénéficier de ces services pour y établir son
              siège social.
            </div>
            <div class="text">
              Les parties conviennent de ce qui suit :
            </div>
          </div>

          <!-- Article 1 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 1 – Objet du contrat
              </div>
            </div>
            <div class="text">
              Le présent contrat a pour objet de permettre au Domicilié d'établir
              son siège social à l'adresse suivante :
            </div>
            <div class="text" style="font-weight: bold;">
              28 Rue de l'Église – 95170 Deuil-la Barre
            </div>
            <div class="text">
              Cette adresse sera utilisée par le Domicilié pour ses démarches
              administratives, fiscales et commerciales, conformément à la
              réglementation en vigueur.
            </div>
            <div class="text">
              L'adresse de domiciliation devra donc devenir le siège social de
              l'entreprise. Le Domicilié est habilité par la présente convention à
              recevoir à cette même adresse le courrier qui lui est destiné. Il
              pourra également utiliser cette adresse sur son papier à en-tête
              ainsi que sur ses documents commerciaux.
            </div>
            <div class="text">
              Le présent engagement de domiciliation est fait aux conditions
              prévues par les recommandations émises par la Chambre de Commerce et
              d'Industrie de Pontoise pour l'exercice de la domiciliation
              commerciale.
            </div>
          </div>

          <!-- Article 2 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 2 – Obligations du Domiciliaire
              </div>
            </div>
            <div class="text">Le Domiciliaire s'engage à :</div>
            <div class="list">
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Mettre à disposition l'adresse mentionnée à l'article 1 pour l'établissement du siège social du Domicilié.
                </div>
              </div>
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Assurer la réception, la conservation et, le cas échéant, la mise
                  à disposition ou l'envoi des courriers du Domicilié selon les
                  modalités définies à l'Article 4.
                </div>
              </div>
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Tenir à disposition les documents nécessaires en cas de contrôle
                  par les autorités compétentes.
                </div>
              </div>
            </div>
          </div>

          <!-- Article 3 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 3 – Obligations du Domicilié
              </div>
            </div>
            <div class="text">Le Domicilié s'engage à :</div>
            <div class="list">
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Utiliser l'adresse exclusivement pour son activité professionnelle.
                </div>
              </div>
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Communiquer au Domiciliaire toute modification concernant sa
                  situation administrative ou légale (changement de statut, de
                  gérant, cessation d'activité, etc.) et devra le notifier par écrit
                  au Domiciliaire et fournir tout nouveau document justificatif dès
                  que ce changement aura été pris en compte par l'organisme
                  d'immatriculation concerné.
                </div>
              </div>
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Fournir les documents requis lors de la signature du contrat, notamment :
                </div>
              </div>
              ${[
                "Un justificatif d'identité du gérant",
                "Un justificatif de domicile personnel du gérant (de moins de 6 mois)",
                "Adresse du comptable (si comptable)",
                "Un extrait Kbis pour les sociétés immatriculées (ou preuve de dépôt de dossier pour une immatriculation en cours) ou un avis de situation Sirene pour ceux qui n'ont pas de Kbis",
                "Une copie des statuts pour les entreprises",
                "La procuration postale (à faire à La Poste) qui autorise le Domiciliaire à signer les recommandés.",
              ]
                .map(
                  (item) => `
                <div class="list-item">
                  <div class="bullet">–</div>
                  <div class="list-text">${item}</div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="text">
              Le Domicilié certifie sur l'honneur l'exactitude des renseignements
              fournis au Domiciliaire et nécessaires à la conclusion du contrat.
              Le contrat est ferme et définitif à la signature et aucun
              remboursement partiel ou total ne pourra être revendiqué par le
              Domicilié pour quelque motif que ce soit.
            </div>
          </div>
        </div>

        <!-- Page 3 -->
        <div class="page">
          <!-- Article 4 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 4 – Description des prestations de services
              </div>
            </div>
            <div class="text">
              En regard des sommes versées à la conclusion du contrat, le Domiciliaire s'engage à fournir les prestations suivantes :
            </div>
            <div class="list">
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Domiciliation commerciale dans les locaux sis : 28 Rue de l'Église – 95170 Deuil-la-Barre
                </div>
              </div>
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Réception, tri et mise à disposition du courrier destiné au
                  Domicilié chaque jour ouvré pendant les horaires définis par le
                  Domiciliaire. La garde du courrier ne peut excéder 21 (vingt et
                  un) jours. Concernant l'option « Réexpédition », elle sera faite
                  une fois par semaine. Un surcoût sera demandé en cas de
                  dépassement de 14€ de timbres.
                </div>
              </div>
            </div>
            <div class="text">
              Le Domiciliataire met à la disposition du Domicilié un bureau
              permettant une réunion régulière des organes chargés de la
              direction, de l'administration ou de la surveillance de l'entreprise
              et l'installation des services nécessaires à la tenue, conservation
              et la consultation de leurs registres et documents prescrits par les
              lois et règlements (Décret N.85.1280du 5 décembre 1985, modifié par
              le décret N°2007.750 du 9 Mai)
            </div>
            <div class="text">
              En aucun cas, la location de bureau ne peut être utilisée par le
              Domicilié pour le recrutement de personnel. « France Travail » devra
              diriger les postulants à l'adresse d'activité du Domicilié et non à
              l'adresse de son siège social.
            </div>
            <div class="text">
              Le Domicilié doit donner procuration au Domiciliaire pour le retrait
              de lettres recommandées. Celles-ci seront acheminées par courrier
              ordinaire. Le Domiciliaire se dégage de toute responsabilité en cas
              de perte ou de transmission tardive de tous courriers.
            </div>
          </div>

          <!-- Article 5 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 5 – Durée du contrat
              </div>
            </div>
            <div class="text">
              Le présent contrat est conclu pour une durée de 6 mois, à compter du
              ${today}, renouvelable par tacite reconduction, sauf dénonciation par
              l'une des parties avec un préavis de 15 (quinze) jours.
            </div>
          </div>

          <!-- Article 6 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 6 – Tarifs et conditions de paiement
              </div>
            </div>
            <div class="text">
              Le montant de la domiciliation est fixé à <span class="highlight">${
                data.planPrice
              } €</span> par mois pour la formule « ${data.planName} ».
            </div>
            <div class="text">
              Les paiements devront être effectués par virement bancaire, espèce
              ou carte bleu.
            </div>
            <div class="text">
              En cas de retard de paiement, des pénalités équivalentes à 10%
              pourront être appliquées.
            </div>
          </div>

          <!-- Article 7 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 7 – Résiliation du contrat
              </div>
            </div>
            <div class="text">
              Le contrat pourra être résilié dans les conditions suivantes :
            </div>
            <div class="list">
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Par le Domicilié, avec un préavis de 15 jours.
                </div>
              </div>
              <div class="list-item">
                <div class="bullet">•</div>
                <div class="list-text">
                  Par le Domiciliaire, en cas de non-respect des obligations
                  contractuelles du Domicilié ou de non-paiement des sommes dues.
                </div>
              </div>
            </div>
            <div class="text">
              À l'expiration ou la résiliation du contrat, le Domicilié s'engage à
              procéder immédiatement au changement de son adresse de siège social.
            </div>
            <div class="text">
              Conformément au décret n°5.12.85, le Domiciliaire s'oblige à
              informer le greffier du Tribunal de Commerce, à l'expiration du
              contrat ou en cas de résiliation de celui-ci, de la cessation de la
              domiciliation de l'entreprise dans ses locaux. De plus, les ordres
              de réexpédition des sociétés domiciliées donnés à la poste, ne
              seront pas acceptés conformément à l'instruction du 26/01/2001.
            </div>
          </div>
        </div>

        <!-- Page 4 -->
        <div class="last-page">
          <!-- Article 8 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 8 – Responsabilité
              </div>
            </div>
            <div class="text">
              Le Domiciliaire ne pourra être tenu responsable des conséquences
              liées à un retard ou à une perte de courrier imputable à des tiers
              (ex : service postal) ou à un cas de force majeure.
            </div>
            <div class="text">
              Le Domicilié dégage le Domiciliataire de toute responsabilité quant
              à la transmission du courrier effectuée par la Poste ou par des
              entreprises assimilées ainsi que pour tout envoi mal libellé
              (adresse incomplète ou illisible, absence de cédex, ou tout autre
              nom, etc.) reçu à l'intention du Domicilié.
            </div>
            <div class="text">
              Étant précisé que l'autorisation que le Domiciliaire lui accorde ne
              saurait en aucun cas engager sa responsabilité, sous quelque forme
              que ce soit, présente et à venir.
            </div>
            <div class="text">
              Le Domiciliaire ne saurait être tenu en aucune façon responsable du
              rejet du Domicilié par les différents organismes administratifs
              nécessaires à son inscription ou pour tout autre motif et ne
              procédera donc à aucun remboursement.
            </div>
          </div>

          <!-- Article 9 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 9 – Confidentialité
              </div>
            </div>
            <div class="text">
              Les parties s'engagent à préserver la confidentialité des
              informations échangées dans le cadre du présent contrat.
            </div>
          </div>

          <!-- Article 10 -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Article 10 – Clauses résolutoires
              </div>
            </div>
            <div class="text">
              A défaut de paiement d'une seule facture à son échéance ou en cas
              d'inexécution d'une des clauses du présent engagement, la prestation
              de tous les services sera suspendue après mise en demeure. A défaut
              de règlement d'une ou plusieurs factures, rappelé par les soins du
              Domiciliaire, le courrier ne pourra être réexpédié au domicilié. Il
              sera tenu à sa disposition dans nos locaux comme stipulé à l'article
              4 du contrat, dans la limite de 21 (vingt et un) jours. Au-delà, il
              sera renvoyé à l'expéditeur.
            </div>
            <div class="text">
              Le contrat pourra être dénoncé de plein droit par le Domiciliaire
              sans notification en respectant un préavis de 30 jours et la carence
              du Domicilié sera signalée au greffe du Tribunal de Commerce ou au
              Registre des Métiers afin de procéder à la radiation d'office de
              l'entreprise.
            </div>
            <div class="text">
              En cas de contestation liée aux présentes, seul le Tribunal de
              Commerce concerné sera compétent.
            </div>
          </div>

          <!-- Litiges -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">
                Litiges
              </div>
            </div>
            <div class="text">
              En cas de litige relatif à l'exécution ou l'interprétation du
              présent contrat, les parties s'efforceront de le résoudre à
              l'amiable. À défaut, le litige sera soumis aux juridictions
              compétentes du ressort du siège du Domiciliaire.
            </div>
          </div>

          <!-- Signature -->
          <div class="card">
            <div class="section-title">
              <div class="section-marker"></div>
              <div class="section-title-text">Signature</div>
            </div>
            <div class="text">
              Fait en double exemplaire, à Deuil-la-Barre le ${today}
            </div>
            <div class="row">
              <div class="column">
                <div class="label">Pour le Domiciliaire :</div>
                <div class="text">Nom : EZELIS</div>
                <div class="text">Fonction : GÉRANTE</div>
                <div class="text">Signature :</div>
              </div>
              <div class="column">
                <div class="label">Pour le Domicilié :</div>
                <div class="text">Nom : ${data.fullName}</div>
                <div class="text">Signature :</div>
                <div style="font-style: italic; font-size: 10px;">
                  (Précédée de la mention « Lu et Approuvé »)
                </div>
              </div>
            </div>
          </div>

          <!-- Pied de page -->
          <div class="footer">
            28 Rue de l'église, 95170 Deuil-la-Barre<br/>
            lys-and-co.com – tél : 09.53.42.11.63 / 07.56.85.37.02 – contact@lys-and-co.com<br/>
            <span class="strong">Lien du site : <a href="https://lys-and-co.com" class="nondeco">lys-and-co.com</a></span> –– 
            <span class="strong">N° Agrément : 04_95_2023</span><br/>
            © 2025 Lys & Co – Tous droits réservés.
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
        width: 595, // Largeur A4 en points (21cm)
        height: 842, // Hauteur A4 en points (29.7cm)
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
