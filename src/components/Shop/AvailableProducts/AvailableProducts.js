import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import Product from './Product/Product';

/**
 * Commponent for the AvailableProducts
 */
const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/articles/products.json');
      const data = await response.json();
      setProducts(data.products);
      setChecked(true);
    };
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} className="px-4 pb-4">
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} lg={3} key={product.id}>
          <Grow in={checked} timeout={index * 100}>
            <Box>
              <Product product={product} />
            </Box>
          </Grow>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvailableProducts;
