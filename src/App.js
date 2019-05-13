/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Box, Button, Icons } from 'grommet';
import { Refresh } from 'grommet-icons';
import {
  diagraphList,
  bossyRList,
  vowelTeamsList1,
  vowelTeamsList2,
  diphthongsList,
  otherList,
} from './positions';
import {
  refreshRow,
  refreshAlphabet,
  stateListGenerator,
  alphabetListGenerator,
} from './helpers';

const diagraphs = stateListGenerator(diagraphList);
const bossyRs = stateListGenerator(bossyRList);
const vowelTeams1 = stateListGenerator(vowelTeamsList1);
const vowelTeams2 = stateListGenerator(vowelTeamsList2);
const diphthongs = stateListGenerator(diphthongsList);
const others = stateListGenerator(otherList);
const alphabet = alphabetListGenerator();

const gridData = {
  diagraphs,
  bossyRs,
  vowelTeams1,
  vowelTeams2,
  diphthongs,
  others,
  alphabet,
};

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

// Main component here
export default () => {
  // React Hooks
  const [gridState, setGridState] = useState(gridData);
  const [k, setKey] = useState(0);
  useEffect(() => {
    console.log('useEffect start');
    console.log(k);
    console.log(gridState);
    console.log('useEffect end');
  });

  // Refresh Grids
  const refresh = () => {
    // const newGridState = gridState;
    // newGridState.diagraphs = refreshRow(gridState.diagraphs);
    // newGridState.bossyRs = refreshRow(gridState.bossyRs);
    // newGridState.alphabet = refreshAlphabet(gridState.alphabet);
    // setGridState(newGridState);
    setKey(k + 1);
  };

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
          <table className="grid-container">
            {/* Empty Table */}
            <tbody>
              <tr>
                <td className="grid-item handle">
                  <div className="dragItem" id="item" />
                </td>
                <td className="grid-item handle">
                  <div className="dragItem" id="item" />
                </td>
                <td className="grid-item handle">
                  <div className="dragItem" id="item" />
                </td>
                <td className="grid-item handle">
                  <div className="dragItem" id="item" />
                </td>
              </tr>
            </tbody>
          </table>
          {/* Refresh */}
          <Refresh
            align="right"
            onClick={() => refresh()}
            color="plain"
            size="xlarge"
          />
          {/* <Button onClick={() => refresh()} icon={<Icons.Edit />} /> */}
        </Box>
        <Box
          direction="row-responsive"
          justify="evenly"
          fill="horizontal"
          gap="xlarge"
          basis="auto"
        >
          <table className="grid-container">
            <tbody>
              <tr>
                <td className="grid-item">Diagraphs</td>
                {gridState.diagraphs.map((ele, i) => (
                  <DraggableHOC className="dragItem_green" key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                <td className="grid-item">Bossy R</td>
                {gridState.bossyRs.map((ele, i) => (
                  <DraggableHOC className="dragItem_yellow" key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                <td className="grid-item">Vowel Teams</td>
                {gridState.vowelTeams1.map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                <td className="grid-item">Vowel Teams</td>
                {gridState.vowelTeams2.map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                <td className="grid-item">Diphthongs</td>
                {gridState.diphthongs.map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                <td className="grid-item">Other</td>
                {gridState.others.map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
            </tbody>
          </table>

          <table className="grid-container">
            <tbody>
              <tr>
                {gridState.alphabet.slice(0, 5).map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(5, 10).map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(10, 15).map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(15, 20).map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(20, 25).map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
              <tr>
                {gridState.alphabet.slice(25, 26).map((ele, i) => (
                  <DraggableHOC key={i} ele={ele} />
                ))}
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </div>
  );
};
