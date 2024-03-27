import {Box, Button, Stack, Typography} from "@mui/material";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box className="flex flex-col justify-between h-screen">
      <Banner/>
      <Stack spacing={2} className="flex flex-col items-center justify-center h-full">
        <Typography variant='h4' className="font-bold">
          404 - Page Not Found
        </Typography>
        <Typography variant='body1'>
          La page que vous recherchez n'existe pas.
        </Typography>
        <Button component={Link} to="/" color="inherit">
          <Typography variant='body1'>
            Retourner en lieu sûr
          </Typography>
        </Button>
      </Stack>
      <Footer/>
    </Box>
  );
}

export default PageNotFound;