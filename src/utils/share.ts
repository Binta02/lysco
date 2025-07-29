// utils/share.ts
import { Share } from '@capacitor/share';

export const shareContent = async (options: {
  title?: string;
  text: string;
  url?: string;
  dialogTitle?: string;
}) => {
  try {
    await Share.share({
      title: options.title,
      text: options.text,
      url: options.url,
      dialogTitle: options.dialogTitle,
    });
  } catch (error) {
    console.error('Erreur partage:', error);
  }
};
