import React from 'react';
import { css } from 'emotion';
import { SEO } from 'common/components';

const root = css`
  background-color: tomato;
  color: white;
  font-size: 4rem;
  font-family: 'Open Sans';
  padding: 2rem;
`;

const IndexPage = () => {
  return (
    <>
      <SEO
        title="Home"
        keywords={[
          'lemoncode',
          'gatsby',
          'gatsby by sample',
          'frontent',
          'ssr',
        ]}
      />
      <div className={root}>Hello from Gatsby</div>
    </>
  );
};

export default IndexPage;
