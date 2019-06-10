import { styled } from 'core/styles';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.title};
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
`

export const PostTitle = styled.div`
  margin-top: 3rem;
`
