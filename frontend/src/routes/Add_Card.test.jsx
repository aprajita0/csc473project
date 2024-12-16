import { render, screen, fireEvent } from '@testing-library/react';
import Add_Card from './Add_Card';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Add_Card - Cost Field', () => {
  let costInput;

  beforeEach(() => {
    render(
      <Router>
        <Add_Card />
      </Router>
    );
    costInput = screen.getByLabelText(/Cost:/i);
  });

  test('Cost: should allow valid numbers with up to two decimal places', () => {
    fireEvent.change(costInput, { target: { value: '20.99' } });
    expect(costInput.value).toBe('20.99');
  });

  test('Cost: should allow valid whole numbers', () => {
    fireEvent.change(costInput, { target: { value: '15' } });
    expect(costInput.value).toBe('15');
  });

  test('Cost: should reject invalid values with more than two decimal places', () => {
    fireEvent.change(costInput, { target: { value: '20.999' } });
    expect(costInput.value).toBe('');
  });

  test('Cost: should reject invalid non-numeric values', () => {
    fireEvent.change(costInput, { target: { value: 'abc' } });
    expect(costInput.value).toBe('');
  });

  test('Cost: should reject values less than 1', () => {
    fireEvent.change(costInput, { target: { value: '0.99' } });
    expect(costInput.value).toBe('');
    fireEvent.change(costInput, { target: { value: '0' } });
    expect(costInput.value).toBe('');
    fireEvent.change(costInput, { target: { value: '-1.23' } });
    expect(costInput.value).toBe('');
  });
});
