import React from "react";
import styled from "styled-components";
import { ThemeButton, GameLogo } from "./ui";

const GameScreen = ({ closeScreen, hasGameStarted, startGame }) => {
  return (
    <BackDrop>
      <Modal>
        <GameLogo />
        <RulesContainer>
          <h2>Rules</h2>
          <ol>
            <li>
              Each turn, click on any of the horizontal or vertical line to select a line.
            </li>
            <li>
              Selecting the 4th line of a box wins it, earning you a point. When
              you close a box you must move again.
            </li>
            <li>
              Lines are selected until all squares are claimed. The player with the
              most claimed squares wins!
            </li>
          </ol>
        </RulesContainer>

        {hasGameStarted ? (
          <>
            <Button onClick={startGame}>Restart Game</Button>
            <Button onClick={closeScreen}>Close</Button>
          </>
        ) : (
          <ThemeButton label="Start Game" onClick={startGame} />
        )}
      </Modal>
    </BackDrop>
  );
};

export default GameScreen;

const BackDrop = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  height: 400px;
  width: 500px;
  padding: 30px 20px;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: "Press Start 2P", cursive;
  font-size: 50px;
  color: purple;
`;

const Button = styled.button`
  font-family: "Press Start 2P", cursive;
`;

const RulesContainer = styled.div`
  text-align: left;
  margin: 10px 0;
  padding: 10px;
  border-style: double;
`;
