import * as React from 'react';
import Img from 'gatsby-image';
import { Link, StaticQuery, graphql } from 'gatsby';
import { routes } from 'core/routes';
import * as s from './home.styles';

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

export const Home: React.FunctionComponent = () => (
  <StaticQuery
    query={query}
    render={({ homeLogo }) => (
      <s.Container>
        <s.Title>Welcome to this website</s.Title>
        <s.ImageContainer>
          <Img fluid={homeLogo.childImageSharp.fluid} />
        </s.ImageContainer>
        <s.Subtitle>
          Check out our <Link to={routes.blog}>blog</Link>
        </s.Subtitle>
      </s.Container>
    )}
  />
);
