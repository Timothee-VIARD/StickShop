import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";

import {CartContext} from "../../../context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next";

/**
 * Commponent for the shopping cart
 */
const ShoppingCart = () => {
  const {t} = useTranslation();

  const {cart, removeFromCart, resetCart} = useContext(CartContext);
  const [total, setTotal] = useState(0);

  const groubBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  }

  useEffect(() => {
    let newTotal = cart.reduce((acc, product) => acc + product.price, 0);
    setTotal(newTotal);
    document.title = `${t('shop.shopCart.title')} - ${newTotal} €`;
  }, [cart]);

  const productsGrouped = groubBy(cart, 'id');

  return (
    <Box className="mt-4 mb-4 ml-4 border-2 p-3 rounded-2xl">
      <Stack spacing={2}>
        <Box className="flex flex-row items-center gap-3">
          <ShoppingCartIcon fontSize="large"/>
          <Typography variant="h4">
            {t('shop.shopCart.title')}
          </Typography>
        </Box>
        <Stack spacing={2}>
          {Object.entries(productsGrouped).map(([id, products], index) => (
            <Box key={index} className="flex flex-row items-center justify-between">
              <div>
                <Typography variant="p" display="block">
                  {`● ${products[0].name}`}
                </Typography>
                <Typography variant="p" display="block">
                  {`${products.length} x ${products[0].price} €`}
                </Typography>
              </div>
              <Button onClick={() => removeFromCart(products[0].id)} className="rounded-2xl">
                <DeleteIcon color="inherit" className="text-black"/>
              </Button>
            </Box>
          ))}
        </Stack>
        <Typography variant="h6">
          {`${t('shop.shopCart.total')} : ${total} €`}
        </Typography>
        <Button onClick={resetCart} color="inherit" className="rounded-2xl">
          {t('shop.shopCart.clear')}
        </Button>
      </Stack>
    </Box>
  );
};

export default ShoppingCart;
