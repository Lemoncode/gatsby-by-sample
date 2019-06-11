import * as React from 'react';
import { navigate } from 'gatsby';
import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { RootRef } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as s from './app-bar.styles';
import { getPageName } from './app-bar.business';
import { routes } from 'core/routes';

const AppBarStyled = s.AppBar.withComponent(Bar);

interface Props {
  className?: string;
  pathname: string;
}

export const AppBar: React.FunctionComponent<Props> = props => {
  const [isOpen, setOpen] = React.useState(false);
  const [element, setElement] = React.useState(null);

  const navigateTo = route => () => {
    onCloseMenu();
    navigate(route);
  };

  const onOpenMenu = e => {
    setElement(e.currentTarget);
    setOpen(true);
  };

  const onCloseMenu = () => {
    setElement(null);
    setOpen(false);
  };

  return (
    <AppBarStyled className={props.className} position="static">
      <Toolbar variant="dense">
        <IconButton
          aria-label="Open drawer"
          onClick={onOpenMenu}
          itemRef={element}
        >
          <MenuIcon />
        </IconButton>
        <Menu open={isOpen} onClose={onCloseMenu} anchorEl={element}>
          <MenuItem onClick={navigateTo(routes.home)}>Home</MenuItem>
          <MenuItem onClick={navigateTo(routes.blog)}>Blog</MenuItem>
        </Menu>
        <s.Title>{getPageName(props.pathname)}</s.Title>
      </Toolbar>
    </AppBarStyled>
  );
};
