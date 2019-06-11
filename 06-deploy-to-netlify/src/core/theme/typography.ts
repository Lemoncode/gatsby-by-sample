import { css } from '@emotion/core';
import { colors } from './colors';
import { weights } from './weights';
import { fontFamily } from '../styles';

export interface Typography {
  headerTitle;
  title;
  subtitle;
  body;
  footer;
}

const common = css`
  font-family: ${fontFamily};
`;

export const typography: Typography = {
  headerTitle: css`
    ${common}
    font-size: 1.25rem;
    font-weight: ${weights.bold};
    color: ${colors.secondary};
  `,
  title: css`
    ${common}
    font-size: 2.5rem;
    font-weight: ${weights.bold};
    color: ${colors.secondary};
    text-align: center;
  `,
  subtitle: css`
    ${common}
    font-size: 1.5rem;
    font-weight: ${weights.bold};
    color: ${colors.secondary};
    text-align: center;
  `,
  body: css`
    ${common}
    font-size: 1.05rem;
    font-weight: ${weights.regular};
    color: ${colors.secondary};
    text-align: center;
  `,
  footer: css`
    ${common}
    font-size: 0.8rem;
    font-weight: ${weights.regular};
    color: ${colors.secondary};
  `,
};
