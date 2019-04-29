import React from "react";
import styled from "styled-components";

const StyledDay = styled.div`
  display: flex;
  width: calc(100% / 7);
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  box-sizing: border-box;
  background: ${({ isToday }) =>
    isToday ? "rgba(255, 255, 255, 0.27)" : "none"};
  color: ${({ notThisMonth }) =>
    notThisMonth ? "rgba(255, 255, 255, 0.38)" : "#fff"};
  transition: 0.3s ease-in-out;
  &:hover {
    background: rgba(255, 255, 255, 0.27);
  }
`;

export const Day = props => <StyledDay {...props}>{props.children}</StyledDay>;
