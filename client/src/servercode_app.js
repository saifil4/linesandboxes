import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerBar from "./components/PlayerBar";
import Boxes from "./components/Boxes";
import Lines from "./components/Lines";
import { MATRIX } from "./constants";
import GameScreen from "./components/GameScreen";
import { GameLogo } from "./components/ui";
import { ThemeButton } from "./components/ui";

import NewLogic from "./newLogic";

const totalRows = 10 * 2 - 1;
const lastHorizontalRow = MATRIX - 1;
const horizontalColumnCount = MATRIX - 1;
const verticalColumnCount = MATRIX;
const totalBoxes = (MATRIX - 1) * (MATRIX - 1);

const containerWidth = lastHorizontalRow * 50 + lastHorizontalRow * 10 + 100;

function App() {
  const [lines, setLines] = useState({});
  const [boxes, setBoxes] = useState([]);
  const [player, setPlayer] = useState("red");

  const [isScreenVisible, setIsScreenVisible] = useState(true);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const openScreen = () => setIsScreenVisible(true);
  const closeScreen = () => setIsScreenVisible(false);

  useEffect(() => {
    checkWinner();
  }, [boxes]);

  const checkWinner = () => {
    const red = boxes.filter((box) => box.player === "red").length;
    const blue = boxes.filter((box) => box.player === "blue").length;
    if (red > blue && red > totalBoxes / 2) alert("red wins");
    if (blue > red && blue > totalBoxes / 2) alert("blue wins");
    if (red === blue && blue === totalBoxes / 2) alert("Its a draw");
  };

  const startGame = () => {
    setHasGameStarted(true);
    const lines = getLines();
    setLines(lines);
    createBoxes(lines);
    closeScreen();
  };

  const getLines = () => {
    const obj = {};
    for (let i = 0; i < totalRows; i++) {
      let limit = isHorizontal(i) ? horizontalColumnCount : verticalColumnCount;
      for (let j = 0; j < limit; j++) {
        const key = i + "," + j;
        obj[key] = { row: i, column: j, player: null };
      }
    }
    return obj;
  };

  const createBoxes = (lines) => {
    const box = [];
    Object.values(lines).forEach((line) => {
      if (isHorizontal(line.row) && line.row !== totalRows) {
        const top = line.row + "," + line.column;
        const left = line.row + 1 + "," + line.column;
        const bottom = line.row + 2 + "," + line.column;
        const right = line.row + 1 + "," + (line.column + 1);
        box.push({
          lines: [top, left, bottom, right],
          count: 0,
          player: null,
        });
      }
    });
    setBoxes(box);
  };

  const handleLineClick = (line) => {
    if (line.player !== null) return;
    const key = line.row + "," + line.column;
    setLines({ ...lines, [key]: { ...lines[key], player: player } });
    const willPlayerChange = updateBoxes(line);
    if (willPlayerChange) setPlayer(player === "red" ? "blue" : "red");
  };

  const updateBoxes = (line) => {
    let willPlayerChange = true;
    const key = line.row + "," + line.column;
    setBoxes(
      boxes.map((box) => {
        if (box.lines.some((boxline) => boxline === key)) {
          if (box.count + 1 === 4) {
            willPlayerChange = false;
            return { ...box, count: box.count + 1, player: player };
          } else {
            return { ...box, count: box.count + 1 };
          }
        }
        return box;
      })
    );
    return willPlayerChange;
  };

  const isHorizontal = (index) => index % 2 === 0;

  return (
    <NewLogic />
    // <GameContainer>
    //   {isScreenVisible ? (
    //     <GameScreen
    //       hasGameStarted={hasGameStarted}
    //       closeScreen={closeScreen}
    //       startGame={startGame}
    //     />
    //   ) : (
    //     <>
    //       <GameLogo />
    //       <ThemeButton onClick={openScreen} label="Pause" />
    //       <PlayerBar boxes={boxes} player={player} />
    //       <Container>
    //         <Lines lines={lines} handleLineClick={handleLineClick} />
    //         <Boxes boxes={boxes} />
    //       </Container>
    //     </>
    //   )}
    // </GameContainer>
  );
}

export default App;

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   width: ${containerWidth}px;
//   background: #f3f4f5;
//   height: 100%;
// `;

// const GameContainer = styled.div`
//   background: #f4f5f7;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   height: 100vh;
//   position: relative;
// `;
