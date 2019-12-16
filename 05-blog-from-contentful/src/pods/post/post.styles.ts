import { css } from 'emotion';
import { theme } from 'core/theme';

export const root = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > :nth-child(n) {
    margin-top: 1rem;
  }
`;

export const body = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin-top: 3rem;
  font-size: 2rem;
`;
