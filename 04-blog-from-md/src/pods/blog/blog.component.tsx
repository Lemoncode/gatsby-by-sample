import * as React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import * as s from './blog.styles';
const PostTitle = s.PostTitle.withComponent(Link);

const query = graphql`
  query {
    postListQuery: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      nodes {
        frontmatter {
          title
          path
        }
      }
    }
  }
`;

export const Blog: React.FunctionComponent = () => (
  <StaticQuery
    query={query}
    render={({ postListQuery }) => (
      <s.Container>
        <s.Title>Blog Page</s.Title>
        <s.Posts>
          {postListQuery.nodes.map(node => (
            <PostTitle to={node.frontmatter.path} key={node.frontmatter.title}>
              {node.frontmatter.title}
            </PostTitle>
          ))}
        </s.Posts>
      </s.Container>
    )}
  />
);
