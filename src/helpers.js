// Helper Functions

export const refreshRow = arr =>
  arr.map(ele => ({
    current: null,
    text: ele.text,
  }));

export const refreshAlphabet = alphabet =>
  alphabet.map(ele => ({ current: null, text: ele.text }));

export const stateListGenerator = list =>
  list.reduce((acc, ele) => [...acc, { current: null, text: ele }], []);

export const alphabetListGenerator = () =>
  // eslint-disable-next-line prefer-spread
  Array.apply(null, Array(26)).reduce(
    (acc, ele, index) => [
      ...acc,
      {
        current: null,
        text: String.fromCharCode(97 + index),
      },
    ],
    [],
  );
