import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { localStorageKeys } from '../../utils/constants/LocalStorageKeys';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { DrawerMenu } from './DrawerMenu/DrawerMenu';
import { ShoppingCartDrawer } from '../Shop/ShoppingCartDrawer/ShoppingCartDrawer'; // Importez correctement le contexte
import './Banner.css';

const Banner = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMenuOpen((prevState) => !prevState);
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
          <img src="/LogoSitckLand.png" alt="Logo" className="h-8 rotate-logo" />
          <Typography fontWeight="bold" variant="h6" className="flex items-center">
            StickLand
          </Typography>
        </Stack>
        <Stack direction="row">
          <ShoppingCartDrawer />
          <Button color="inherit" onClick={() => handleTranslate(i18n.language === 'fr' ? 'en' : 'fr')}>
            {t('global.language')}
          </Button>
        </Stack>
      </Stack>
      <DrawerMenu menuOpen={menuOpen} handleDrawerToggle={handleDrawerToggle} />
    </header>
  );
};

export default Banner;
