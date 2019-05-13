export const refreshRow = (pos, heading) =>
  pos[heading].elements.map((ele, i) => ({
    current: null,
    text: pos[heading].elements[i].text,
  }));

export const refreshAlphabet = pos =>
  pos.alphabet.map(() => ({ current: null }));
