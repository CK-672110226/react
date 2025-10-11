import React from 'react';
import Navbar from './features/Navbar.js';
import Container from './features/Container.js';
import Home from './features/Home.js';
function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Home />
      </Container>
    </>
  );
}

export default App;