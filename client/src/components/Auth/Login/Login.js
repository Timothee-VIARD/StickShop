import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const Login = ({ switchAuth }) => {
  const { t } = useTranslation();
  const [userInformation, setUserInformation] = useState({});
  const [isError, setIsError] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, []);

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
      const response = await fetch('http://localhost:3001/auth/login', {
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
        const data = await response.json();
        localStorage.setItem('token', data.token);
        const user = {
          id: data.userId,
          username: data.username,
          role: data.role
        };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/';
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
      <Stack>
        <Stack spacing={2}>
          <Typography variant="h4">{t('auth.login.title')}</Typography>
          <Divider />
          <TextField
            name="email"
            label={t('auth.login.email')}
            variant="outlined"
            value={userInformation.email || ''}
            onChange={handleInputChange}
            error={isError}
          />
          <TextField
            name="password"
            label={t('auth.login.password')}
            variant="outlined"
            type="password"
            value={userInformation.password || ''}
            onChange={handleInputChange}
            error={isError}
          />
          <Button variant="contained" type="submit">
            {t('auth.login.login')}
          </Button>
        </Stack>
        <Typography onClick={switchAuth} className="hover:underline hover:cursor-pointer">
          {t('auth.login.noAccount')}
        </Typography>
      </Stack>
    </form>
  );
};
