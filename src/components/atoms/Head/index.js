import React from "react";
import styled from "styled-components";

const StyledHead = styled.div`
  display: flex;
`;

export const Head = props => <StyledHead>{props.children}</StyledHead>;
