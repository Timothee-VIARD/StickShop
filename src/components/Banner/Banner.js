import logo from '../../assets/LogoSitckLand.png';
import './Banner.css';
import {Button, Stack, Typography} from "@mui/material";
import {localStorageKeys} from "../../utils/constants/LocalStorageKeys";
import i18n from "i18next";
import React from "react";
import {useTranslation} from "react-i18next";


/**
 * Commponent for the banner
 */
const Banner = () => {
  const {t} = useTranslation();

  const handleTranslate = (lng) => {
    if (i18n.language !== lng) {
      localStorage.setItem(localStorageKeys.userLanguage, lng);
      i18n.changeLanguage([lng]);
    }
  };

  return (
    <header className="bg-lime-600 p-4 sticky top-0 z-40">
      <Stack direction="row" className="justify-between">
        <Stack direction="row" spacing={2}>
          <img src={logo} alt="Logo" className="h-10 rotate-logo"/>
          <Typography fontWeight="bold" variant="h5" className="flex items-center">
            StickLand
          </Typography>
        </Stack>
        <Button
          color="inherit"
          onClick={() => handleTranslate(i18n.language === 'fr' ? 'en' : 'fr')}
        >
          {t('global.language')}
        </Button>
      </Stack>
    </header>
  )
};

export default Banner;
