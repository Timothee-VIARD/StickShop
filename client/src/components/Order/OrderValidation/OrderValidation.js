import { Button, Divider, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { CurrencyContext } from '../../../contexts/CurrencyContext';
import { ProfileContext } from '../../../contexts/ProfileContext';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSnackbar } from 'notistack';
import { numberRound } from '../../../utils/global/Numbers';

export const OrderValidation = ({ isOpen, setIsOpen, data, removePurchaseItem }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { getCurrency } = useContext(CurrencyContext);
  const { getProfile } = useContext(ProfileContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const currentDatePlusFiveDay = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toISOString().split('T')[0].split('-').reverse().join('.');
  };

  const orderNumberFromUsername = () => {
    const username = getProfile().user.username;
    const number = parseInt(username, 36);
    const currentDate = new Date().toISOString().split('T')[0].split('-').reverse().join('');
    const currentTime = new Date().toISOString().split('T')[1].split('Z')[0].split(':').join('');
    return parseInt(currentDate) + parseInt(currentTime) + number;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    const dataToSend = {
      orderNumber: orderNumberFromUsername(),
      userId: getProfile().user.id,
      orderDate: new Date().toISOString().split('T')[0].split('-').reverse().join('.'),
      deliveryDate: currentDatePlusFiveDay(),
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      country: data.country,
      paymentMethod: data.email ? 'Paypal' : 'Credit Card',
      totalPrice: data.totalPrice,
      status: 'PENDING'
    };

    try {
      const response = await fetch('http://localhost:3001/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        const successMessage = t(`order.orderSuccess.message`);
        enqueueSnackbar(successMessage, {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )
        });
        removePurchaseItem();
      }
    } catch (error) {
      const errorMessage = t(`error.${error.message}`);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        action: (key) => (
          <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className="h-full w-full flex justify-center items-center">
      <Stack sx={{ backgroundColor: theme.palette.backgroundColor.main }} className="p-6 rounded-2xl mx-4" spacing={2}>
        <Stack>
          <Typography variant="h5" className="font-bold">
            {t('order.orderValidation.title')}
          </Typography>
          <Typography variant="body1" className="text-xs sm:text-base">
            {t('order.orderValidation.message')}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="column" spacing={1}>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderValidation.orderNumber')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {orderNumberFromUsername()}
            </Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderValidation.totalPrice')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {numberRound(data?.totalPrice)} {t(`parameters.currency.${getCurrency()}`)}
            </Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderValidation.deliveryDate')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {currentDatePlusFiveDay()}
            </Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderSummary.billingAddress.address')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {data?.address}
            </Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderSummary.billingAddress.city')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {data?.city}
            </Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderSummary.billingAddress.zipCode')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {data?.zipCode}
            </Typography>
          </Stack>
          <Stack direction="row" className="justify-between">
            <Typography variant="body1" className="font-bold text-xs sm:text-base">
              {t('order.orderSummary.billingAddress.country')} :
            </Typography>
            <Typography variant="body1" className="text-xs sm:text-base">
              {data?.country}
            </Typography>
          </Stack>
          <Divider />
          {data?.email ? (
            <Stack direction="column" className="justify-between" spacing={1}>
              <Stack direction="row" className="justify-between">
                <Typography variant="body1" className="font-bold text-xs sm:text-base">
                  {t('order.orderSummary.paymentMethod')} :
                </Typography>
                <Typography
                  variant="body1"
                  className="rounded-2xl flex flex-row gap-2 justify-center items-center text-xs sm:text-base"
                >
                  <img src="/images/paypal.png" className="h-4" alt="paypal" />
                  {t('order.orderSummary.paypal.title')}
                </Typography>
              </Stack>
              <Stack direction="row" className="justify-between">
                <Typography variant="body1" className="font-bold text-xs sm:text-base">
                  {t('order.orderSummary.paypal.email')} :
                </Typography>
                <Typography variant="body1" className="text-xs sm:text-base">
                  {data?.email}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <Stack direction="column" className="justify-between" spacing={1}>
              <Stack direction="row" className="justify-between">
                <Typography variant="body1" className="font-bold text-xs sm:text-base">
                  {t('order.orderSummary.paymentMethod')} :
                </Typography>
                <Typography
                  variant="body1"
                  className="rounded-2xl flex flex-row gap-2 justify-center items-center text-xs sm:text-base"
                >
                  <img src="/images/creditCard.png" className="h-4" alt="creditCard" />
                  {t('order.orderSummary.creditCard.title')}
                </Typography>
              </Stack>
              <Stack direction="row" className="justify-between">
                <Typography variant="body1" className="font-bold text-xs sm:text-base">
                  {t('order.orderSummary.creditCard.cardNumber')} :
                </Typography>
                <Typography variant="body1" className="text-xs sm:text-base">
                  {data?.cardNumber}
                </Typography>
              </Stack>
              <Stack direction="row" className="justify-between">
                <Typography variant="body1" className="font-bold text-xs sm:text-base">
                  {t('order.orderSummary.creditCard.expirationDate')} :
                </Typography>
                <Typography variant="body1" className="text-xs sm:text-base">
                  {data?.expirationDate}
                </Typography>
              </Stack>
              <Stack direction="row" className="justify-between">
                <Typography variant="body1" className="font-bold text-xs sm:text-base">
                  {t('order.orderSummary.creditCard.cvv')} :
                </Typography>
                <Typography variant="body1" className="text-xs sm:text-base">
                  {data?.cvv}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Divider />
        <Stack direction="row" spacing={2} className="justify-center">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClose}
            className="w-1/2 text-xs sm:text-base"
          >
            {t('order.orderValidation.cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleConfirm}
            className="w-1/2 text-xs sm:text-base"
          >
            {t('order.orderValidation.confirm')}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
