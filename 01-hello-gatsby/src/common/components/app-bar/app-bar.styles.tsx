import { css } from 'emotion';
import { theme } from 'core/theme';

export const root = css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.secondary.main};
`;

export const title = css`
  ${theme.typography.h6.fontSize};
  ${theme.typography.h6.fontWeight};
  ${theme.palette.secondary.main};
  margin-left: 1rem;
`;
