// libs/ui/src/lib/theme.ts

import { createTheme } from '@mui/material/styles';

const vscodeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007acc',
    },
    secondary: {
      main: '#d65a31',
    },
    background: {
      default: '#1e1e1e',
      paper: '#252526',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontSize: 12,
    h1: {
      fontSize: '1.5rem',
    },
    h2: {
      fontSize: '1.25rem',
    },
    h3: {
      fontSize: '1rem',
    },
    h4: {
      fontSize: '0.875rem',
    },
    h5: {
      fontSize: '0.75rem',
    },
    h6: {
      fontSize: '0.625rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    button: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 3,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#252526',
          border: '1px solid #3c3c3c',
        },
      },
    },
  },
});

export default vscodeTheme;
