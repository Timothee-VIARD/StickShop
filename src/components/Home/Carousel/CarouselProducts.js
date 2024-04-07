import Carousel from 'react-material-ui-carousel';
import { Box, CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const CarouselProducts = () => {
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
    <Carousel
      navButtonsProps={{
        style: {
          backgroundColor: 'white',
          color: 'black'
        }
      }}
    >
      {products.map((product, i) => (
        <Box key={i}>
          <CardMedia sx={{ height: 450 }} image={product.image} title={product.name} className="rounded-t-2xl" />
        </Box>
      ))}
    </Carousel>
  );
};
