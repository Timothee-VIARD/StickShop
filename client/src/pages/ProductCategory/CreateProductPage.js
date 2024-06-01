import { Box } from '@mui/material';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import { CreateProduct } from '../../components/Products/ProductsManagement/CreateProduct/CreateProduct';

export const CreateProductPage = () => {
  return (
    <Box className="flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <CreateProduct />
      <Footer />
    </Box>
  );
};
