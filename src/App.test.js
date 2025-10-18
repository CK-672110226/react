import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Mock axios so Jest doesn't attempt to parse the ESM axios package
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

import App from './App';
import productsReducer from './features/Product/reducers';

test('renders app brand', async () => {
  const store = configureStore({ reducer: { products: productsReducer } });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  // Navbar contains the brand text 'Trendie'
  const brandElement = await screen.findByText(/Trendie/i);
  expect(brandElement).toBeInTheDocument();
});
