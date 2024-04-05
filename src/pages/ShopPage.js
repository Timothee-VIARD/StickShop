import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Shop from '../components/Shop/Shop';
import { Box } from '@mui/material';

const ShopPage = () => {
  return (
    <Box className="flex flex-col justify-between h-screen">
      <Banner />
      <Shop />
      <Footer />
    </Box>
  );
};

export default ShopPage;
