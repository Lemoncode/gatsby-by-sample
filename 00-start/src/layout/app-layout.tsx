import React from 'react';
import { ThemeProviderComponent } from 'core/theme';
import { AppBar, Footer } from 'common/components';
import * as classes from './app-layout.styles';

interface Props {
  seoComponent: React.ReactNode;
  pathname: string;
}

export const AppLayout: React.StatelessComponent<Props> = props => {
  const {
    seoComponent,
    children,
    pathname,
  } = props;
  return (
    <ThemeProviderComponent>
      {seoComponent}
      <div className={classes.root}>
        <AppBar className={classes.header} pathname={pathname}/>
        <div className={classes.body}>{children}</div>
        <Footer className={classes.footer} />
      </div>
    </ThemeProviderComponent>
  );
}
