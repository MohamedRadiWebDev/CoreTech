import { useLanguage } from '@/context/LanguageContext';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const keyboardRef = useKeyboardNavigation({ onEnter: toggleLanguage });
  const label = language === 'en' ? t('common.toggles.switch_to_arabic') : t('common.toggles.switch_to_english');

  return (
    <button
      ref={keyboardRef as React.RefObject<HTMLButtonElement>}
      onClick={toggleLanguage}
      className="rounded-md p-2 text-gray-500 transition-colors hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-gray-400 dark:hover:text-white"
      aria-label={label}
      title={label}
    >
      <span className="font-medium text-sm">{language === 'en' ? 'EN' : 'AR'}</span>
    </button>
  );
};

export default LanguageToggle;
