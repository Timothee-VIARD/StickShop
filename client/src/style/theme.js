import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/lora';

export const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#ffffff' }
  },
  typography: {
    fontFamily: 'Lora Variable, serif'
  }
});
