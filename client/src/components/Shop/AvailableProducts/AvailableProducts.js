import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Skeleton } from '@mui/material';
import Product from './Product/Product';

/**
 * Commponent for the AvailableProducts
 */
const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setChecked(true);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
  }, []);

  return (
    <Grid container spacing={2} className="px-4 pb-4">
      {products.length !== 0 ? (
        products.map((product, index) => (
          <Grid item xs={12} sm={6} lg={3} key={product.id}>
            <Grow in={checked} timeout={index * 100}>
              <Box>
                <Product product={product} />
              </Box>
            </Grow>
          </Grid>
        ))
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </Grid>
  );
};

export default AvailableProducts;
