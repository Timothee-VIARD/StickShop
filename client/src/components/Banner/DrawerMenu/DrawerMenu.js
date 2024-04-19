import { Button, Divider, Drawer, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../Banner.css';
import '../../../style/global.css';

export const DrawerMenu = ({ menuOpen, handleDrawerToggle }) => {
  const { t } = useTranslation();

  const navItems = [
    {
      title: t('home.title'),
      link: '/'
    },
    {
      title: t('shop.title'),
      link: '/shop'
    },
    {
      title: t('contact.title'),
      link: '/contact'
    },
    {
      title: t('admin.title'),
      link: '/admin'
    }
  ];

  return (
    <nav>
      <Drawer
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <Stack onClick={handleDrawerToggle} spacing={4} className="backgroundColor w-[300px] p-4 items-center h-full">
          <Stack direction="row" spacing={2}>
            <img src="/LogoStickShop.png" alt="Logo" className="w-8 h-8 rotate-logo" />
            <Typography fontWeight="bold" variant="h6">
              {t('global.title')}
            </Typography>
          </Stack>
          <Divider className="w-full" />
          <Stack spacing={1}>
            {navItems.map((item) => (
              <Button component={Link} to={item.link} key={item.title} variant="text" color="primary">
                {item.title}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Drawer>
    </nav>
  );
};
