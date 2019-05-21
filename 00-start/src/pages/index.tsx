import * as React from 'react';
import { SEO } from 'common/components';
import { AppLayout } from 'layout';
import { Home } from 'pods/home';

const IndexPage = props => (
  <AppLayout
    seoComponent={
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
    }
  >
    <Home />
  </AppLayout>
);

export default IndexPage;
