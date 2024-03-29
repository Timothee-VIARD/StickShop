import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

export const NavBar = (mobileOpen, handleDrawerToggle) => {
  const {t} = useTranslation();

  const navItems = ['Home', 'About', 'Contact'];

  return(
  <nav>
    <Drawer
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Box onClick={handleDrawerToggle} className="w-[300px]">
        <Typography variant="h6">
          {t('global.title')}
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  </nav>);
}