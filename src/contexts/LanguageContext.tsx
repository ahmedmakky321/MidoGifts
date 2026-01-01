import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, ArabicDialect } from '../types';
import { translations } from '../config/translations';

interface LanguageContextType {
  language: Language;
  dialect: ArabicDialect;
  setLanguage: (lang: Language) => void;
  setDialect: (dialect: ArabicDialect) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('midogifts-language');
    return (saved as Language) || 'en';
  });

  const [dialect, setDialect] = useState<ArabicDialect>(() => {
    const saved = localStorage.getItem('midogifts-dialect');
    return (saved as ArabicDialect) || 'msa';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('midogifts-language', language);
    localStorage.setItem('midogifts-dialect', dialect);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, dialect, isRTL]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, dialect, setLanguage, setDialect, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
