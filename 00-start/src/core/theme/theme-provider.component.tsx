import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { theme } from './theme';

export const ThemeProviderComponent = props => {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
