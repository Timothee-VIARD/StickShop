import { Box, Button, Stack, Typography } from '@mui/material';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../style/global.css';

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <Box className="flex flex-col justify-between h-screen">
      <Box className="pt-14">
        <Banner />
      </Box>
      <Stack spacing={2} className="flex flex-col items-center justify-center h-full">
        <Typography variant="h4" className="font-bold">
          {t('pageNotFound.title')}
        </Typography>
        <Typography variant="body1">{t('pageNotFound.message')}</Typography>
        <Button component={Link} to="/" color="inherit">
          <Typography variant="body1">{t('pageNotFound.return')}</Typography>
        </Button>
      </Stack>
      <Footer />
    </Box>
  );
};
