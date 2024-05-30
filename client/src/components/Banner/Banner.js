import React, { useState } from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { localStorageKeys } from '../../utils/constants/LocalStorageKeys';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { DrawerMenu } from './DrawerMenu/DrawerMenu';
import { ShoppingCartDrawer } from '../Shop/ShoppingCartDrawer/ShoppingCartDrawer';
import './Banner.css';
import '../../style/global.css';
import { AuthMenu } from './AuthMenu/AuthMenu';
import { Link } from 'react-router-dom';

const Banner = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const bannerRef = React.useRef(null);
  const theme = useTheme();

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
    <Box
      ref={bannerRef}
      style={{ backgroundColor: theme.palette.secondary.main }}
      className="p-2 px-8 fixed top-0 z-[1200] w-full"
    >
      <Stack direction="row" className="justify-between">
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <img src="/LogoStickShop.png" alt="Logo" className="h-8 rotate-logo hidden sm:block" />
          <Typography
            fontWeight="bold"
            variant="h6"
            style={{ color: theme.palette.primary.main }}
            className="hidden sm:flex items-center "
            component={Link}
            to="/"
          >
            {t('global.title')}
          </Typography>
        </Stack>
        <Stack direction="row">
          <ShoppingCartDrawer />
          <Button color="inherit" onClick={() => handleTranslate(i18n.language === 'fr' ? 'en' : 'fr')}>
            {t('global.language')}
          </Button>

          <AuthMenu />
        </Stack>
      </Stack>
      <DrawerMenu menuOpen={menuOpen} handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
};

export default Banner;
