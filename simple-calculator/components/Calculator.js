"use client";

import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [operator, setOperator] = useState(null);
    const [operand, setOperand] = useState(null);
    const [isNewOperand, setIsNewOperand] = useState(true);

    const handleNumberClick = (number) => {
        if (isNewOperand) {
            setDisplay(number);
            setIsNewOperand(false);
        } else {
            if (display.length < 9) {
                setDisplay((prevDisplay) => prevDisplay === '0' ? number : prevDisplay + number);
            }
        }
    };

    const handleOperatorClick = (op) => {
        setIsNewOperand(true);
        if (operator && operand !== null) {
            const result = calculateResult();
            if (result === 'ERROR') {
                setDisplay('ERROR');
            } else {
                setDisplay(result.toString());
            }
        }
        setOperator(op);
        setOperand(parseFloat(display));
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
        return result;
    };

    const handleEqualClick = () => {
        const result = calculateResult();
        setDisplay(result.toString());
        setOperator(null);
        setOperand(null);
        setIsNewOperand(true);
    };

    const handleClearClick = () => {
        setDisplay('0');
        setOperator(null);
        setOperand(null);
        setIsNewOperand(true);
    };

    return (
        <div className="calculator">
            <div className="display">{display}</div>
            <div className="buttons">
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
                <button className={styles.button} onClick={handleEqualClick}>=</button>
                <button className={styles.button} onClick={() => handleOperatorClick('/')}>/</button>
            </div>
        </div>
    );
};

export default Calculator;
