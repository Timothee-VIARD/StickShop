import { Box } from '@mui/material';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { OrdersVisualisation } from '../components/OrdersVisualisation/OrdersVisualisation';

const OrdersPage = () => {
  return (
    <Box className="flex flex-col justify-between h-[100vh]">
      <Box className="pt-14">
        <Banner />
      </Box>
      <OrdersVisualisation className="flex-grow" />
      <Footer />
    </Box>
  );
};

export default OrdersPage;
