import * as React from 'react';
import { styled } from 'core/styles';
import { SEO } from 'common/components';

const StyledHello = styled.div`
  background-color: tomato;
  color: white;
  font-size: 4rem;
  font-family: 'Open Sans';
  padding: 2rem;
`;

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={['lemoncode', 'gatsby', 'gatsby by sample', 'frontent', 'ssr']}
    />
    <StyledHello>Hello from Gatsby</StyledHello>
  </>
);

export default IndexPage;
