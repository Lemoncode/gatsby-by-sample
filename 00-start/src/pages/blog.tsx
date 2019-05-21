import * as React from 'react';
import { SEO } from 'common/components';
import { AppLayout } from 'layout';

const IndexPage = () => (
  <AppLayout
    seoComponent={
      <SEO
        title="Blog"
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
    <h1>Blog page</h1>
  </AppLayout>
);

export default IndexPage;
