import * as React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import * as s from './blog.styles';
const PostTitle = s.PostTitle.withComponent(Link);

const query = graphql`
  query {
    postListQuery: allContentfulPost(sort: { fields: date, order: ASC }) {
      nodes {
        title
        path
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
            <PostTitle to={node.path} key={node.title}>
              {node.title}
            </PostTitle>
          ))}
        </s.Posts>
      </s.Container>
    )}
  />
);
