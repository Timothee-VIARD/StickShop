import { Box, Button, Divider, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './OrderInformation.css';
import { numberRound } from '../../../../utils/global/Numbers';
import React, { useContext, useState } from 'react';
import { CurrencyContext } from '../../../../contexts/CurrencyContext';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSnackbar } from 'notistack';

export const OrderInformation = ({ orderData }) => {
  const { t } = useTranslation();
  const { getCurrency } = useContext(CurrencyContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [order, setOrder] = useState(orderData);

  const steps = [
    t('orders.steps.ordered'),
    t('orders.steps.paymentValidation'),
    t('orders.steps.delivering'),
    t('orders.steps.delivered')
  ];

  const getStepIndex = (status) => {
    let stepStatus;
    switch (status) {
      case 'PENDING':
        stepStatus = 1;
        break;
      case 'DELIVERING':
        stepStatus = 2;
        break;
      case 'DELIVERED':
        stepStatus = 3;
        break;
      default:
        stepStatus = 0;
        break;
    }
    return stepStatus;
  };

  const handleCancel = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/updateStatus/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'CANCELLED' })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        const successMessage = t(`orders.cancelSuccess`);
        enqueueSnackbar(successMessage, {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )
        });
        setOrder({ ...order, status: 'CANCELLED' });
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
    <Stack
      direction="column"
      spacing={4}
      className="mx-2 sm:mx-6 md:mx-12 lg:mx-24 p-6 rounded-2xl bg-black bg-opacity-5"
    >
      <Typography variant="h5" className="text-center font-bold text-base sm:text-[1.25rem]">
        {t('orders.order') + order?.orderNumber}
      </Typography>
      <Stepper activeStep={getStepIndex(order?.status)} alternativeLabel className="overflow-x-auto">
        {steps.map((label, index) => {
          const stepProps = {};
          if (order?.status === 'DELIVERED' && index === getStepIndex('DELIVERED')) {
            stepProps.completed = true;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {order?.status === 'CANCELLED' && (
        <Typography variant="h6" className="text-center text-red-500 text-base sm:text-[1.25rem]">
          {t('orders.cancelled')}
        </Typography>
      )}
      <Stack direction="column" spacing={1} className="">
        <Stack direction="row" className="justify-between">
          <Typography variant="h6" className="font-bold text-base sm:text-[1.25rem]">
            {t('orders.orderDate')}
          </Typography>
          <Typography variant="h6" className="text-right text-base sm:text-[1.25rem]">
            {order?.orderDate}
          </Typography>
        </Stack>
        <Stack direction="row" className="justify-between">
          <Typography variant="h6" className="font-bold text-base sm:text-[1.25rem]">
            {t('orders.deliveryDate')}
          </Typography>
          <Typography variant="h6" className="text-right text-base sm:text-[1.25rem]">
            {order?.deliveryDate}
          </Typography>
        </Stack>
        <Stack direction="row" className="justify-between">
          <Typography variant="h6" className="font-bold text-base sm:text-[1.25rem]">
            {t('orders.totalPrice')}
          </Typography>
          <Typography variant="h6" className="text-right text-base sm:text-[1.25rem]">
            {`${numberRound(parseFloat(order?.totalPrice))} ${t(`parameters.currency.${getCurrency()}`)}`}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" className="justify-between">
          <Typography variant="h6" className="font-bold text-base sm:text-[1.25rem]">
            {t('orders.orderAddress.title')}
          </Typography>
          <Typography variant="h6" className="text-right text-base sm:text-[1.25rem]">
            {`${order?.address}, ${order?.zipCode} ${order?.city}, ${order?.country}`}
          </Typography>
        </Stack>
        <Box className="flex justify-center pt-4">
          <Button variant="contained" color="primary" className="w-full sm:w-1/2 " onClick={handleCancel}>
            {t('orders.cancel')}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
