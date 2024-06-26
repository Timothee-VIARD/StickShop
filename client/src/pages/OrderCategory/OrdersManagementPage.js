import { Box } from '@mui/material';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import { OrdersManagement } from '../../components/Orders/OrdersManagement/OrdersManagement';

const OrdersManagementPage = () => {
  return (
    <Box className="flex flex-col justify-between h-[100vh]">
      <Box className="pt-14">
        <Banner />
      </Box>
      <OrdersManagement />
      <Footer />
    </Box>
  );
};

export default OrdersManagementPage;
