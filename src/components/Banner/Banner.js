import logo from '../../assets/LogoSitckLand.png';
import './Banner.css';
import {Typography} from "@mui/material";


/**
 * Commponent for the banner
 */
const Banner = () => (
  <header className="bg-lime-600 p-4 text-left flex gap-5 sticky top-0 z-40">
    <img src={logo} alt="Logo" className="h-10 rotate-logo"/>
    <Typography fontWeight="bold" variant="h5" className="flex items-center">
      StickLand
    </Typography>
  </header>
);

export default Banner;
