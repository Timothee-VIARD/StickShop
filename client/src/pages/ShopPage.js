import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Shop from '../components/Shop/Shop';
import { Box } from '@mui/material';
import '../style/global.css';

export const ShopPage = () => {
  return (
    <Box className="flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <Shop />
      <Footer />
    </Box>
  );
};
