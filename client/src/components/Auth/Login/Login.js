import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const Login = ({ switchAuth }) => {
  const { t } = useTranslation();
  const [userInformation, setUserInformation] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const isValid = value !== '';

    setUserInformation({
      ...userInformation,
      [name]: isValid ? value : ''
    });
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
        throw new Error('Erreur de connexion');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Erreur de connexion', error);
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
          />
          <TextField
            name="password"
            label={t('auth.login.password')}
            variant="outlined"
            value={userInformation.password || ''}
            onChange={handleInputChange}
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
