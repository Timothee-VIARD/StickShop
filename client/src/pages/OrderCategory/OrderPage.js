import { Box } from '@mui/material';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import Order from '../../components/Orders/Order/Order';

const OrderPage = () => {
  return (
    <Box className="flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <Order />
      <Footer />
    </Box>
  );
};

export default OrderPage;
