import { css } from 'emotion';

export const root = css`
  height: 99.9vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
  "header"
  "body"
  "footer";
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
`

export const header = css`
  grid-area: header;
`;

export const body = css`
  margin-left: 10%;
  margin-right: 10%;
  grid-area: body;
`;

export const footer = css`
  grid-area: footer;
`;

