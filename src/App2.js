import "./App.css";
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Box from './components-new/Box';
import TopBar from "./layouts/TopBar";
import GameCanvas from "./layouts/GameCanvas";

const OPPOSITE_LINES = {
    'left': 'right',
    'right': 'left',
    'top': 'bottom',
    'bottom': 'top'
}

function App2() {

    const players = [
        {
            name: 'player 1',
            color: '#ff0000'
        },
        {
            name: 'player 2',
            color: '#0000ff'
        },
        {
            name: 'player 3',
            color: '#008000'
        }
    ]

    const config = {
        rows: 8,
        columns: 16,
        lineThickness: 8,
        boxSize: 60
    }

    const [move, setMove] = useState(0);
    const [boxes, setBoxes] = useState([])

    const currentPlayer = useMemo(() => {
        return players[move % players.length]
    }, [move])

    const createGrid = () => {
        const boxList = []
        for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.columns; j++) {
                boxList.push({
                    x: j,
                    y: i,
                    left: { player: null },
                    right: { player: null },
                    top: { player: null },
                    bottom: { player: null }
                })
            }
        }
        setBoxes(boxList)
    }

    useEffect(() => {
        createGrid();
    }, [])


    const selectLine = (selectedBox, line) => {
        if (selectedBox[line].player) {
            return null;
        }
        setMove(move + 1)
        const adjacentBox = getAdjacentBox(selectedBox, line);
        const currentDate = new Date();
        const timestamp = currentDate.getTime()
        setBoxes(prevState => {
            return prevState.map(boxItem => {
                if ((boxItem.x === selectedBox.x && boxItem.y === selectedBox.y)) {
                    return { ...boxItem, [line]: { player: currentPlayer, timestamp: timestamp } }
                }
                if (adjacentBox && boxItem.x === adjacentBox.x && boxItem.y === adjacentBox.y) {
                    return { ...boxItem, [OPPOSITE_LINES[line]]: { player: currentPlayer, timestamp: timestamp } }
                }
                return boxItem;
            })
        })
    }

    const getAdjacentBox = (selectedBox, line) => {
        if (line === 'left') {
            return boxes.find(box =>
                box.y === selectedBox.y && box.x === selectedBox.x - 1
            )
        } else if (line === 'right') {
            return boxes.find(box =>
                box.y === selectedBox.y && box.x === selectedBox.x + 1
            )
        } else if (line === 'top') {
            return boxes.find(box =>
                box.y === selectedBox.y - 1 && box.x === selectedBox.x
            )
        } else if (line === 'bottom') {
            return boxes.find(box =>
                box.y === selectedBox.y + 1 && box.x === selectedBox.x
            )
        }
    }


    return (
        <>
            <TopBar players={players} currentPlayer={currentPlayer} />
            <GameCanvas>
                <Grid config={config} >
                    {
                        boxes.map(box => (
                            <Box box={box} config={config} selectLine={selectLine} />
                        ))
                    }
                </Grid>
            </GameCanvas>
        </>
    );
}

export default App2;

const Grid = styled.div`
  display: grid;
  grid-template-rows: ${({ config }) => `repeat(${config.columns - 1}, ${config.boxSize}px) repeat(1, ${config.boxSize + config.lineThickness}px)`};
  grid-template-columns: ${({ config }) => `repeat(${config.columns - 1}, ${config.boxSize}px) repeat(1, ${config.boxSize + config.lineThickness}px)`}
`;


