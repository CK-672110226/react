import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock axios so Jest doesn't attempt to parse the ESM axios package
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

import App from './App';

test('renders app brand', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Navbar contains the brand text 'Trendie'
  const brandElement = await screen.findByText(/Trendie/i);
  expect(brandElement).toBeInTheDocument();
});
