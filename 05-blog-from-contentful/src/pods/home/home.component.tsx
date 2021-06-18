import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
import * as classes from './home.styles';

const query = graphql`
  query {
    homeLogo: file(relativePath: { eq: "home-logo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
      }
    }
  }
`;

export const Home: React.FunctionComponent = () => {
  const { homeLogo } = useStaticQuery(query);
  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
      <GatsbyImage image={getImage(homeLogo)} alt="Lemoncode logo" />
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};
