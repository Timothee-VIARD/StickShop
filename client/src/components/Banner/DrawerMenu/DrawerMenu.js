import { Button, Divider, Drawer, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../Banner.css';
import '../../../style/global.css';
import { ProfileContext } from '../../../contexts/ProfileContext';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ShopIcon from '@mui/icons-material/ShoppingCartOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { ContactPhoneOutlined, LocalShippingOutlined } from '@mui/icons-material';

export const DrawerMenu = ({ menuOpen, handleDrawerToggle }) => {
  const { t } = useTranslation();
  const { getRole } = useContext(ProfileContext);

  const isAdmin = getRole() === 'ADMIN';

  const navItems = [
    {
      title: t('home.title'),
      link: '/',
      icon: <HomeIcon />
    },
    {
      title: t('shop.title'),
      link: '/shop',
      icon: <ShopIcon />
    },
    {
      title: t('orders.title'),
      link: '/shop/orders',
      icon: <LocalShippingOutlined />
    },
    ...(isAdmin ? [{ title: t('admin.title'), link: '/admin', icon: <TuneOutlinedIcon /> }] : [])
  ];

  return (
    <nav>
      <Drawer
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        anchor={'left'}
      >
        <Stack onClick={handleDrawerToggle} spacing={4} className="backgroundColor w-[300px] p-4 items-center h-full">
          <Stack direction="row" spacing={2}>
            <img src="/LogoStickShop.png" alt="Logo" className="w-8 h-8 rotate-logo" />
            <Typography fontWeight="bold" variant="h6">
              {t('global.title')}
            </Typography>
          </Stack>
          <Divider className="w-full" />
          <Stack direction="column" className="h-full justify-between w-full">
            <Stack spacing={1}>
              {navItems.map((item) => (
                <Button
                  component={Link}
                  to={item.link}
                  key={item.title}
                  variant="text"
                  color="primary"
                  className="gap-2"
                >
                  {item.icon}
                  {item.title}
                </Button>
              ))}
            </Stack>
            <Stack direction="column" className="w-full" spacing={2}>
              <Divider className="w-full" />
              <Button component={Link} to="/contact" variant="text" color="primary" className="gap-2">
                <ContactPhoneOutlined />
                {t('contact.title')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    </nav>
  );
};
