import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Home } from '../components/Home/Home';
import '../style/global.css';

const HomePage = () => {
  const { t } = useTranslation();
  const { getTotalNumber, resetDocumentTitle } = useContext(CartContext);

  useEffect(() => {
    if (getTotalNumber() > 0) {
      resetDocumentTitle();
    } else {
      document.title = `${t('global.title')} - ${t('home.title')}`;
    }
  }, []);

  return (
    <Box className="flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <Home />
      <Footer />
    </Box>
  );
};

export default HomePage;
