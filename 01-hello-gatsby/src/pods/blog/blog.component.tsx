import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import * as classes from './blog.styles';

export const Blog: React.FunctionComponent = () => {
  return (
    <div className={classes.root}>
      <Typography variant="h1">Blog Page</Typography>
      <div className={classes.posts}>
        <Link className={classes.postTitle} to="/my-post">
          My post
        </Link>
      </div>
    </div>
  );
};
