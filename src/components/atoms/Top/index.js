import React from "react";
import styled from "styled-components";

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
`;

export const Top = props => <StyledTop>{props.children}</StyledTop>;
