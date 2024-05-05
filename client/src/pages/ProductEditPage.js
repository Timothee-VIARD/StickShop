import { Box } from '@mui/material';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { ProductEdit } from '../components/ProductsManagement/ProductEdit/ProductEdit';

export const ProductEditPage = () => {
  return (
    <Box className="flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <ProductEdit />
      <Footer />
    </Box>
  );
};
