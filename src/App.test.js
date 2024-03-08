import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the component', () => {
    const { getByText, getByLabelText } = render(<App />);
    expect(getByText('String Calculator')).toBeInTheDocument();
    expect(getByLabelText('input')).toBeInTheDocument();
    expect(getByText('Calculate')).toBeInTheDocument();
    expect(getByText('Result: 0')).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const { getByLabelText } = render(<App />);
    const input = getByLabelText('input');
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  test('calculates result correctly on submit', () => {
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText('input');
    fireEvent.change(input, { target: { value: '1,2,3' } });
    const calculateButton = getByText('Calculate');
    fireEvent.click(calculateButton);
    expect(getByText('Result: 6')).toBeInTheDocument();
  });
});
