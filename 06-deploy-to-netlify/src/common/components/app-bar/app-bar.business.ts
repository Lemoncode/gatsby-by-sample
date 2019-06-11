import { routes } from 'core/routes';

export const getPageName = (pathname: string) =>
  pathname === routes.home ? 'Home' : 'Blog';
