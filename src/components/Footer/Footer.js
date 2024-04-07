import { Typography } from '@mui/material';
import '../../style/global.css';

/**
 * Commponent for the footer
 */
const Banner = () => (
  <footer className="mainColor p-2 px-8 text-left flex gap-5">
    <Typography fontWeight="bold" variant="h6" className="flex items-center">
      StickLand
    </Typography>
  </footer>
);

export default Banner;
