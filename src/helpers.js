export const refreshRow = (pos, heading) =>
  pos[heading].elements.map((ele, i) => {
    return {
      current: null,
      initial: {
        x: 0,
        y: 0,
      },
      text: pos[heading].elements[i].text,
      moveCount: pos[heading].elements[i].text,
    };
  });

export const refreshAlphabet = pos =>
  pos.alphabet.map((ele, i) => ({ current: null }));
