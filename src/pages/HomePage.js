import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  document.title = `${t('global.title')} - ${t('home.title')}`;

  return (
    <Box className="flex flex-col justify-between h-screen">
      <Banner />
      <Box className="flex flex-col items-center justify-center h-full">
        <Typography variant="h1">{t('home.welcome')}</Typography>
        <Typography variant="h5">{t('home.description')}</Typography>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
