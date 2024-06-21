import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const Register = ({ switchAuth }) => {
  const { t } = useTranslation();
  const [userInformation, setUserInformation] = useState({});
  const [isError, setIsError] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const isValid = value !== '';

    setUserInformation({
      ...userInformation,
      [name]: isValid ? value : ''
    });

    if (isError) {
      setIsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInformation)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        switchAuth();
      }
    } catch (error) {
      const errorMessage = t(`error.${error.message}`);
      setIsError(true);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        action: (key) => (
          <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow">
      <Stack className="flex-grow">
        <Stack spacing={2}>
          <Typography variant="h4">{t('auth.register.title')}</Typography>
          <Divider />
          <TextField
            name="username"
            label={t('auth.register.username')}
            variant="outlined"
            value={userInformation.username || ''}
            onChange={handleInputChange}
            error={isError}
          />
          <TextField
            name="email"
            label={t('auth.register.email')}
            variant="outlined"
            value={userInformation.email || ''}
            onChange={handleInputChange}
            error={isError}
          />
          <TextField
            name="password"
            label={t('auth.register.password')}
            variant="outlined"
            type="password"
            value={userInformation.password || ''}
            onChange={handleInputChange}
            error={isError}
          />
          <Button variant="contained" type="submit">
            {t('auth.register.register')}
          </Button>
        </Stack>
        <Typography onClick={switchAuth} className="hover:underline hover:cursor-pointer">
          {t('auth.register.haveAccount')}
        </Typography>
      </Stack>
    </form>
  );
};
