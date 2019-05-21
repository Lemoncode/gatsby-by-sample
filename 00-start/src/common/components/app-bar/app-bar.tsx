import * as React from 'react';
import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as s from './app-bar.styles';

const AppBarStyled = s.AppBar.withComponent(Bar);

interface Props {
  className?: string;
}

export const AppBar: React.FunctionComponent<Props> = props => (
  <AppBarStyled className={props.className} position="static">
    <Toolbar variant="dense">
      <IconButton aria-label="Open drawer">
        <MenuIcon />
      </IconButton>
      <s.Title>Home</s.Title>
    </Toolbar>
  </AppBarStyled>
);
