import * as React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { global } from 'core/styles';
import { theme } from 'core/theme';
import { AppBar, Footer } from 'common/components';
import * as s from './app-layout.styles';

const StyledHeader = s.Header.withComponent(AppBar);
const StyledFooter = s.Footer.withComponent(Footer);
interface Props {
  seoComponent: React.ReactNode;
  pathname: string;
}

export const AppLayout: React.StatelessComponent<Props> = ({
  seoComponent,
  children,
  pathname,
}) => (
  <ThemeProvider theme={theme}>
    <Global styles={global} />
    {seoComponent}
    <s.Layout>
      <StyledHeader pathname={pathname}/>
      <s.Body>{children}</s.Body>
      <StyledFooter />
    </s.Layout>
  </ThemeProvider>
);
