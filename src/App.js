import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerBar from "./components/PlayerBar";
import Boxes from "./components/Boxes";
import Lines from "./components/Lines";
import { MATRIX } from "./constants";

const totalRows = 9 * 2 - 1;
const lastHorizontalRow = MATRIX - 1;
const horizontalColumnCount = MATRIX - 1;
const verticalColumnCount = MATRIX;
const totalBoxes = (MATRIX - 1) * 2;

const containerWidth = lastHorizontalRow * 50 + lastHorizontalRow * 10 + 100;

function App() {
  const [lines, setLines] = useState({});
  const [boxes, setBoxes] = useState([]);
  const [player, setPlayer] = useState("red");

  useEffect(() => {
    startGame();
  }, []);

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
    const lines = getLines();
    setLines(lines);
    createBoxes(lines);
  };

  const handleLineClick = (line) => {
    let willPlayerChange = true;
    const key = line.row + "," + line.column;
    setLines({
      ...lines,
      [key]: { ...lines[key], player: player },
    });

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
    if (willPlayerChange) setPlayer(player === "red" ? "blue" : "red");
  };

  const createBoxes = (lines) => {
    const box = [];
    Object.values(lines).forEach((line) => {
      if (isHorizontal(line.row) && line.row !== totalRows) {
        box.push({
          lines: [
            line.row + "," + line.column,
            line.row + 1 + "," + line.column,
            line.row + 2 + "," + line.column,
            line.row + 1 + "," + (line.column + 1),
          ],
          count: 0,
          player: null,
        });
      }
    });
    setBoxes(box);
  };

  const getLines = () => {
    const obj = {};
    for (let i = 0; i < totalRows; i++) {
      let limit = isHorizontal(i) ? horizontalColumnCount : verticalColumnCount;
      for (let j = 0; j < limit; j++) {
        const key = i + "," + j
        obj[key] = {
          row: i,
          column: j,
          player: null,
        };
      }
    }
    return obj;
  };

  const isHorizontal = (index) => index % 2 === 0;

  return (
    <div className="app">
      <PlayerBar player={player} />
      <Container>
        <Lines lines={lines} handleLineClick={handleLineClick} />
        <Boxes boxes={boxes} />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  display: flex;
  width: ${containerWidth}px;
`;
