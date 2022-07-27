import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerBar from "./components/PlayerBar";

const width = 10;
const height = 50;
const matrix = 9;
const totalRows = 9 * 2 - 1;
const lastHorizontalRow = matrix - 1;
const lastVerticalRow = matrix - 2;
const horizontalColumnCount = matrix - 1;
const verticalColumnCount = matrix;

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
    const total = boxes.length;
    const red = boxes.filter((box) => box.player === "red").length;
    const blue = boxes.filter((box) => box.player === "blue").length;
    if (red > blue && red > total / 2) alert("red wins");
    if (blue > red && blue > total / 2) alert("blue wins");
  };

  const startGame = () => {
    const lines = getLines();
    setLines(lines);
    createBoxes(lines);
  };

  const handleLineClick = (line) => {
    setLines({
      ...lines,
      [line.row + "," + line.column]: {
        ...lines[line.row + "," + line.column],
        isSelected: true,
        player: player,
      },
    });

    setBoxes(
      boxes.map((box) => {
        const isExist = box.lines.some(
          (boxline) => boxline === line.row + "," + line.column
        );
        if (isExist) {
          if (box.count + 1 === 4) {
            return { ...box, count: box.count + 1, player: player };
          } else {
            return { ...box, count: box.count + 1 };
          }
        }
        return box;
      })
    );

    setPlayer(player === "red" ? "blue" : "red");
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
        obj[i + "," + j] = {
          id: Math.random(),
          row: i,
          column: j,
          isSelected: false,
          player: null,
        };
      }
    }
    return obj;
  };

  const isHorizontal = (index) => index % 2 === 0;

  const getLine = (line) => {
    if (!isHorizontal(line.row)) {
      return (
        <VerticalLine
          selected={line.isSelected}
          color={line.player}
          onClick={() => handleLineClick(line)}
        ></VerticalLine>
      );
    } else {
      return (
        <>
          <HorizontalLine
            selected={line.isSelected}
            color={line.player}
            borderright={line.column === lastVerticalRow}
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
    <div className="app">
      <PlayerBar player={player} />
      <Container>
        <LineContiner>
          {Object.values(lines).map((line, index) => (
            <>
              {getLine(line)}
              {getBreak(line, index)}
            </>
          ))}
        </LineContiner>
        <BoxContiner>
          {boxes.map((box, index) => (
            <>
              <Box key={index} color={box.player}></Box>
              {(index + 1) % (matrix - 1) === 0 && <br />}
            </>
          ))}
        </BoxContiner>
      </Container>
    </div>
  );
}

export default App;

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
  width: ${width}px;
  height: ${height}px;
  margin-right: ${height}px;
  ${(props) => props.selected && `background: ${props.color};`}
`;

const HorizontalLine = styled(Line)`
  height: ${width}px;
  width: ${height}px;
  ${(props) => props.selected && `background: ${props.color};`};
  ${(props) => props.borderright && `border-right: ${width}px solid black;`}
  border-left: ${width}px solid black;
`;

const Box = styled.li`
  background: ${(props) => (props.color === null ? "#f3f4f7" : props.color)};
  display: inline-block;
  height: ${height}px;
  width: ${height}px;
  opacity: 0.6;
  margin-left: ${width}px;
  margin-top: ${width}px;
`;

const LineContiner = styled.ul`
  font-size: 0;
  position: absolute;
  z-index: 1;
  padding: 0;
`;

const BoxContiner = styled.ul`
  font-size: 0;
  position: absolute;
  text-align: left;
  padding: 0;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: ${containerWidth}px;
`;
