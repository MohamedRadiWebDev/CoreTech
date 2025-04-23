import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

type LanguageType = 'en' | 'ar';

interface LanguageContextType {
  language: LanguageType;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check local storage for saved language preference, or use browser language as default
  const [language, setInternalLanguage] = useState<LanguageType>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      if (savedLang === 'en' || savedLang === 'ar') {
        return savedLang as LanguageType;
      }
      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'ar' ? 'ar' : 'en';
    }
    return 'en';
  });
  
  // Determine if the current language is RTL
  const isRTL = language === 'ar';

  // Toggle between English and Arabic
  const toggleLanguage = () => {
    setInternalLanguage(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };
  
  // Wrapper for setLanguage
  const setLanguage = (lang: LanguageType) => {
    setInternalLanguage(lang);
  };

  // Save language preference to local storage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set RTL attribute on document body
    document.body.setAttribute('data-rtl', isRTL.toString());
    // Set lang attribute on html element
    document.documentElement.lang = language;
    // Set dir attribute on html element
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
