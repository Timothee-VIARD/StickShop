import { Typography } from '@mui/material';

/**
 * Commponent for the footer
 */
const Banner = () => (
  <footer className="bg-lime-600 p-2 px-8 text-left flex gap-5">
    <Typography fontWeight="bold" variant="h6" className="flex items-center">
      StickLand
    </Typography>
  </footer>
);

export default Banner;
