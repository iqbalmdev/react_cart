import { Theme } from '@mui/material/styles';

export const components = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        fontWeight: 600,
        padding: '10px 20px',
        boxShadow: 'none',
        '&.Mui-disabled': {
          backgroundColor: '#e0e0e0',
          color: '#9e9e9e',
        },
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark, // Use palette dark shade
        },
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark, // Use palette dark shade
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      },
    },
  },
});
