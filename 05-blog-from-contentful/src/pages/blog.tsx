import React from 'react';
import { PageRendererProps } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layouts';
import { Blog } from 'pods/blog';

const BlogPage: React.FunctionComponent<PageRendererProps> = (props) => {
  const { location } = props;

  return (
    <AppLayout
      pathname={location.pathname}
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
      <Blog />
    </AppLayout>
  );
};

export default BlogPage;
