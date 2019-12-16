import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { theme } from './theme';

export const ThemeProviderComponent = props => {
  const { children } = props;

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};
