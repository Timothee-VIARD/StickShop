import React, {useContext} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {CartContext} from "../../context/CartContext";

/**
 * Commponent for the Menu
 */
const AvailableProducts = () => {

  const products = require('../../products.json').products;
  const {addToCart} = useContext(CartContext);

  return (
    <Grid container spacing={2} className="px-4 pb-4">
      {products.map((product) => (
        <Grid item xs={12} sm={6} lg={3} key={product.id}>
          <Card className="rounded-2xl">
            <CardMedia
              sx={{height: 140}}
              image={product.image}
              title={product.name}
            />
            <CardContent className="bg-amber-100 bg-opacity-50">
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {`Prix : ${product.price} €`}
              </Typography>
            </CardContent>
            <CardActions className="bg-amber-100 bg-opacity-50">
              <Button size="small" color="inherit" className="text-black gap-3 rounded-2xl" onClick={() => addToCart(product)}>
                <ShoppingCartIcon/>
                <Typography variant="p">
                  Ajouter au panier
                </Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvailableProducts;
