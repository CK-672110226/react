import React from 'react';
import Navbar from './features/Navbar.js';
import Container from './features/Container.js';
import Home from './features/Home.js';
function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <Home />
      </Container>
    </div>
  );
}

export default App;