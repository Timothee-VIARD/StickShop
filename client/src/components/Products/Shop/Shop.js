import AvailableProducts from './AvailableProducts/AvailableProducts';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Commponent for the main
 */
const Shop = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow flex flex-col">
      <Typography variant="h4" className="pt-14 text-center">
        {t('shop.title')}
      </Typography>
      <AvailableProducts />
    </main>
  );
};

export default Shop;
