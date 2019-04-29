import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  max-width: 332px;
  min-height: 332px;
  display: flex;
  flex-direction: column;
  background: #7b4397;
  background: -webkit-linear-gradient(165deg, #dc2430, #7b4397);
  background: linear-gradient(165deg, #dc2430, #7b4397);
  font-family: Andale Mono, monospace;
  font-size: 16px;
  color: #fff;
`;

export const Wrapper = props => <StyledWrapper>{props.children}</StyledWrapper>;
