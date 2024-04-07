import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { CarouselProducts } from './Carousel/CarouselProducts';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Stack className="h-full">
      <Box className="text-center pt-8">
        <Typography variant="h2">{t('global.title')}</Typography>
      </Box>
      <Grid container spacing={6} className="p-16 pt-10 rounded-2xl">
        <Grid item xs={8} className="pt-0">
          <CarouselProducts />
        </Grid>
        <Grid item container xs={4} className="pt-0">
          <Stack spacing={2}>
            <Typography variant="h4">{t('home.welcome')}</Typography>
            <Typography variant="body1">{t('home.description')}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
