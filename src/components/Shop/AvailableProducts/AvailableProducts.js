import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import Product from './Product/Product';

/**
 * Commponent for the AvailableProducts
 */
const AvailableProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/articles/products.json');
      const data = await response.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} className="px-4 pb-4">
      {products.map((product) => (
        <Grid item xs={12} sm={6} lg={3} key={product.id}>
          <Product product={product}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvailableProducts;
