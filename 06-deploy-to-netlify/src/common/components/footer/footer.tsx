import * as React from 'react';
import * as s from './footer.styles';

interface Props {
  className?: string;
}

export const Footer: React.FunctionComponent<Props> = props => (
  <s.Container className={props.className}>
    <s.Line />
    <s.Footer>Copyright 2019 Lemoncode. All Rights Reserved.</s.Footer>
  </s.Container>
);
