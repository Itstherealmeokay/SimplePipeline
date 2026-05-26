import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/hello world/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders pipeline demo text', () => {
  render(<App />);
  const paragraphElement = screen.getByText(/jenkins pipeline demo/i);
  expect(paragraphElement).toBeInTheDocument();
});