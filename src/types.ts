export type OccasionType =
  | 'birthday'
  | 'mothers-day'
  | 'ramadan'
  | 'eid-fitr'
  | 'eid-adha'
  | 'christmas'
  | 'graduation'
  | 'wedding'
  | 'new-baby'
  | 'love'
  | 'sympathy';

export interface Gift {
  id: string;
  occasion: OccasionType;
  message: string;
  sender_name: string;
  image_url: string;
  created_at: string;
}

export interface OccasionTheme {
  name: {
    en: string;
    ar: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  animation: string;
  decorations: string[];
}

export type Language = 'en' | 'ar' | 'franco' | 'fr' | 'es';

export type ArabicDialect =
  | 'msa'
  | 'egyptian'
  | 'saudi'
  | 'emirati'
  | 'kuwaiti'
  | 'yemeni'
  | 'jordanian'
  | 'palestinian'
  | 'lebanese'
  | 'syrian'
  | 'moroccan'
  | 'algerian'
  | 'tunisian'
  | 'sudanese';
