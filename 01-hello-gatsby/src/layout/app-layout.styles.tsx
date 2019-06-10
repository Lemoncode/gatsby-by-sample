import { styled } from 'core/styles';

export const Layout = styled.div`
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

export const Header = styled.div`
  grid-area: header;
`;

export const Body = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  grid-area: body;
`;

export const Footer = styled.div`
  grid-area: footer;
`;

