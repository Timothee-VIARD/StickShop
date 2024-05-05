import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Card,
  ClickAwayListener,
  Divider,
  ListItemIcon,
  MenuItem,
  Popper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Logout, Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const AuthMenu = ({ bannerRef }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({ id: '', username: '', role: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const lock = useRef(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const openMenu = (event) => {
    if (lock.current) return;
    lock.current = true;
    setTimeout(() => (lock.current = false), 100);

    if (open) {
      return setAnchorEl(null);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const redirect = () => {
    window.location.href = '/auth';
  };

  return (
    <>
      <Tooltip title={`${!open ? t('auth.title') : ''}`}>
        <IconButton
          onClick={user ? openMenu : redirect}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className="ml-0"
        >
          <Avatar sx={{ width: 32, height: 32 }}>{user ? user.username.charAt(0).toUpperCase() : ''}</Avatar>
        </IconButton>
      </Tooltip>
      {user && (
        <ClickAwayListener mouseEvent="onMouseUp" touchEvent="onTouchEnd" onClickAway={openMenu}>
          <Popper open={open} anchorEl={anchorEl} placement="bottom-end" className="z-20">
            <Card elevation={5} className="backgroundColor rounded-2xl mt-4 p-4 min-w-64">
              <Stack>
                <MenuItem>
                  <Stack direction="row" spacing={2} className="items-center">
                    <Avatar />
                    <Typography>{user.username}</Typography>
                  </Stack>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  {t('global.settings')}
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography>{t('auth.logout.logout')}</Typography>
                </MenuItem>
              </Stack>
            </Card>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};
