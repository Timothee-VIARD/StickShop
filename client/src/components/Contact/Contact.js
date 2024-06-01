import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Email, LocationOn, Phone } from '@mui/icons-material';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const Contact = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
    setIsError(false);
  };

  const sendEmail = async () => {
    const dataToSend = {
      subject: `${email.email} - ${email.subject}`,
      text: `${email.message} \n${t('contact.contactForm.email')}: ${email.email}`
    };

    try {
      if (!email.email || !email.subject || !email.message) {
        setIsError(true);
        throw new Error('ER_BAD_NULL_ERROR');
      }

      const response = await fetch('http://localhost:3001/mail/receive', {
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
        const successMessage = t(`contact.contactForm.success`);
        enqueueSnackbar(successMessage, {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" color="backgroundColor" onClick={() => closeSnackbar(key)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )
        });
        setEmail({ email: null, subject: null, message: null });
      }
    } catch (error) {
      const errorMessage = t(`error.${error.message}`);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        action: (key) => (
          <IconButton size="small" color="backgroundColor" onClick={() => closeSnackbar(key)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )
      });
    }
  };

  return (
    <Box className="pt-14 pb-2">
      <Typography variant="h4" className="text-center">
        {t('contact.title')}
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} className="my-12 mx-6 sm:mx-16 md:mx-24">
        <Stack direction="column" spacing={1} className="w-full md:w-1/2">
          <Typography variant="h5" className="font-bold">
            {t('contact.contactForm.title')}
          </Typography>
          <Typography>{t('contact.contactForm.description')}</Typography>
          <Grid container spacing={2} className="ml-[-16px]">
            <Grid item xs={6}>
              <Typography className="font-bold">{t('contact.contactForm.email')}</Typography>
              <TextField
                name={'email'}
                placeholder={t('contact.contactForm.email')}
                variant="outlined"
                onChange={handleChange}
                value={email.email || ''}
                className="rounded-2xl"
                required
                fullWidth
                error={isError}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography className="font-bold">{t('contact.contactForm.subject')}</Typography>
              <TextField
                name={'subject'}
                placeholder={t('contact.contactForm.subject')}
                variant="outlined"
                onChange={handleChange}
                value={email.subject || ''}
                className="rounded-2xl"
                required
                fullWidth
                error={isError}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="font-bold">{t('contact.contactForm.message')}</Typography>
              <TextField
                name={'message'}
                placeholder={t('contact.contactForm.message')}
                variant="outlined"
                onChange={handleChange}
                value={email.message || ''}
                className="rounded-2xl"
                multiline
                rows={4}
                required
                fullWidth
                error={isError}
              />
            </Grid>
          </Grid>
          <Button variant="contained" className="rounded-2xl" onClick={sendEmail}>
            {t('contact.contactForm.send')}
          </Button>
        </Stack>
        <Stack direction="column" spacing={1} className="w-full md:w-1/2">
          <Typography variant="h5" className="font-bold">
            {t('contact.mapTitle')}
          </Typography>
          <MapContainer
            center={[47.49334256508192, -0.5508496586542]}
            zoom={13}
            className="w-full h-80 md:h-full rounded-2xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[47.49334256508192, -0.5508496586542]}>
              <Popup>
                <Stack direction="column" spacing={1}>
                  <Typography variant="h6" className="font-bold">
                    {t('contact.mapPopup')}
                  </Typography>
                  <Typography>{t('contact.mapPopupAddress')}</Typography>
                </Stack>
              </Popup>
            </Marker>
          </MapContainer>
        </Stack>
      </Stack>
      <Box className="flex justify-center my-12">
        <Stack direction="column" spacing={2} className="p-6 rounded-2xl bg-black bg-opacity-5">
          <Typography variant="h5" className="font-bold">
            {t('contact.contactInfo.title')}
          </Typography>
          <Stack direction="column" spacing={1}>
            <Typography>
              <LocationOn />
              {t('contact.contactInfo.address')}
            </Typography>
            <Typography>
              <Phone />
              {t('contact.contactInfo.phone')}
            </Typography>
            <Typography>
              <Email />
              {t('contact.contactInfo.email')}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
