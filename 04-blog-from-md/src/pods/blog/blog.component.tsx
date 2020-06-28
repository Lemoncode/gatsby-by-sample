import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link, useStaticQuery, graphql } from 'gatsby';
import * as classes from './blog.styles';

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

export const Blog: React.FunctionComponent = () => {
  const { postListQuery } = useStaticQuery(query);

  return (
    <div className={classes.root}>
      <Typography variant="h1">Blog Page</Typography>
      <div className={classes.posts}>
        {postListQuery.nodes.map((node) => (
          <Link
            className={classes.postTitle}
            to={node.frontmatter.path}
            key={node.frontmatter.title}
          >
            <Typography variant="body1">{node.frontmatter.title}</Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
