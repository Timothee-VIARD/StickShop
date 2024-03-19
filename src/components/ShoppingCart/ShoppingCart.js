import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";

import {CartContext} from "../../context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Commponent for the shopping cart
 */
const ShoppingCart = () => {
  const {cart, removeFromCart, resetCart} = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, product) => acc + product.price, 0));
    console.log(cart);
  }, [cart]);

  return (
    <Box className="mt-4 mb-4 ml-4 border-2 p-3 rounded-2xl">
      <Stack spacing={2}>
        <Box className="flex flex-row items-center gap-3">
          <ShoppingCartIcon fontSize="large"/>
          <Typography variant="h4">
            Panier
          </Typography>
        </Box>
        <Stack>
          {cart.map((product, index) => (
            <Box key={index} className="flex flex-row items-center">
              {`● ${product.name} - ${product.price} €`}
              <Button onClick={() => removeFromCart(product.id)} className="rounded-2xl">
                <DeleteIcon color="inherit" className="text-black"/>
              </Button>
            </Box>
          ))}
        </Stack>
        <Typography variant="h6">
          Total : {total} €
        </Typography>
        <Button onClick={resetCart} className="rounded-2xl">
          Vider le panier
        </Button>
      </Stack>
    </Box>
  );
};

export default ShoppingCart;
