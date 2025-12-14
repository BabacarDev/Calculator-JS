const display = document.querySelector('[data-display]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');


let currentValue = '';
let previousValue = '';
let operator = null;

function updateDisplay() {
  let displayValue = '';

  if (previousValue) {
    displayValue += previousValue;
  }

  if (operator) {
    displayValue += ` ${operator}`;
  }

  if (currentValue) {
    displayValue += ` ${currentValue}`;
  }

  display.textContent = displayValue || '0';
}


function appendNumber(number) {
  if (number === '.' && currentValue.includes('.')) return;

  currentValue += number;
  updateDisplay(currentValue);
}
// A Revoir
function chooseOperator(selectedOperator) {
  if (currentValue === '') return;

  if (previousValue !== '') {
    compute();
  }

  operator = selectedOperator;
  previousValue = currentValue;
  currentValue = '';
    updateDisplay(currentValue, operator);
}

function compute() {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return;

  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) return;
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  previousValue = '';
  updateDisplay(currentValue);
}

function clearCalculator() {
  currentValue = '';
  previousValue = '';
  operator = null;
  updateDisplay('0');
}

function deleteLast() {
  currentValue = currentValue.slice(0, -1);
  updateDisplay(currentValue);
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperator(button.dataset.operator);
  });
});

equalsButton.addEventListener('click', compute);
clearButton.addEventListener('click', clearCalculator);
deleteButton.addEventListener('click', deleteLast);
