import { Avatar, Divider, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const AuthMenu = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <MenuItem>
        <Stack direction="row" spacing={2} className="items-center">
          <Avatar />
          <Typography>Profile</Typography>
        </Stack>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem component={Link} to="/auth">
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography>{t('auth.logout.logout')}</Typography>
      </MenuItem>
    </Stack>
  );
};
