import { Box, Drawer } from '@mui/material';
import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import { CartContext } from '../../../contexts/CartContext';
import { LocalGroceryStore } from '@mui/icons-material';

export const ShoppingCartDrawer = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const { getTotalNumber } = useContext(CartContext);

  const handleDrawerToggle = () => {
    setShopOpen((prevState) => !prevState);
  };

  return (
    <>
      <IconButton onClick={handleDrawerToggle}>
        {getTotalNumber() > 0 ? <LocalGroceryStore /> : <LocalGroceryStoreOutlinedIcon />}
        {getTotalNumber() > 0 && <Box className="absolute top-1 right-1 bg-red-700 w-2 h-2 rounded-2xl"></Box>}
      </IconButton>
      <Drawer
        open={shopOpen}
        onClose={handleDrawerToggle}
        anchor={'right'}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <ShoppingCart closeDrawer={handleDrawerToggle} />
      </Drawer>
    </>
  );
};
