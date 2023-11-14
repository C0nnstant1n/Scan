let getInputNumbersValue = (input: HTMLInputElement) => {
  return input.value.replace(/\D/g, "");
};

let getFormattedValue = (inputNumbersValue: string) => {
  let formattedInputValue = "";
  if (!inputNumbersValue) {
    return "";
  }
  if (inputNumbersValue.length >= 4) {
    formattedInputValue += inputNumbersValue.slice(0, 4);
    formattedInputValue += " " + inputNumbersValue.slice(4, 9);
  } else {
    formattedInputValue = inputNumbersValue;
  }
  if (inputNumbersValue.length >= 9) {
    formattedInputValue += " " + inputNumbersValue.slice(9);
  }
  return formattedInputValue;
};

export { getInputNumbersValue, getFormattedValue };
