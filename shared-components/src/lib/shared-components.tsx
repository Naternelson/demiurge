import styled from '@emotion/styled';

const StyledSharedComponents = styled.div`
  color: pink;
`;

export function SharedComponents() {
  return (
    <StyledSharedComponents>
      <h1>Welcome to SharedComponents!</h1>
    </StyledSharedComponents>
  );
}

export default SharedComponents;
