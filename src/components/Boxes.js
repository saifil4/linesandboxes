import React from "react";
import styled from "styled-components";
import { WIDTH, HEIGHT, MATRIX } from "../constants";

const Boxes = ({ boxes }) => {
  return (
    <BoxContiner>
      {boxes.map((box, index) => (
        <>
          <Box key={index} color={box.player}></Box>
          {(index + 1) % (MATRIX - 1) === 0 && <br />}
        </>
      ))}
    </BoxContiner>
  );
};

export default Boxes;

const Box = styled.li`
  background: ${(props) => (props.color === null ? "#f3f4f7" : props.color)};
  display: inline-block;
  height: ${HEIGHT}px;
  width: ${HEIGHT}px;
  opacity: 0.6;
  margin-left: ${WIDTH}px;
  margin-top: ${WIDTH}px;
`;

const BoxContiner = styled.ul`
  font-size: 0;
  position: absolute;
  text-align: left;
  padding: 0;
`;
