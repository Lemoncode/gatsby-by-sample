import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import * as s from './blog.styles';
const StyledPost = s.Post.withComponent(Link);

const query = graphql`
  query {
    postListQuery: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
          }
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
          {postListQuery.edges.map(edge => (
            <StyledPost
              to={edge.node.frontmatter.path}
              key={edge.node.frontmatter.title}
            >
              {edge.node.frontmatter.title}
            </StyledPost>
          ))}
        </s.Posts>
      </s.Container>
    )}
  />
);
