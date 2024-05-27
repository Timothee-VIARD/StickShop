import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { CarouselProducts } from './Carousel/CarouselProducts';
import { Map } from './Map/Map';
import { Video } from './Video/Video';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Stack direction="column" rowGap={2} className="h-full p-8 md:p-16">
      <Box className="text-center ">
        <Typography variant="h2">{t('global.title')}</Typography>
      </Box>
      <Stack direction="column" className="gap-y-2 md:gap-y-12">
        <Grid container spacing={6} className="rounded-2xl">
          <Grid item xs={12} md={8} className="h-fit order-2 md:order-1">
            <CarouselProducts />
          </Grid>
          <Grid item container xs={12} md={4} className="order-1 md:order-2">
            <Stack spacing={2}>
              <Typography variant="h4">{t('home.welcome')}</Typography>
              <Typography variant="body1">{t('home.description')}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={6} className="rounded-2xl">
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h4">{t('home.map.title')}</Typography>
              <Typography variant="body1">{t('home.map.description')}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Map />
          </Grid>
        </Grid>
        <Grid container spacing={6} className="rounded-2xl">
          <Grid item xs={12} md={8} className="order-2 md:order-1">
            <Video />
          </Grid>
          <Grid item xs={12} md={4} className="order-1 md:order-2">
            <Stack spacing={2}>
              <Typography variant="h4">{t('home.video.title')}</Typography>
              <Typography variant="body1">{t('home.video.description')}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};
