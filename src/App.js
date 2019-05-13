import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Box, Grommet } from 'grommet';
import positions from './positions';

export default () => {
  const [pos, setPos] = useState(positions.leftPositions);
  const [k, setKey] = useState(0);
  useEffect(() => {
    console.log(k);
    console.log(pos);
  });

  const refresh = () => {
    let newPos = pos;
    newPos.diagraphs.elements = pos.diagraphs.elements.map((ele, i) => {
      return {
        current: null,
        initial: {
          x: 0,
          y: 0,
        },
        text: pos.diagraphs.elements[i].text,
        moveCount: pos.diagraphs.elements[i].text,
      };
    });
    setPos(newPos);
    setKey(k + 1);
  };

  const DraggableEventHandler = (event, data, i, heading) => {
    console.log(event);
    pos[heading].elements[i].current = {};
    pos[heading].elements[i].current.x = data.x;
    pos[heading].elements[i].current.y = data.y;
    setPos(pos);
  };
  return (
    <div className="App" key={k}>
      <table className="grid-container">
        <tbody>
          <tr>
            <td className="grid-item">Diagraphs</td>
            {pos.diagraphs.elements.map((ele, i) => (
              <Draggable
                key={i}
                defaultPosition={{ x: 0, y: 0 }}
                handle=".handle"
                position={ele.current}
                scale={1}
                onStop={(event, data) =>
                  DraggableEventHandler(event, data, i, 'diagraphs')
                }
              >
                <td className="grid-item handle">
                  <div className="dragItem" id="item">
                    {ele.text}
                  </div>
                </td>
              </Draggable>
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
