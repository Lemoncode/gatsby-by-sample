import { css } from '@emotion/core';
import { colors } from './colors';
import { weights } from './weights';
import { fontFamily } from '../styles';

export interface Typography {
  home: {
    title;
    subtitle;
  };
  title;
  headerLink;
  body;
  thumbnail: {
    title;
    subtitle;
    description;
  };
  formError;
  button;
  copyright;
}

const common = css`
  font-family: ${fontFamily};
`;

export const typography: Typography = {
  home: {
    title: css`
      ${common}
      font-size: 3rem;
      font-weight: ${weights.light};
      color: ${colors.light};
    `,
    subtitle: css`
      ${common}
      font-size: 1rem;
      font-weight: ${weights.regular};
      color: ${colors.light};
    `,
  },
  title: css`
    ${common}
    font-size: 2.5rem;
    font-weight: ${weights.bold};
    color: ${colors.dark};
    text-align: center;
  `,
  headerLink: css`
    ${common}
    font-size: 0.8rem;
    font-weight: ${weights.bold};
    color: ${colors.light};
  `,
  body: css`
    ${common}
    font-size: 1.05rem;
    font-weight: ${weights.regular};
    color: ${colors.dark};
    text-align: center;
  `,
  thumbnail: {
    title: css`
      ${common}
      font-size: 1rem;
      font-weight: ${weights.bold};
      color: ${colors.dark};
      text-align: center;
    `,
    subtitle: css`
      ${common}
      font-size: 0.9rem;
      font-weight: ${weights.regular};
      color: ${colors.dark};
      text-align: center;
    `,
    description: css`
      ${common}
      font-size: 0.8rem;
      font-weight: ${weights.regular};
      color: ${colors.dark};
      text-align: center;
    `,
  },
  formError: css`
    ${common}
    font-size: 0.8rem;
    font-weight: ${weights.regular};
    color: ${colors.error};
  `,
  button: css`
    ${common}
    font-size: 1rem;
    font-weight: ${weights.regular};
    color: ${colors.light};
  `,
  copyright: css`
    ${common}
    font-size: 0.8rem;
    font-weight: ${weights.regular};
    color: ${colors.dark};
  `,
};
