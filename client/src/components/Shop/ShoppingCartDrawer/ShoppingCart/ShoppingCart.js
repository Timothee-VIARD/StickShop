import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { CartContext } from '../../../../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';
import { Add, Close, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { numberRound } from '../../../../utils/global/Numbers';
import '../../../../style/global.css';

/**
 * Commponent for the shopping cart
 */
const ShoppingCart = ({ closeDrawer }) => {
  const { t } = useTranslation();
  const { cart, removeFromCart, resetCart, addToCart, getTotalNumber, getTotalPrice, resetDocumentTitle } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);

  const groubBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  useEffect(() => {
    let totalPrice = getTotalPrice();
    setTotal(totalPrice);
    resetDocumentTitle();
  }, [cart, t]);

  const productsGrouped = groubBy(cart, 'id');

  const addProduct = (product) => {
    addToCart(product);
  };

  const removeProduct = (product) => {
    removeFromCart(product.id);
  };

  return (
    <Box className="backgroundColor p-7 z-30 w-[430px] max-w-[430px] overflow-auto h-full">
      <Stack spacing={4}>
        <Stack direction="row" className="items-center justify-between">
          <Stack direction="row" className="items-center gap-3">
            {getTotalNumber() > 0 ? <ShoppingCartIcon fontSize="large" /> : <ShoppingCartOutlined fontSize="large" />}
            <Typography variant="h4">{t('shop.shopCart.title')}</Typography>
          </Stack>
          <IconButton onClick={closeDrawer}>
            <Close />
          </IconButton>
        </Stack>
        {getTotalNumber() > 0 && (
          <>
            <Divider />
            <Stack spacing={2}>
              {Object.entries(productsGrouped).map(([id, products], index) => (
                <Stack key={index}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <img src={products[0].image} alt={products[0].name} className="w-20 h-20 rounded-[10px]" />
                    <Stack>
                      <Typography variant="p" display="block">
                        {`${products[0].name}`}
                      </Typography>
                      <Stack spacing={0} direction="row" alignItems="center">
                        <Button onClick={() => removeProduct(products[0])} className="rounded-2xl min-w-0">
                          <Remove color="inherit" className="text-black" />
                        </Button>
                        <Typography variant="p" display="block">
                          {products.length}
                        </Typography>
                        <Button onClick={() => addProduct(products[0])} className="rounded-2xl min-w-0">
                          <Add color="inherit" className="text-black" />
                        </Button>
                      </Stack>
                    </Stack>
                    <Typography variant="h6" className="flex-grow text-end">
                      {`${numberRound(products[0].price * products.length)} €`}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </>
        )}
        <Divider />
        <Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="h6">{`${t('shop.shopCart.totalItems')} :`}</Typography>
            <Typography variant="h6">{getTotalNumber()}</Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="h6">{`${t('shop.shopCart.totalPrice')} :`}</Typography>
            <Typography variant="h6">{`${numberRound(total)} €`}</Typography>
          </Stack>
        </Stack>

        {getTotalNumber() > 0 && (
          <Button onClick={resetCart} color="inherit" className="rounded-2xl">
            {t('shop.shopCart.clear')}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ShoppingCart;
