import { useLanguage } from "@/context/LanguageContext";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  const keyboardRef = useKeyboardNavigation({
    onEnter: toggleLanguage
  });
  
  return (
    <button 
      ref={keyboardRef as React.RefObject<HTMLButtonElement>}
      onClick={toggleLanguage}
      className="transition-colors p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className="font-medium text-sm">
        {language === 'en' ? 'EN' : 'AR'}
      </span>
    </button>
  );
};

export default LanguageToggle;
