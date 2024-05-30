import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { numberRound } from '../../utils/global/Numbers';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CurrencyContext } from '../../contexts/CurrencyContext';

const Order = () => {
  const { t } = useTranslation();

  const [isPaypalMethod, setIsPaypalMethod] = useState(false);
  const { cart, addToCart, removeFromCart, getTotalPrice, getTotalNumber } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const { getCurrency } = useContext(CurrencyContext);
  const shipping = 5.99;

  useEffect(() => {
    setTotal(getTotalPrice() + shipping);
  }, [getTotalPrice]);
  const groubBy = (array, key) => {
    console.log(cart);

    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const addProduct = (product) => {
    addToCart(product);
  };

  const removeProduct = (product) => {
    removeFromCart(product.id);
  };

  const productsGrouped = groubBy(cart, 'id');
  return (
    <main>
      <Typography variant="h4" className="pt-14 pb-2 flex-grow text-center">
        {t('order.title')}
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} className="mx-6 md:mx-24 my-12" spacing={6}>
        <Stack direction="column" className="flex-grow" spacing={2}>
          <Stack direction="row" className="justify-between">
            <Typography variant="h5" className="pt-2 pb-2 font-bold">
              {t('order.orderDetails.title')}
            </Typography>
            <Typography variant="h6" className="pt-2 pb-2">
              {`${t('order.orderDetails.totalItems')} : ${getTotalNumber()}`}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {Object.entries(productsGrouped).map(([id, products], index) => (
              <Stack key={id} spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <img
                    src={products[0].image}
                    alt={products[0].name}
                    className="w-24 md:w-32 h-24 md:h-32 rounded-[10px]"
                  />
                  <Stack spacing={2}>
                    <Typography variant="h6" display="block">
                      {`${products[0].name}`}
                    </Typography>
                    <Stack spacing={1} direction="row" alignItems="center">
                      <Button onClick={() => removeProduct(products[0])} className="rounded-2xl min-w-0">
                        <Remove color="inherit" className="text-black" />
                      </Button>
                      <Typography variant="h6" display="block">
                        {products.length}
                      </Typography>
                      <Button onClick={() => addProduct(products[0])} className="rounded-2xl min-w-0">
                        <Add color="inherit" className="text-black" />
                      </Button>
                    </Stack>
                  </Stack>
                  <Typography variant="h6" className="flex-grow text-end">
                    {`${numberRound(products[0].price * products.length)} ${t(`parameters.currency.${getCurrency()}`)}`}
                  </Typography>
                </Stack>
                {index < Object.entries(productsGrouped).length - 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack
          direction="column"
          className="w-full md:w-[30em] p-5 rounded-2xl bg-black bg-opacity-5 h-fit"
          spacing={2}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" className="font-bold">
              {t('order.orderSummary.title')}
            </Typography>
            <Stack direction="column">
              <Stack direction="row" className="justify-between">
                <Typography variant="h6">{t('order.orderSummary.subtotal')}</Typography>
                <Typography variant="h6">{`${numberRound(getTotalPrice())} ${t(
                  `parameters.currency.${getCurrency()}`
                )}`}</Typography>
              </Stack>
              <Stack direction="row" className="justify-between">
                <Typography variant="h6">{t('order.orderSummary.shipping')}</Typography>
                <Typography variant="h6">{`${shipping} ${t(`parameters.currency.${getCurrency()}`)}`}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" className="justify-between">
              <Typography variant="h6" className="font-bold">
                {t('order.orderSummary.totalPrice')}
              </Typography>
              <Typography variant="h6" className="font-bold">{`${numberRound(total)} ${t(
                `parameters.currency.${getCurrency()}`
              )}`}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" className="font-bold">
              {t('order.orderSummary.paymentMethod')}
            </Typography>
            <Stack spacing={1}>
              <Button
                variant="outlined"
                className="rounded-2xl flex flex-row gap-2"
                onClick={() => setIsPaypalMethod(false)}
              >
                <img src="/images/creditCard.png" className="h-4" alt="creditCard" />
                {t('order.orderSummary.creditCard.title')}
              </Button>
              <Button
                variant="outlined"
                className="rounded-2xl flex flex-row gap-2"
                onClick={() => setIsPaypalMethod(true)}
              >
                <img src="/images/paypal.png" className="h-4" alt="paypal" />
                {t('order.orderSummary.paypal.title')}
              </Button>
            </Stack>
            <Stack spacing={2}>
              {isPaypalMethod ? (
                <Stack spacing={2}>
                  <TextField label={t('order.orderSummary.paypal.email')} variant="outlined" className="rounded-2xl" />
                  <TextField
                    label={t('order.orderSummary.paypal.password')}
                    variant="outlined"
                    className="rounded-2xl"
                  />
                </Stack>
              ) : (
                <Grid container rowGap={2} columnSpacing={2} className="ml-[-16px]">
                  <Grid item xs={12}>
                    <TextField
                      label={t('order.orderSummary.creditCard.cardNumber')}
                      variant="outlined"
                      className="rounded-2xl"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={t('order.orderSummary.creditCard.expirationDate')}
                      variant="outlined"
                      className="rounded-2xl"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={t('order.orderSummary.creditCard.cvv')}
                      variant="outlined"
                      className="rounded-2xl"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}
              <Stack spacing={2}>
                <Typography variant="h6" className="font-bold">
                  {t('order.orderSummary.billingAddress.title')}
                </Typography>
                <Box>
                  <Grid container rowGap={2} columnSpacing={2} className="ml-[-16px]">
                    <Grid item xs={12}>
                      <TextField
                        label={t('order.orderSummary.billingAddress.address')}
                        variant="outlined"
                        className="rounded-2xl"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t('order.orderSummary.billingAddress.city')}
                        variant="outlined"
                        className="rounded-2xl"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t('order.orderSummary.billingAddress.zipCode')}
                        variant="outlined"
                        className="rounded-2xl"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={t('order.orderSummary.billingAddress.country')}
                        variant="outlined"
                        className="rounded-2xl"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="column" spacing={1}>
            <Button variant="outlined" className="rounded-2xl" component={Link} to="/shop">
              {t('order.orderSummary.cancel')}
            </Button>
            <Button variant="contained" className="rounded-2xl">
              {`${t('order.orderSummary.pay')} ${numberRound(total)} ${t(`parameters.currency.${getCurrency()}`)}`}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </main>
  );
};

export default Order;
