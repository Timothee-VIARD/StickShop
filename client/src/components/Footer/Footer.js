import { Button, Typography } from '@mui/material';
import '../../style/global.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Commponent for the footer
 */
const Banner = () => {
  const { t } = useTranslation();

  return (
    <footer className="mainColor p-2 px-8 flex justify-between">
      <Button size="small" className="flex items-center" component={Link} to="/">
        <Typography fontWeight="bold" variant="h6" className="capitalize">
          {t('global.title')}
        </Typography>
      </Button>
      <Button size="small" className="flex items-center" component={Link} to="/contact">
        <Typography fontWeight="bold" variant="h6" className="capitalize">
          {t('contact.title')}
        </Typography>
      </Button>
    </footer>
  );
};

export default Banner;
