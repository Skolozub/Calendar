import React from "react";
import styled from "styled-components";

const StyledDaysOfWeek = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.27);
`;

export const DaysOfWeek = props => (
  <StyledDaysOfWeek>{props.children}</StyledDaysOfWeek>
);
