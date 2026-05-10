const result = document.getElementById('result');

function appendValue(value) {
  if (result.value === '0' && value !== '.') {
    result.value = value;
  } else {
    result.value += value;
  }
}

function clearDisplay() {
  result.value = '0';
}

function calculateResult() {
  try {
    const expression = result.value;

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      throw new Error('Invalid input');
    }

    const output = Function('return (' + expression + ')')();

    if (output === undefined || output === null || Number.isNaN(output)) {
      throw new Error('Invalid calculation');
    }

    result.value = output;
  } catch (error) {
    result.value = 'Error';
  }
}

document.addEventListener('keydown', (event) => {
  const allowedKeys = '0123456789+-*/().';
  if (allowedKeys.includes(event.key)) {
    appendValue(event.key);
  } else if (event.key === 'Enter') {
    calculateResult();
  } else if (event.key === 'Backspace') {
    result.value = result.value.slice(0, -1) || '0';
  } else if (event.key === 'Escape') {
    clearDisplay();
  }
});
