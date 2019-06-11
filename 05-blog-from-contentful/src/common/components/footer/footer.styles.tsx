import { styled } from 'core/styles';

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Line = styled.div`
  height: 1px;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Footer = styled.footer`
  padding-top: 1rem;
  ${({ theme }) => theme.typography.footer};
`;
