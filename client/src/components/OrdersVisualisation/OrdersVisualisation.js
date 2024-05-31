import { Box, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileContext } from '../../contexts/ProfileContext';
import { OrderInformation } from './OrderInformation/OrderInformation';

export const OrdersVisualisation = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const { getProfile } = useContext(ProfileContext);

  useEffect(() => {
    fetch(`http://localhost:3001/orders/user/${getProfile().user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data.reverse());
        if (data.error && data.error !== 'OBJECT_NOT_FOUND') {
          throw new Error(data.error);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
  }, []);

  return (
    <main className="h-fit flex-grow flex flex-col">
      <Typography variant="h4" className="pt-14 pb-2 text-center">
        {t('orders.title')}
      </Typography>
      {orders.length !== 0 ? (
        <Stack direction="column" spacing={6} className="mx-2 sm:mx-6 md:mx-12 lg:mx-24 my-12">
          {orders.reverse().map((order, index) => (
            <OrderInformation orderData={order} key={index} />
          ))}
        </Stack>
      ) : (
        <Box className="flex-grow flex justify-center items-center my-12">
          <Typography variant="h6">{t('orders.noOrders')}</Typography>
        </Box>
      )}
    </main>
  );
};
