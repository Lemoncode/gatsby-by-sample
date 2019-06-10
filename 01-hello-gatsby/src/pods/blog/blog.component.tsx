import * as React from 'react';
import { Link } from 'gatsby';
import * as s from './blog.styles';
const PostTitle = s.PostTitle.withComponent(Link);

export const Blog: React.FunctionComponent = () => (
  <s.Container>
    <s.Title>Blog Page</s.Title>
    <s.Posts>
      <PostTitle to="/my-post">My post</PostTitle>
    </s.Posts>
  </s.Container>
);
