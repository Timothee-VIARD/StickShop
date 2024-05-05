import { Box } from '@mui/material';
import { Auth } from '../components/Auth/Auth';

export const AuthPage = () => {
  return (
    <Box className="flex flex-col justify-between h-full">
      <Auth />
    </Box>
  );
};
