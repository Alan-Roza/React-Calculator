import React, { useState } from 'react';
import { ReactComponent as Backspace } from './assets/backspace.svg'
import { ReactComponent as History } from './assets/history.svg'
import { IButton, KeyButton } from './components/KeyButton';
import './App.scss';

interface ICalculatorValue {
  storageValue: string | number | null
  operator: string | null
  currentValue: string | number | null
}

const buttons: IButton[] = [
  { key: 'C', value: 'clear', isOperator: true },
  { key: 'x²', value: '**', isOperator: true },
  { key: '%', value: '%', isOperator: true },
  { key: '/', value: '/', isOperator: true },
  { key: '7', value: '7' },
  { key: '8', value: '8' },
  { key: '9', value: '9' },
  { key: 'X', value: '*', isOperator: true },
  { key: '4', value: '4' },
  { key: '5', value: '5' },
  { key: '6', value: '6' },
  { key: '-', value: '-', isOperator: true },
  { key: '1', value: '1' },
  { key: '2', value: '2' },
  { key: '3', value: '3' },
  { key: '+', value: '+', isOperator: true },
  { key: '.', value: '.' },
  { key: '0', value: '0' },
  { key: '+/-', value: '+-', isOperator: true },
  { key: '=', value: 'equal', isOperator: true, class: 'keyboard-key__colored-button' },
]

function App() {
  const [calculatorValue, setCalculatorValue] = useState<ICalculatorValue>({
    storageValue: 0,
    operator: null,
    currentValue: 0
  })

  function isNumber(item: string) {
    return /[0-9]+/.test(item);
  }

  // RESET ALL CALCULATOR
  const resetCalculator = () => {
    setCalculatorValue({
      storageValue: null,
      operator: null,
      currentValue: null
    })
  }

  // CLEAR THE LAST NUMBER
  const handleBackspace = () => {
    if (calculatorValue.currentValue?.toString().match(/error/gi)) return
    setCalculatorValue((prev) => ({
      ...prev,
      currentValue: prev.currentValue && prev.currentValue.toString().slice(0, -1)
    }))
  }

  // GENERIC FUNCTION TO DO OPERATIONS
  const calculate = (number1: string, operator: string) => {
    if (!isNumber(number1)) return 'error'

    if (operator === '+-') return Number(number1) * -1
    else if (operator === '**') return Number(number1) ** 2

    return (number2: string) => {
      if (!isNumber(number2)) return 'error'
console.log(number2, number1, operator)
      switch (operator) {
        case '+':
          return Number(number2) + Number(number1)
        case '-':
          return Number(number2) - Number(number1)
        case '*':
          return Number(number2) * Number(number1)
        case '/':
          return Number(number2) / Number(number1)
        case '%':
          return (Number(number2) / 100) * Number(number1)
        default:
          return number2
      }
    }
  }

  // HANDLE DIGITS ON CALCULATOR
  const handleDigits = (button: IButton) => {

    // HANDLE DIGITS ON OPERATORS
    if (button.isOperator) {
      if (button.value === 'clear') return resetCalculator()

      // ONLY ONE NUMBER TO OPERATE
      const resultOnlyNumberOne = calculate((calculatorValue.currentValue as string), (button.value as string))
      if (typeof resultOnlyNumberOne !== 'function') {
        return setCalculatorValue(prev => ({ storageValue: resultOnlyNumberOne, operator: null, currentValue: resultOnlyNumberOne }))
      }
      
      // NORMAL OPERATE WITH TWO NUMBERS
      if (button.value === 'equal') {
        const storageOperation = calculate((calculatorValue.currentValue as string), (calculatorValue.operator as string))
        const resultOperation = typeof storageOperation === 'function' ? storageOperation(calculatorValue.storageValue as string) : 'error'
        
        return setCalculatorValue(prev => ({ storageValue: String(prev.storageValue) + ' ' + prev.operator + ' ' + prev.currentValue, operator: null, currentValue: resultOperation }))
      }

      // ONLY CHANGE THE OPERATOR IN STORAGEVALUE
      if (calculatorValue.operator && !calculatorValue.currentValue) return setCalculatorValue(prev => ({ ...prev, operator: button.value }))

      // ADD NEW OPERATOR CALCULATE
      return setCalculatorValue(prev => ({ currentValue: null, operator: button.value, storageValue: prev.currentValue }))
    }

    return setCalculatorValue(prev => ({ ...prev, currentValue: prev.currentValue ? prev.currentValue + button.value : button.value }))
  }

  return (
    <div className='background-calculator'>
      <div className='calculator'>
        <div className='calculator__display'>
          <div className='calculator__storage-value'>{calculatorValue.storageValue ? calculatorValue.storageValue : 0} {calculatorValue.operator ? calculatorValue.operator : ''}</div>
          <div className='calculator__current-value'>{calculatorValue.currentValue ? calculatorValue.currentValue : 0}</div>
          <div className='calculator__actions'>
            <div className='calculator__history'><History className='calculator__history-icon' />History</div>
            <Backspace onClick={handleBackspace} className='calculator__backspace' />
          </div>
        </div>

        <div className='calculator__keyboard'>
          {buttons.flat().map((button) => (
            <KeyButton onClick={(button: IButton) => handleDigits(button)} button={button} className={button.class} >
              {button.key}
            </KeyButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
