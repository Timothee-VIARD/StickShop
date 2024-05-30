import { Box, FormControl, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { createTheme } from '@mui/material/styles';
import { CurrencyContext } from '../../contexts/CurrencyContext';

export const Parameters = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = React.useState();
  const [theme, setTheme] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const themeMui = useTheme();
  const { getCurrency, updateCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    setLanguage(localStorage.getItem('lng').toString() || 'fr');
    setTheme(localStorage.getItem('theme') || 'lightMode');
    setCurrency(getCurrency());
    setTimezone(localStorage.getItem('timezone') || '1');
  }, []);

  useEffect(() => {
    setLanguage(localStorage.getItem('lng').toString() || 'fr');
  }, [t]);

  useEffect(() => {
    document.body.style.cssText = `background-color: ${themeMui.palette.backgroundColor.main} !important`;
    createTheme({
      palette: {
        theme: theme === 'darkMode' ? 'dark' : 'light'
      }
    });
  }, [theme]);

  const handleChange = (event) => {
    if (event.target.name === 'language') {
      setLanguage(event.target.value);
      localStorage.setItem('lng', event.target.value);
      i18n.changeLanguage([event.target.value]);
    } else if (event.target.name === 'theme') {
      setTheme(event.target.value);
      localStorage.setItem('theme', event.target.value);
    } else if (event.target.name === 'currency') {
      setCurrency(event.target.value);
      updateCurrency(event.target.value);
      localStorage.setItem('currency', event.target.value);
    } else if (event.target.name === 'timezone') {
      setTimezone(event.target.value);
      localStorage.setItem('timezone', event.target.value);
    }
  };

  return (
    <Box className="h-full">
      <Typography variant="h4" className="pt-14 pb-2 flex-grow text-center">
        {t('parameters.title')}
      </Typography>
      <Stack direction="column" spacing={2} className="mx-6 sm:mx-24 lg:mx-44 xl:mx-96 my-12">
        <Stack>
          <FormControl fullWidth>
            <Typography variant="h5" className="pt-2 pb-2 font-bold">
              {t('parameters.language.title')}
            </Typography>
            <Select id="language" value={language || ''} onChange={handleChange} name="language">
              <MenuItem value={'fr'}>{t('parameters.language.fr')}</MenuItem>
              <MenuItem value={'en'}>{t('parameters.language.en')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <FormControl fullWidth>
            <Typography variant="h5" className="pt-2 pb-2 font-bold">
              {t('parameters.theme.title')}
            </Typography>
            <Select id="theme" value={theme || ''} onChange={handleChange} name="theme">
              <MenuItem value={'lightMode'}>{t('parameters.theme.lightMode')}</MenuItem>
              <MenuItem value={'darkMode'}>{t('parameters.theme.darkMode')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <FormControl fullWidth>
            <Typography variant="h5" className="pt-2 pb-2 font-bold">
              {t('parameters.currency.title')}
            </Typography>
            <Select id="currency" value={currency || ''} onChange={handleChange} name="currency">
              <MenuItem value={'euro'}>{t('parameters.currency.euro')}</MenuItem>
              <MenuItem value={'dollar'}>{t('parameters.currency.dollar')}</MenuItem>
              <MenuItem value={'yen'}>{t('parameters.currency.yen')}</MenuItem>
              <MenuItem value={'pound'}>{t('parameters.currency.pound')}</MenuItem>
              <MenuItem value={'rupee'}>{t('parameters.currency.rupee')}</MenuItem>
              <MenuItem value={'won'}>{t('parameters.currency.won')}</MenuItem>
              <MenuItem value={'ruble'}>{t('parameters.currency.ruble')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <FormControl fullWidth>
            <Typography variant="h5" className="pt-2 pb-2 font-bold">
              {t('parameters.timezone.title')}
            </Typography>
            <Select id="timezone" value={timezone || ''} onChange={handleChange} name="timezone">
              <MenuItem value={'1'}>{t('parameters.timezone.1')}</MenuItem>
              <MenuItem value={'2'}>{t('parameters.timezone.2')}</MenuItem>
              <MenuItem value={'3'}>{t('parameters.timezone.3')}</MenuItem>
              <MenuItem value={'4'}>{t('parameters.timezone.4')}</MenuItem>
              <MenuItem value={'5'}>{t('parameters.timezone.5')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  );
};
