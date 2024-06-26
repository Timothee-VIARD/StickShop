import React from 'react';
import { Box } from '@mui/material';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import { ProductsManagement } from '../../components/Products/ProductsManagement/ProductsManagement';

export const ProductsManagementPage = () => {
  return (
    <Box className="flex flex-col justify-between h-[100vh]">
      <Box className="pt-14">
        <Banner />
      </Box>
      <ProductsManagement />
      <Footer />
    </Box>
  );
};
