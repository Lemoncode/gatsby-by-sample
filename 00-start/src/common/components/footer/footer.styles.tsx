import { css } from 'emotion';
import { theme } from 'core/theme';

export const root = css`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const line = css`
  height: 1px;
  width: 90%;
  background-color: ${theme.palette.primary.main};
`;

export const footer = css`
  padding-top: 1rem;
  font-size: ${theme.typography.subtitle2.fontSize};
  color: ${theme.palette.secondary.main};
`;
