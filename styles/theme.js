import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6702F3',
    },
    secondary: {
      main: '#9A41FF',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;