import React, {useState} from "react";
import {Box, Grid} from "@mui/material";

/**
 * Commponent for the Menu
 */
const Menu = () => {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Grid item className="p-1 text-left border-2 fixed h-full">

      {open ? (
          <Box
            className="bg-white h-full"
          >
            <Box className="flex justify-end">
              <button onClick={toggleDrawer(false)}>
                <p>Close</p>
              </button>
            </Box>
            <Box className="h-full">
              <p>Menu Item 1</p>
              <p>Menu Item 2</p>
              <p>Menu Item 3</p>
              <p>Menu Item 4</p>
            </Box>
          </Box>
        ) :
        <button onClick={toggleDrawer(true)} className="text-2xl">
          <p>Menu</p>
        </button>
      }
    </Grid>
  );
};

export default Menu;
