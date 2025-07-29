// /components/ContractGenerator.tsx

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Alert, Button } from 'react-native';

interface ContractGeneratorProps {
  clientInfo: {
    firstName: string;
    lastName: string;
    companyName: string;
    businessActivity: string;
    siretNumber: string;
    address: string;
    city: string;
    postalCode: string;
  };
  planDetails: {
    name: string;
    price: number;
  };
}

const ContractGenerator: React.FC<ContractGeneratorProps> = ({
  clientInfo,
  planDetails,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        'https://mon-backend-node.vercel.app/api/generate-contract',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: clientInfo.companyName,
            fullName: `${clientInfo.firstName} ${clientInfo.lastName}`,
            address: clientInfo.address,
            city: clientInfo.city,
            postalCode: clientInfo.postalCode,
            siretNumber: clientInfo.siretNumber,
            businessActivity: clientInfo.businessActivity,
            planPrice: planDetails.price,
            planName: planDetails.name,
            date: new Date().toLocaleDateString('fr-FR'),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du contrat');
      }

      const { base64 } = await response.json();
      const fileUri = FileSystem.cacheDirectory + 'contract.pdf';

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Télécharger votre contrat',
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger le contrat.');
      console.error(error);
    }
  };

  return <Button title="Télécharger votre contrat" onPress={handleDownload} />;
};

export default ContractGenerator;
