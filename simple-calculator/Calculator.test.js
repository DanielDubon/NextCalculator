import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './components/Calculator';

test('adds numbers correctly', () => {
    render(<Calculator />);
    const button1 = screen.getByText('1');
    const button2 = screen.getByText('2');
    const buttonAdd = screen.getByText('+');
    const buttonEqual = screen.getByText('=');
    const displayElement = screen.getByTestId('display');

    fireEvent.click(button1);
    fireEvent.click(buttonAdd);
    fireEvent.click(button2);
    fireEvent.click(buttonEqual);

    expect(displayElement).toHaveTextContent('3');
});


test('multiply numbers correctly', () => {
    render(<Calculator />);
    const button1 = screen.getByText('1');
    const button2 = screen.getByText('2');
    const buttonMulti = screen.getByText('*');
    const buttonEqual = screen.getByText('=');
    const displayElement = screen.getByTestId('display');

    fireEvent.click(button1);
    fireEvent.click(buttonMulti);
    fireEvent.click(button2);
    fireEvent.click(buttonEqual);

    expect(displayElement).toHaveTextContent('2');
});


test('Divide numbers correctly', () => {
    render(<Calculator />);
    const button1 = screen.getByText('2');
    const button2 = screen.getByText('2');
    const buttonDivide = screen.getByText('/');
    const buttonEqual = screen.getByText('=');
    const displayElement = screen.getByTestId('display');

    fireEvent.click(button1);
    fireEvent.click(buttonDivide);
    fireEvent.click(button2);
    fireEvent.click(buttonEqual);

    expect(displayElement).toHaveTextContent('1');
});

test('change numbers to negative correctly', () => {
    render(<Calculator />);
    const button1 = screen.getByText('2');
    const buttonChangeNumber = screen.getByText('+/-');
    const displayElement = screen.getByTestId('display');

    fireEvent.click(button1);
    fireEvent.click(buttonChangeNumber);

    expect(displayElement).toHaveTextContent('-2');
});


test('Delete content in display correctly', () => {
    render(<Calculator />);
    const button1 = screen.getByText('2');
    const button2 = screen.getByText('3');
    const buttonDelete = screen.getByText('C');

    const displayElement = screen.getByTestId('display');

    fireEvent.click(button1);
    fireEvent.click(buttonDelete);
    fireEvent.click(button2);

    expect(displayElement).toHaveTextContent('3');
});