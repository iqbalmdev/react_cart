import { createTheme } from '@mui/material/styles';
import { typography } from './typography';
import palette from './palette'; // Assume you already have the palette setup

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase text by default
        },
      },
    },
  },
});

export default theme;
