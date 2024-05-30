import { Box } from '@mui/material';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { Parameters } from '../components/Parameters/Parameters';

export const ParametersPage = () => {
  return (
    <Box className="flex flex-col justify-between h-[100vh]">
      <Box className="pt-14">
        <Banner />
      </Box>
      <Parameters className="flex-grow" />
      <Footer />
    </Box>
  );
};
