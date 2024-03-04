import React from "react";
import styled from "styled-components";

const PlayerBar = ({ player, boxes }) => {
  return (
    <Bar>
      <Player color={player === "red" ? "red" : "grey"}>
        Red - {boxes.filter((box) => box.player === "red").length}
      </Player>
      <Player color={player === "blue" ? "blue" : "grey"}>
        Blue - {boxes.filter((box) => box.player === "blue").length}
      </Player>
    </Bar>
  );
};

export default PlayerBar;

const Bar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Player = styled.div`
  min-width: 150px;
  text-align: center;
  background: ${(props) => props.color};
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
