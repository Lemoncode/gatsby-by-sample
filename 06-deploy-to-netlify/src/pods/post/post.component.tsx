import * as React from 'react';
import * as s from './post.styles';

interface Props {
  title: string;
  date: string;
  body;
}

export const Post: React.FunctionComponent<Props> = ({ title, date, body }) => (
  <s.Container>
    <s.Title>{title}</s.Title>
    <s.Subtitle>{date}</s.Subtitle>
    <s.Body dangerouslySetInnerHTML={{ __html: body }} />
  </s.Container>
);
