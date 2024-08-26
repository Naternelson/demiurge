import styled from '@emotion/styled';
import './firebase-config';

import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="afs-dashboard" />
    </StyledApp>
  );
}

export default App;
