import * as React from 'react';
import { graphql } from 'gatsby';
import { SEO, Post } from 'common/components';
import { AppLayout } from 'layout';

export const query = graphql`
  query($slug: String) {
    post: markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;

interface Props {
  data: { post };
  pageContext: {
    slug: string;
  };
}

const PostTemplate: React.StatelessComponent<Props> = ({
  pageContext,
  data: {
    post: {
      frontmatter: { title, date },
      html,
    },
  },
}) => {
  return (
    <AppLayout
      pathname={pageContext.slug}
      seoComponent={
        <SEO
          title={title}
          keywords={[
            'lemoncode',
            'gatsby',
            'gatsby by sample',
            'frontent',
            'ssr',
            pageContext.slug,
          ]}
        />
      }
    >
      <Post title={title} date={date} body={html} />
    </AppLayout>
  );
};

export default PostTemplate;
