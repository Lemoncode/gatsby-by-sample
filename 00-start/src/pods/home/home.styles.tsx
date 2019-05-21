import { styled } from 'core/styles';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.title};
`;

export const Subtitle = styled.h2`
  ${({ theme }) => theme.typography.subtitle};
`;
