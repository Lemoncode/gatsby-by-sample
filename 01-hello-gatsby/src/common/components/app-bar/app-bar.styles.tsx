import { css } from 'emotion';
import { theme } from 'core/theme';

export const root = css`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.secondary.main};
`;

export const title = css`
  font-size: ${theme.typography.h6.fontSize};
  font-weight: ${theme.typography.h6.fontWeight};
  color: ${theme.palette.secondary.main};
  margin-left: 1rem;
`;
