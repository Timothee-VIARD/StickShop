import logo from '../../assets/LogoSitckLand.png';
import './Banner.css';
import {Button, MenuItem, Select, Stack, Typography} from "@mui/material";
import {localStorageKeys} from "../../utils/constants/LocalStorageKeys";
import i18n from "i18next";
import {availableLanguages} from "../../translations/translationUtils";
import React, {useState} from "react";


/**
 * Commponent for the banner
 */
const Banner = () => {


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
          {i18n.language}
        </Button>
      </Stack>
    </header>
  )
};

export default Banner;
