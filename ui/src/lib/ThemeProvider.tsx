import { FC, PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import theme from './theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
