import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Box, Grommet } from 'grommet';
import positions from './positions';
import { refreshRow, refreshAlphabet } from './helpers';

const alphabet = Array.apply(null, Array(26)).reduce((acc, ele, index) => {
  return [
    ...acc,
    {
      current: null,
      text: String.fromCharCode(97 + index),
    },
  ];
}, []);

// eslint-disable-next-line react/prop-types
const DraggableHOC = ({ ele }) => (
  <Draggable
    // eslint-disable-next-line react/no-array-index-key
    defaultPosition={{ x: 0, y: 0 }}
    handle=".handle"
    position={ele.current}
    scale={1}
  >
    <td className="grid-item handle">
      <div className="dragItem" id="item">
        {ele.text}
      </div>
    </td>
  </Draggable>
);

export default () => {
  positions.leftPositions.alphabet = alphabet;
  const [pos, setPos] = useState(positions.leftPositions);
  const [k, setKey] = useState(0);
  useEffect(() => {
    console.log('useEffect start');
    console.log(k);
    console.log(pos);
    console.log('useEffect end');
  });

  const refresh = () => {
    let newPos = pos;
    newPos.diagraphs.elements = refreshRow(pos, 'diagraphs');
    newPos.bossyR.elements = refreshRow(pos, 'bossyR');
    newPos.alphabet = refreshAlphabet(pos);
    setPos(newPos);
    setKey(k + 1);
  };

  return (
    <div className="App" key={k}>
      <table className="grid-container">
        <tbody>
          <tr>
            <td className="grid-item">Diagraphs</td>
            {pos.diagraphs.elements.map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
          <tr>
            <td className="grid-item">Bossy R</td>
            {pos.bossyR.elements.map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
        </tbody>
      </table>

      <table className="grid-container">
        <tbody>
          <tr>
            {pos.alphabet.slice(0, 5).map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
          <tr>
            {pos.alphabet.slice(5, 10).map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
          <tr>
            {pos.alphabet.slice(10, 15).map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
          <tr>
            {pos.alphabet.slice(15, 20).map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
          <tr>
            {pos.alphabet.slice(20, 25).map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
          <tr>
            {pos.alphabet.slice(25, 26).map((ele, i) => (
              <DraggableHOC key={i} ele={ele} />
            ))}
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={() => refresh()}>
        Reload!
      </button>
    </div>
  );
};
