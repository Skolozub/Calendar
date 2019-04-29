import React from "react";
import styled from "styled-components";

const background = ({ hover, isChecked, isToday, isActualMonth }) => {
  if (isChecked) return "rgba(76, 175, 80, 0.56)";
  if (isToday) return "rgba(255, 255, 255, 0.27)";
  if (isActualMonth) return "";
  return "none";
};

const color = ({ hover, isChecked, isToday, isActualMonth }) => {
  if (isChecked) return "#fff";
  if (isToday) return "#fff";
  if (isActualMonth) return "#fff";
  return "rgba(255, 255, 255, 0.38)";
};

const StyledDay = styled.div`
  display: flex;
  width: calc(100% / 7);
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  box-sizing: border-box;
  background: ${props => background(props)};
  color: ${props => color(props)};
  transition: 0.3s ease-in-out;
  &:hover {
    background: rgba(255, 0, 0, 0.33);
    color: #fff;
    cursor: pointer;
  }
`;

export const Day = props => <StyledDay {...props}>{props.children}</StyledDay>;
