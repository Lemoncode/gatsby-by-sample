import React from 'react';
import Image from 'gatsby-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
const logo = require('core/images/home-logo.png');
import * as classes from './home.styles';

const query = graphql`
  query {
    homeLogo: file(relativePath: { eq: "home-logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export const Home: React.FunctionComponent = () => {
  const { homeLogo } = useStaticQuery(query);

  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
      <div className={classes.imageContainer}>
        <Image fluid={homeLogo.childImageSharp.fluid} />
      </div>
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};
