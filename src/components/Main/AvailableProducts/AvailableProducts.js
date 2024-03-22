import React from "react";
import {Grid} from "@mui/material";
import Product from "./Product/Product";

/**
 * Commponent for the Menu
 */
const AvailableProducts = () => {

  const products = require('../../../products.json').products;

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
