import { Box } from '@mui/material';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { Contact } from '../components/Contact/Contact';

export const ContactPage = () => {
  return (
    <Box className="backgroundColor flex flex-col justify-between h-full">
      <Box className="pt-14">
        <Banner />
      </Box>
      <Contact />
      <Footer />
    </Box>
  );
};
