import React from 'react';
import { cx } from 'emotion';
import { navigate } from 'gatsby';
import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { getPageName } from './app-bar.business';
import { routes } from 'core/routes';
import * as classes from './app-bar.styles';

interface Props {
  className?: string;
  pathname: string;
}

export const AppBar: React.FunctionComponent<Props> = props => {
  const { pathname, className } = props;
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
    <Bar className={cx(classes.root, className)} position="static">
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
        <Typography variant="h2" className={classes.title}>
          {getPageName(pathname)}
        </Typography>
      </Toolbar>
    </Bar>
  );
};
