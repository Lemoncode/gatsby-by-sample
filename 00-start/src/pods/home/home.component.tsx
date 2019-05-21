import * as React from 'react';
import { Link } from 'gatsby';
import { routes } from 'core/routes';
const logo = require('core/images/home-logo.png');
import * as s from './home.styles';

export const Home: React.FunctionComponent = () => (
  <s.Container>
    <s.Title>Welcome to this website</s.Title>
    <s.Title>(Image here)</s.Title>
    <s.Subtitle>
      Check out our <Link to={routes.blog}>blog</Link>
    </s.Subtitle>
  </s.Container>
);
