import AvailableProducts from "../AvailableProducts/AvailableProducts";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import {Grid} from "@mui/material";
import { CartProvider } from '../../context/CartContext';

/**
 * Commponent for the main
 */
const Main = () => (
  <CartProvider>
    <main>
      <Grid container spacing={2} className="px-4 pb-4">
        <Grid item xs={4} sm={3} lg={2}>
          <ShoppingCart/>
        </Grid>
        <Grid item xs={8} sm={9} lg={10}>
          <AvailableProducts/>
        </Grid>
      </Grid>
    </main>
  </CartProvider>
);

export default Main;
