import React, { useContext, useRef, useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import { ProfileContext } from '../../../contexts/ProfileContext';

export const AuthMenu = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const lock = useRef(false);
  const { getProfile, updateProfile, updateToken } = useContext(ProfileContext);
  const history = useHistory();

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
    updateProfile({ user: {}, userInformation: {} });
    updateToken(null);
    history.push('/');
  };

  const redirect = () => {
    history.push('/auth');
  };

  const ProfileUser = () => {
    return (
      <Avatar sx={{ width: 32, height: 32 }} src={getProfile().user.id ? getProfile().user.profilePhoto : undefined}>
        {getProfile().user.id ? getProfile().user.username.charAt(0).toUpperCase() : ''}
      </Avatar>
    );
  };

  return (
    <>
      <Tooltip title={`${!open ? t('auth.title') : ''}`}>
        <IconButton
          onClick={getProfile().user.id ? openMenu : redirect}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className="ml-0"
        >
          <ProfileUser />
        </IconButton>
      </Tooltip>
      {getProfile().user.id && (
        <ClickAwayListener mouseEvent="onMouseUp" touchEvent="onTouchEnd" onClickAway={openMenu}>
          <Popper open={open} anchorEl={anchorEl} placement="bottom-end" className="z-20">
            <Card elevation={5} className="backgroundColor rounded-2xl mt-4 p-4 min-w-64">
              <Stack>
                <MenuItem component={Link} to={'/profile'}>
                  <Stack direction="row" spacing={2} className="items-center">
                    <ProfileUser />
                    <Typography>{getProfile().user.username}</Typography>
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
