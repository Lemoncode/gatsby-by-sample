import * as React from 'react';
import { PageRendererProps } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layout';

const IndexPage: React.FunctionComponent<PageRendererProps> = props => (
  <AppLayout
  pathname={props.location.pathname}
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
