import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders App component', () => {
    const { getByText } = render(<App />);
    const headingElement = getByText(/String Calculator/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('input field changes value correctly', () => {
    const { getByRole } = render(<App />);
    const inputField = getByRole('textbox');
    fireEvent.change(inputField, { target: { value: '1,2' } });
    expect(inputField.value).toBe('1,2');
  });

  test('form submission calculates result correctly', () => {
    const { getByRole, getByText } = render(<App />);
    const inputElement = getByRole('textbox');
    const submitButton = getByRole('button', { name: /calculate/i });
    fireEvent.change(inputElement, { target: { value: '1,2,3' } });
    fireEvent.click(submitButton);
    const resultElement = getByText(/Result:/i);
    expect(resultElement).toHaveTextContent(6)

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(submitButton);
    const resultElement1 = getByText(/Result:/i);
    expect(resultElement1).toHaveTextContent(0);

    fireEvent.change(inputElement, { target: { value: "-1,2,-3" } });
    fireEvent.click(submitButton);
    const resultElement2 = getByText(/Result:/i);
    expect(resultElement2).toHaveTextContent("Negative numbers not allowed: -1, -3");

    fireEvent.change(inputElement, { target: { value: "//;\n1;2;3" } });
    fireEvent.click(submitButton);
    const resultElement3 = getByText(/Result:/i);
    expect(resultElement3).toHaveTextContent(6);
    

    fireEvent.change(inputElement, { target: { value: "//[*][%]\n1*2%3" } });
    fireEvent.click(submitButton);
    const resultElement4 = getByText(/Result:/i);
    expect(resultElement4).toHaveTextContent(6);

    fireEvent.change(inputElement, { target: { value: '1,\\n'} });
    fireEvent.click(submitButton);
    const resultElement5 = getByText(/Result:/i);
    expect(resultElement5).toHaveTextContent('Invalid');

  });
});
