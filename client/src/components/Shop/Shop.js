import AvailableProducts from './AvailableProducts/AvailableProducts';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Commponent for the main
 */
const Shop = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Typography variant="h4" className="pt-14 flex-grow text-center">
        {t('shop.title')}
      </Typography>
      <AvailableProducts />
    </main>
  );
};

export default Shop;
