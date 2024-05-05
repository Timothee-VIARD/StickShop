import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const SignUp = ({ switchAuth }) => {
  const { t } = useTranslation();
  const [userInformation, setUserInformation] = useState({ username: '', email: '', password: '' });

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
      const response = await fetch('http://localhost:3001/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInformation)
      });

      if (!response.ok) {
        throw new Error("Erreur de d'inscription");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Erreur de d'inscription", error);
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
          />
          <TextField
            name="email"
            label={t('auth.register.email')}
            variant="outlined"
            value={userInformation.email || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="password"
            label={t('auth.register.password')}
            variant="outlined"
            value={userInformation.password || ''}
            onChange={handleInputChange}
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
