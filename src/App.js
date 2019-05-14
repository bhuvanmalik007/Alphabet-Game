/* eslint-disable prefer-spread */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Box } from 'grommet';
import { Refresh } from 'grommet-icons';
import {
  diagraphList,
  bossyRList,
  vowelTeamsList1,
  vowelTeamsList2,
  diphthongsList,
  otherList,
} from './lists';
import { stateListGenerator, alphabetListGenerator } from './helpers';

// Generation of state of all lists
const diagraphs = stateListGenerator(diagraphList);
const bossyRs = stateListGenerator(bossyRList);
const vowelTeams1 = stateListGenerator(vowelTeamsList1);
const vowelTeams2 = stateListGenerator(vowelTeamsList2);
const diphthongs = stateListGenerator(diphthongsList);
const others = stateListGenerator(otherList);
const alphabet = alphabetListGenerator();

// Final Grid State
const gridData = {
  diagraphs,
  bossyRs,
  vowelTeams1,
  vowelTeams2,
  diphthongs,
  others,
  alphabet,
};

// Higher Order Component
// eslint-disable-next-line react/prop-types
const DraggableHOC = ({ ele, styles }) => (
  <td className="grid-item">
    <Draggable
      // eslint-disable-next-line react/no-array-index-key
      defaultPosition={{ x: 0, y: 0 }}
      handle=".handle"
      position={ele.current}
      scale={1}
    >
      <div style={styles} className="dragItem handle" id="item">
        {ele.text}
      </div>
    </Draggable>
  </td>
);

// Main component return here
export default () => {
  // REACT HOOKS
  // eslint-disable-next-line no-unused-vars
  const [gridState, setGridState] = useState(gridData);
  const [k, setKey] = useState(0);
  useEffect(() => {});

  // Refresh Grids
  const refresh = () => {
    setKey(k + 1);
  };

  // Return the main component
  return (
    <div className="App" key={k}>
      <Box>
        <Box
          direction="row-responsive"
          justify="center"
          fill="horizontal"
          gap="xlarge"
          basis="auto"
        >
          {/* Empty table for dropping */}
          <table className="grid-container">
            <tbody>
              <tr>
                {Array.apply(null, Array(6)).map((_, i) => (
                  <td key={i} height="60" width="60" className="grid-item_grey">
                    <div className="emptyCell" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          {/* Refresh Button to put the cells back in the table to their respective positions */}
          <Refresh
            className="resetBtn"
            align="end"
            onClick={() => refresh()}
            color="plain"
            size="xlarge"
          />
        </Box>
        <Box
          align="end"
          alignContent="around"
          direction="row-responsive"
          justify="center"
          fill="horizontal"
          gap="xlarge"
          basis="auto"
        >
          {/* Left Table Generator */}
          <table className="container">
            <tbody>
              <tr>
                <td style={{ color: '#00ff00' }} className="grid-item">
                  Diagraphs
                </td>
                {gridState.diagraphs.map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#00ff00' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                <td style={{ color: '#ffd300' }} className="grid-item">
                  Bossy R
                </td>
                {gridState.bossyRs.map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#ffff00' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                <td style={{ color: '#ff00ff' }} className="grid-item">
                  Vowel Teams
                </td>
                {gridState.vowelTeams1.map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#ff00ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                <td style={{ color: '#ff00ff' }} className="grid-item">
                  Vowel Teams
                </td>
                {gridState.vowelTeams2.map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#ff00ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                <td style={{ color: '#ffa500' }} className="grid-item">
                  Diphthongs
                </td>
                {gridState.diphthongs.map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#ff8000' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                <td style={{ color: '#ff0000' }} className="grid-item">
                  Other
                </td>
                {gridState.others.map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#ff0000' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
            </tbody>
          </table>

          {/* Alphabet(right table) Generator */}
          <table className="grid-container">
            <tbody>
              <tr>
                {gridState.alphabet.slice(0, 5).map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#8080ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(5, 10).map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#8080ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(10, 15).map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#8080ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(15, 20).map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#8080ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(20, 25).map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#8080ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(25, 26).map((ele, i) => (
                  <DraggableHOC
                    styles={{ backgroundColor: '#8080ff' }}
                    key={i}
                    ele={ele}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </div>
  );
};
