import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { CartContext } from '../../../../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import { useTranslation } from 'react-i18next';
import { Add, Close, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { numberRound } from '../../../../utils/global/Numbers';
import '../../../../style/global.css';
import { Link } from 'react-router-dom';

/**
 * Commponent for the shopping cart
 */
const ShoppingCart = ({ closeDrawer }) => {
  const { t } = useTranslation();
  const { cart, removeFromCart, resetCart, addToCart, getTotalNumber, getTotalPrice, resetDocumentTitle } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);

  const groubBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        setIsScrolling(containerRef.current.scrollHeight > containerRef.current.clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [cart]);

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
    <Box className="backgroundColor p-7 z-30 w-full md:w-[470px] md:max-w-[470px] overflow-hidden h-full max-h-full">
      <Stack spacing={3} className="h-full justify-between">
        <Stack direction="column" className="h-fit" spacing={3}>
          <Stack direction="row" className="items-center justify-between">
            <Stack direction="row" className="items-center gap-3">
              {getTotalNumber() > 0 ? <ShoppingCartIcon fontSize="large" /> : <ShoppingCartOutlined fontSize="large" />}
              <Typography variant="h4">{t('shop.shopCart.title')}</Typography>
            </Stack>
            <IconButton onClick={closeDrawer}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />
        </Stack>
        {getTotalNumber() > 0 ? (
          <>
            <Stack
              spacing={2}
              className={`h-full overflow-auto flex-grow ${isScrolling ? 'pr-2' : ''}`}
              ref={containerRef}
            >
              {Object.entries(productsGrouped).map(([id, products]) => (
                <Stack key={id}>
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
            <Stack direction="column" spacing={2} className="h-fit">
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
              <Stack direction="column" spacing={1}>
                <Button onClick={resetCart} color="inherit" variant="outlined" className="rounded-2xl">
                  {t('shop.shopCart.clear')}
                </Button>
                <Button component={Link} to="/shop/order" variant="contained" className="rounded-2xl">
                  {t('shop.shopCart.order')}
                </Button>
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack className="h-full w-full items-center justify-center">
            <ProductionQuantityLimitsRoundedIcon className="w-1/4 h-1/4" />
            <Typography variant="h6">{t('shop.shopCart.empty')}</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default ShoppingCart;
