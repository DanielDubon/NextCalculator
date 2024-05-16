"use client";

import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [operator, setOperator] = useState(null);
    const [operand, setOperand] = useState(null);
    const [isNewOperand, setIsNewOperand] = useState(true);

    const updateDisplay = (value) => {
        // Asegurarse de que el valor de display no exceda los 9 caracteres
        if (value.length > 9) {
            setDisplay(value.substring(0, 9));
        } else {
            setDisplay(value);
        }
    };

    const handleNumberClick = (number) => {
        if (isNewOperand) {
            updateDisplay(number);
            setIsNewOperand(false);
        } else {
            if (display.length < 9) {
                updateDisplay(display === '0' ? number : display + number);
            }
        }
    };

    const handleOperatorClick = (op) => {
        setIsNewOperand(true);
        if (operator && operand !== null) {
            const result = calculateResult();
            if (result === 'ERROR') {
                updateDisplay('ERROR');
            } else {
                updateDisplay(result.toString());
            }
        }
        setOperator(op);
        setOperand(parseFloat(display));
    };

    const handleDecimalClick = () => {
        if (!display.includes('.') && display.length < 9) {
            updateDisplay(display + '.');
            setIsNewOperand(false);
        }
    };

    const calculateResult = () => {
        let result;
        switch (operator) {
            case '+':
                result = operand + parseFloat(display);
                break;
            case '-':
                result = operand - parseFloat(display);
                break;
            case '*':
                result = operand * parseFloat(display);
                break;
            case '/':
                result = operand / parseFloat(display);
                break;
            default:
                result = parseFloat(display);
        }
        if (result > 999999999 || result < 0) return 'ERROR';
        return result.toString().substring(0, 9); // Asegurar que el resultado no exceda los 9 caracteres
    };

    const handleEqualClick = () => {
        const result = calculateResult();
        updateDisplay(result.toString());
        setOperator(null);
        setOperand(null);
        setIsNewOperand(true);
    };

    const handleClearClick = () => {
        updateDisplay('0');
        setOperator(null);
        setOperand(null);
        setIsNewOperand(true);
    };

    const handleToggleSignClick = () => {
        if (display === '0') return;

        if (display.startsWith('-')) {
            updateDisplay(display.substring(1));
        } else if (display.length < 9) {
            updateDisplay('-' + display);
        }
    };

    return (
        <div className={styles.calculator}>
            <div className={styles.display}>{display}</div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => handleNumberClick('1')}>1</button>
                <button className={styles.button} onClick={() => handleNumberClick('2')}>2</button>
                <button className={styles.button} onClick={() => handleNumberClick('3')}>3</button>
                <button className={styles.button} onClick={() => handleOperatorClick('+')}>+</button>
                <button className={styles.button} onClick={() => handleNumberClick('4')}>4</button>
                <button className={styles.button} onClick={() => handleNumberClick('5')}>5</button>
                <button className={styles.button} onClick={() => handleNumberClick('6')}>6</button>
                <button className={styles.button} onClick={() => handleOperatorClick('-')}>-</button>
                <button className={styles.button} onClick={() => handleNumberClick('7')}>7</button>
                <button className={styles.button} onClick={() => handleNumberClick('8')}>8</button>
                <button className={styles.button} onClick={() => handleNumberClick('9')}>9</button>
                <button className={styles.button} onClick={() => handleOperatorClick('*')}>*</button>
                <button className={styles.button} onClick={() => handleClearClick()}>C</button>
                <button className={styles.button} onClick={() => handleNumberClick('0')}>0</button>
                <button className={styles.button} onClick={handleDecimalClick}>.</button>
                <button className={styles.button} onClick={() => handleOperatorClick('/')}>/</button>
                <button className={styles.button} onClick={handleToggleSignClick}>+/-</button>
                <button className={styles.button} onClick={handleEqualClick}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
