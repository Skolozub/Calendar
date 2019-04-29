import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  background: none;
  border: none;
`;

export const Button = props => (
  <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
);
