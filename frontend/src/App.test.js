import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders app with initial state', () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  
  expect(getByPlaceholderText('@Username')).toBeInTheDocument();
  expect(getByPlaceholderText('#Room')).toBeInTheDocument();

  // Use a custom text matcher to find the text
  expect(getByText((content, element) => content.includes('BChat A Multi Room Chat Application'))).toBeInTheDocument();
});


