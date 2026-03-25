import { useTranslation } from '@/hooks/useTranslation';

const SkipLink = () => {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 z-50 rounded bg-primary px-4 py-2 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
    >
      {t('common.skip_to_content')}
    </a>
  );
};

export default SkipLink;
