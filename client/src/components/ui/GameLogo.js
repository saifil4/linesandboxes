import React from "react";
import styled from "styled-components";

export const GameLogo = () => {
  return (
    <Logo>
      <span style={{ color: "red" }}>Lines</span> and{" "}
      <span style={{ color: "blue" }}>Boxes</span>
    </Logo>
  );
};


const Logo = styled.h1`
  font-family: "Press Start 2P", cursive;
  font-size: 50px;
  color: purple;
`;

