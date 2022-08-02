import React from "react";
import styled from "styled-components";

export const ThemeButton = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

const Button = styled.button`
  font-family: "Press Start 2P", cursive;
  padding: 7px 15px;
  border-radius: 20px;
  border-style: dashed dashed solid double;;
  background: #43B047;
  text-transform: uppercase;
  cursor: pointer;
`;
