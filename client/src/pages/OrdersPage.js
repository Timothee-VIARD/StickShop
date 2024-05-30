import { Box } from '@mui/material';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { OrdersVisualisation } from '../components/OrdersVisualisation/OrdersVisualisation';

const OrdersPage = () => {
  return (
    <Box className="flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <OrdersVisualisation />
      <Footer />
    </Box>
  );
};

export default OrdersPage;
