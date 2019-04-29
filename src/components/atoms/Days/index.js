import React from "react";
import styled from "styled-components";

const StyledDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
`;

export const Days = props => <StyledDays>{props.children}</StyledDays>;
