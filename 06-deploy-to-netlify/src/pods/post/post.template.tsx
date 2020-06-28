import React from 'react';
import { graphql } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layouts';
import { Post } from './post.component';

export const query = graphql`
  query($slug: String) {
    post: contentfulPost(path: { eq: $slug }) {
      title
      date
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

interface Props {
  data: { post };
  pageContext: {
    slug: string;
  };
}

const PostTemplate: React.FunctionComponent<Props> = (props) => {
  const {
    pageContext: { slug },
    data: {
      post: {
        title,
        date,
        body: {
          childMarkdownRemark: { html },
        },
      },
    },
  } = props;

  return (
    <AppLayout
      pathname={slug}
      seoComponent={
        <SEO
          title={title}
          keywords={[
            'lemoncode',
            'gatsby',
            'gatsby by sample',
            'frontent',
            'ssr',
            slug,
          ]}
        />
      }
    >
      <Post title={title} date={date} body={html} />
    </AppLayout>
  );
};

export default PostTemplate;
