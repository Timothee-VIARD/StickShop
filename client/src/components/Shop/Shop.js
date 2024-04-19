import AvailableProducts from './AvailableProducts/AvailableProducts';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Commponent for the main
 */
const Shop = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Typography variant="h4" className="pt-14 pb-2 flex-grow text-center">
        {t('shop.title')}
      </Typography>
      <Grid container spacing={2} className="px-16 pb-4">
        <Grid item xs={6} sm={12} lg={12}>
          <AvailableProducts />
        </Grid>
      </Grid>
    </main>
  );
};

export default Shop;
