import { styled } from 'core/styles';

export const AppBar = styled.div`
  && {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.headerTitle};
  margin-left: 1rem;
`;
