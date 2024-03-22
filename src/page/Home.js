import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import {Box} from "@mui/material";

function Home() {
  return (
    <Box>
      <Banner/>
      <Main/>
      <Footer/>
    </Box>
  );
}

export default Home;
