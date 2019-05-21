import * as React from 'react';
import { graphql } from 'gatsby';
import { SEO, Post } from 'common/components';
import { AppLayout } from 'layout';

// query($slug: String) {
//   post: contentfulPost(path: { eq: $slug }) {
//     title
//     date
//     body {
//       childMarkdownRemark {
//         html
//       }
//     }
//   }
// }
export const query = graphql`
`;

interface Props {
  data: { post };
  pageContext: {
    title: string;
    date: string;
    slug: string;
  };
}

const PostTemplate: React.StatelessComponent<Props> = ({
  pageContext,
  data,
}) => {
  return (
    <AppLayout
      pathname={pageContext.slug}
      seoComponent={
        <SEO
          title={data.post.title}
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
      <Post
        title={data.post.title}
        date={data.post.date}
        body={data.post.body.childMarkdownRemark.html}
      />
    </AppLayout>
  );
};

export default PostTemplate;
