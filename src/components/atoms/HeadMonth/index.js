import React from "react";
import styled from "styled-components";

const StyledHeadMonth = styled.div`
  display: flex;
  margin-right: 10px;
`;

export const HeadMonth = props => (
  <StyledHeadMonth>{props.children}</StyledHeadMonth>
);
