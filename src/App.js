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

const DraggableHOC = ({ index, heading, DraggableEventHandler, ele }) => {
  return (
    <Draggable
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      defaultPosition={{ x: 0, y: 0 }}
      handle=".handle"
      position={ele.current}
      scale={1}
      onStop={(event, data) =>
        DraggableEventHandler(event, data, index, heading)
      }
    >
      <td className="grid-item handle">
        <div className="dragItem" id="item">
          {ele.text}
        </div>
      </td>
    </Draggable>
  );
};

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

  const DraggableEventHandler = (event, data, i, heading) => {
    console.log(pos);
    if (heading === 'alphabet') {
      pos.alphabet.current = {};
      pos.alphabet.current.x = data.x;
      pos.alphabet.current.y = data.y;
    } else {
      pos[heading].elements[i].current = {};
      pos[heading].elements[i].current.x = data.x;
      pos[heading].elements[i].current.y = data.y;
    }
    setPos(pos);
  };

  return (
    <div className="App" key={k}>
      <table className="grid-container">
        <tbody>
          <tr>
            <td className="grid-item">Diagraphs</td>
            {pos.diagraphs.elements.map((ele, i) => (
              <DraggableHOC
                key={i}
                index={i}
                heading="diagraphs"
                DraggableEventHandler={DraggableEventHandler}
                ele={ele}
              />
            ))}
          </tr>
          <tr>
            <td className="grid-item">Bossy R</td>
            {pos.bossyR.elements.map((ele, i) => (
              <DraggableHOC
                key={i}
                index={i}
                heading="bossyR"
                DraggableEventHandler={DraggableEventHandler}
                ele={ele}
              />
            ))}
          </tr>
        </tbody>
      </table>

      <table className="grid-container">
        <tbody>
          <tr>
            {pos.alphabet.map((ele, i) => (
              <DraggableHOC
                key={i}
                index={i}
                heading="alphabet"
                DraggableEventHandler={DraggableEventHandler}
                ele={ele}
              />
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
