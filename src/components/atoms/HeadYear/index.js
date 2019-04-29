import React from "react";
import styled from "styled-components";

const StyledHeadYear = styled.div`
  display: flex;
`;

export const HeadYear = props => (
  <StyledHeadYear>{props.children}</StyledHeadYear>
);
