import * as React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { global } from 'core/styles';
import { theme } from 'core/theme';

interface Props {
  seoComponent: React.ReactNode;
}

export const AppLayout: React.StatelessComponent<Props> = ({
  seoComponent,
  children,
}) => (
  <ThemeProvider theme={theme}>
    <Global styles={global} />
    {seoComponent}
    {children}
  </ThemeProvider>
);
