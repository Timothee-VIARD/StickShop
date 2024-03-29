import logo from '../../assets/LogoSitckLand.png';
import './Banner.css';
import {Button, Stack, Typography} from "@mui/material";
import {localStorageKeys} from "../../utils/constants/LocalStorageKeys";
import i18n from "i18next";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {NavBar} from "./NavBar/NavBar";

/**
 * Commponent for the banner
 */
const Banner = () => {
  const {t} = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleTranslate = (lng) => {
    if (i18n.language !== lng) {
      localStorage.setItem(localStorageKeys.userLanguage, lng);
      i18n.changeLanguage([lng]);
    }
  };

  return (
    <header className="bg-lime-600 p-2 px-8 sticky top-0 z-40">
      <Stack direction="row" className="justify-between">
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
            <img src={logo} alt="Logo" className="h-8 rotate-logo"/>
            <Typography fontWeight="bold" variant="h6" className="flex items-center">
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
      <NavBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
    </header>
  )
};

export default Banner;
