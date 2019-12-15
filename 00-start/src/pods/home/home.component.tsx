import React from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
import * as classes from './home.styles';

export const Home: React.FunctionComponent = () => {
  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
      <Typography variant="h1">(Image here)</Typography>
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};
