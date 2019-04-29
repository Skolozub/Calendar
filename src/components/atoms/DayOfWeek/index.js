import React from "react";
import styled from "styled-components";

const StyledDayOfWeek = styled.div`
  display: flex;
  width: calc(100% / 7);
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  color: #29ffb2;
`;

export const DayOfWeek = props => (
  <StyledDayOfWeek>{props.children}</StyledDayOfWeek>
);
