import { useLanguage } from "@/context/LanguageContext";
import enTranslations from "@/translations/en.json";
import arTranslations from "@/translations/ar.json";

type Translations = {
  [key: string]: string | { [key: string]: string | Translations };
};

/**
 * Custom hook for translating content based on the currently selected language
 */
export const useTranslation = () => {
  const { language } = useLanguage();
  
  // Load the appropriate translation file based on the selected language
  const translations = language === 'ar' ? arTranslations : enTranslations;
  
  /**
   * Get translated text for a given key
   * Supports nested keys with dot notation (e.g., "home.title")
   */
  const t = (key: string, params?: Record<string, string>): string => {
    try {
      // Split the key by dots to handle nested objects
      const keys = key.split('.');
      let value: any = translations;
      
      // Navigate through the nested structure
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key; // Return the key itself as fallback
        }
      }
      
      // If the final value is not a string, return the key
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return key;
      }
      
      // Replace any parameters in the string if provided
      if (params && Object.keys(params).length > 0) {
        let result = value;
        for (const [paramKey, paramValue] of Object.entries(params)) {
          result = result.replace(new RegExp(`{${paramKey}}`, 'g'), paramValue);
        }
        return result;
      }
      
      return value;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key; // Return the key itself as fallback
    }
  };
  
  return { t };
};