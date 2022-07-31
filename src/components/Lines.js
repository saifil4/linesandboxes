import React from "react";
import styled from "styled-components";
import { WIDTH, HEIGHT, MATRIX } from "../constants";

const Lines = ({ lines, handleLineClick }) => {
  const isHorizontal = (index) => index % 2 === 0;
  const lastHorizontalRow = MATRIX - 1;
  const lastVerticalRow = MATRIX - 2;

  const getLine = (line) => {
    if (!isHorizontal(line.row)) {
      return (
        <VerticalLine
          color={line.player}
          onClick={() => handleLineClick(line)}
        ></VerticalLine>
      );
    } else {
      return (
        <>
          <HorizontalLine
            color={line.player}
            showborderright={line.column === lastVerticalRow}
            onClick={() => handleLineClick(line)}
          ></HorizontalLine>
        </>
      );
    }
  };

  const getBreak = (line) => {
    if (line.row % 2 !== 0) {
      return line.column === lastHorizontalRow && <br />;
    } else {
      return line.column === lastVerticalRow && <br />;
    }
  };

  return (
    <LineContiner>
      {Object.values(lines).map((line, index) => (
        <>
          {getLine(line)}
          {getBreak(line, index)}
        </>
      ))}
    </LineContiner>
  );
};

export default Lines;

const LineContiner = styled.ul`
  font-size: 0;
  position: absolute;
  z-index: 1;
  padding: 0;
`;

const Line = styled.li`
  background: #dadada;
  display: inline-flex;
  cursor: pointer;
  font-size: 0;
  &: hover {
    background: grey;
  }
`;

const VerticalLine = styled(Line)`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  margin-right: ${HEIGHT}px;
  ${(props) => props.color && `
    background: ${props.color};
    pointer-events: none;
  `}
`;

const HorizontalLine = styled(Line)`
  height: ${WIDTH}px;
  width: ${HEIGHT}px;
  ${(props) => props.color && `
    background: ${props.color};
    pointer-events: none;
  `}
  ${(props) => props.showborderright && `border-right: ${WIDTH}px solid black;`}
  border-left: ${WIDTH}px solid black;
`;
