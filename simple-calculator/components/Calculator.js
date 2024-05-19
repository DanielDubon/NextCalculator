"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import React from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [operator, setOperator] = useState(null);
    const [operand, setOperand] = useState(null);
    const [isNewOperand, setIsNewOperand] = useState(true);

    useEffect(() => {
        const handleKeyPress = (event) => {

            const { key } = event;
            console.log(key);
            if (/[0-9]/.test(key)) {
                console.log("NUEVO 1 " + isNewOperand);
                handleNumberClick(key);
                highlightButton(key);
            } else if (key === '.') {
                handleDecimalClick();
                highlightButton(key);
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                handleOperatorClick(key);
                highlightButton(key);
            } else if (key === 'Enter' || key === '=') {
                handleEqualClick();
                highlightButton('=');
            } else if (key === 'Backspace' || key === 'c' || key === 'C') {
                handleClearClick();
                highlightButton('C');
            } else if (key === 'Escape') {
                handleClearClick();
                highlightButton('C');
            } else if (key === 'n' || key === 'N') {
                handleToggleSignClick();
                highlightButton('+/-');
            }
        };

        const handleKeyUp = () => {
            removeHighlight();
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const highlightButton = (key) => {
        const buttonMap = {
            '+': '+',
            '-': '-',
            '*': '*',
            '/': '/',
            '=': '=',
            'Enter': '=',
            'c': 'C',
            'C': 'C',
            'n': '+/-',
            'N': '+/-',
            '1': '1',
        };
        const buttonKey = buttonMap[key] || key;
        console.log("BUTTON KEY: " + buttonKey);
        const button = document.querySelector(`button[data-key="${buttonKey}"]`);
        console.log("BUTTON QUERY: " + button)
        if (button) {
            button.classList.add(styles.active);
        }
    };

    const removeHighlight = () => {
        const buttons = document.querySelectorAll(`button.${styles.active}`);
        buttons.forEach((button) => {
            button.classList.remove(styles.active);
        });
    };


    const updateDisplay = (value) => {
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
        return result.toString().substring(0, 9);
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
            <div data-testid="display" className={styles.display}>{display}</div>
            <div className={styles.buttons}>
                <button className={styles.button} data-key="1" onClick={() => handleNumberClick('1')}>1</button>
                <button className={styles.button} data-key="2" onClick={() => handleNumberClick('2')}>2</button>
                <button className={styles.button} data-key="3" onClick={() => handleNumberClick('3')}>3</button>
                <button className={styles.button} data-key="+" onClick={() => handleOperatorClick('+')}>+</button>
                <button className={styles.button} data-key="4" onClick={() => handleNumberClick('4')}>4</button>
                <button className={styles.button} data-key="5" onClick={() => handleNumberClick('5')}>5</button>
                <button className={styles.button} data-key="6" onClick={() => handleNumberClick('6')}>6</button>
                <button className={styles.button} data-key="-" onClick={() => handleOperatorClick('-')}>-</button>
                <button className={styles.button} data-key="7" onClick={() => handleNumberClick('7')}>7</button>
                <button className={styles.button} data-key="8" onClick={() => handleNumberClick('8')}>8</button>
                <button className={styles.button} data-key="9" onClick={() => handleNumberClick('9')}>9</button>
                <button className={styles.button} data-key="*" onClick={() => handleOperatorClick('*')}>*</button>
                <button className={styles.button} data-key="C" onClick={handleClearClick}>C</button>
                <button className={styles.button} data-key="0" onClick={() => handleNumberClick('0')}>0</button>
                <button className={styles.button} data-key="." onClick={handleDecimalClick}>.</button>
                <button className={styles.button} data-key="/" onClick={() => handleOperatorClick('/')}>/</button>
                <button className={styles.button} data-key="=" onClick={handleEqualClick}>=</button>
                <button className={styles.button} data-key="+/-" onClick={handleToggleSignClick}>+/-</button>
            </div>
        </div>
    );
};

export default Calculator;
