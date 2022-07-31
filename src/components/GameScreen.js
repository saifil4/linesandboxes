import React from "react";
import styled from "styled-components";

const GameScreen = ({ closeScreen, hasGameStarted, startGame }) => {
  return (
    <BackDrop>
      <Modal>
        <Logo>Lines and Boxes</Logo>
        <h2>Rules</h2>
        <p>
          Each turn, drag between two horizontally or vertically adjacent dots
          to draw a line <br />
          Drawing the 4th wall of a box wins it, earning you a point. When you
          close a box you must move again. <br />
          Lines are drawn until all squares are claimed. The player with the
          most claimed squares wins!
        </p>
        {hasGameStarted ? (
          <>
            <Button onClick={startGame}>Restart Game</Button>
            <Button onClick={closeScreen}>Close</Button>
          </>
        ) : (
          <Button onClick={startGame}>Start Game</Button>
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
  height: 600px;
  width: 500px;
  padding: 30px 20px;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: "Press Start 2P", cursive;
  font-size: 50px;
`;

const Button = styled.button`
  font-family: "Press Start 2P", cursive;
`;
