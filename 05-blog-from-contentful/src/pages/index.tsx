import React from 'react';
import { PageRendererProps } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layouts';
import { Home } from 'pods/home';

const IndexPage: React.FunctionComponent<PageRendererProps> = (props) => {
  const { location } = props;
  return (
    <AppLayout
      pathname={location.pathname}
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
};

export default IndexPage;
