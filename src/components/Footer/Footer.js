import { Typography } from '@mui/material';
import '../../style/global.css';
import { useTranslation } from 'react-i18next';

/**
 * Commponent for the footer
 */
const Banner = () => {
  const { t } = useTranslation();

  return (
    <footer className="mainColor p-2 px-8 text-left flex gap-5">
      <Typography fontWeight="bold" variant="h6" className="flex items-center">
        {t('global.title')}
      </Typography>
    </footer>
  );
};

export default Banner;
