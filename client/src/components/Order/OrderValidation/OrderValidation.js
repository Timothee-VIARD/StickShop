import { Button, Divider, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { CurrencyContext } from '../../../contexts/CurrencyContext';
import { ProfileContext } from '../../../contexts/ProfileContext';

export const OrderValidation = ({ isOpen, setIsOpen, data, shipping }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { getCurrency } = useContext(CurrencyContext);
  const { getProfile } = useContext(ProfileContext);

  const currentDatePlusFiveDay = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toISOString().split('T')[0].split('-').reverse().join('.');
  };

  const orderNumberFromUsername = () => {
    const username = getProfile().user.username;
    const number = parseInt(username, 36);
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0].split('-').reverse().join('') + number;
  };

  const handleClose = () => {
    setIsOpen(false);
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
              {data?.totalPrice} {t(`parameters.currency.${getCurrency()}`)}
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
            onClick={handleClose}
            className="w-1/2 text-xs sm:text-base"
          >
            {t('order.orderValidation.confirm')}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
