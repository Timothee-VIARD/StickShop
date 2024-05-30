import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/lora';

const themeMode = localStorage.getItem('theme') || 'lightMode';

export const theme = createTheme({
  palette: {
    mode: themeMode === 'darkMode' ? 'dark' : 'light',
    primary: { main: themeMode === 'darkMode' ? '#fff9eb' : '#212121' },
    secondary: { main: themeMode === 'darkMode' ? '#395227' : '#80ad61' },
    backgroundColor: { main: themeMode === 'darkMode' ? '#282725' : '#fff9eb' },
    cardBg: { main: themeMode === 'darkMode' ? '#33312b' : '#fef6d9' }
  },
  typography: {
    fontFamily: 'Lora Variable, serif'
  }
});
