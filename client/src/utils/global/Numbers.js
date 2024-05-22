export const numberRound = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const checkNumbers = (event) => {
  const { name, value } = event.target;
  const isNumericKey = /^\d+$/.test(event.key);
  const isControlKey = event.key === 'Control';
  const isDeleteKey = event.key === 'Delete';
  const isBackspaceKey = event.key === 'Backspace';
  const isArrowKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
  const isCtrlDown = event.ctrlKey;
  const isDotKey = event.key === '.';

  if (
    !isNumericKey &&
    !isControlKey &&
    !isDeleteKey &&
    !isBackspaceKey &&
    !isArrowKey &&
    !(isCtrlDown && (isDeleteKey || isBackspaceKey)) &&
    !(name === 'price' && isDotKey && !value.includes('.'))
  ) {
    event.preventDefault();
  }
};
