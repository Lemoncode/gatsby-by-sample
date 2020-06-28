import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as classes from './post.styles';

interface Props {
  title: string;
  date: string;
  body;
}

export const Post: React.FunctionComponent<Props> = (props) => {
  const { title, date, body } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="subtitle1">{date}</Typography>
      <div
        className={classes.body}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
};
