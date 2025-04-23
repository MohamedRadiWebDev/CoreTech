import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button 
      onClick={toggleLanguage}
      className="transition-colors p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className="font-medium text-sm">
        {language === 'en' ? 'EN' : 'AR'}
      </span>
    </button>
  );
};

export default LanguageToggle;
