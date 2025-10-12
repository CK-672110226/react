import React from 'react';
import GlobalStyle from './features/GlobalStyle';
import StyledNavbar from './features/StyledNavbar';
import StyledContainer from './features/StyledContainer';
import StyledHome from './features/StyledHome';

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledNavbar />
      <StyledContainer>
        <StyledHome />
      </StyledContainer>
    </>
  );
}

export default App;