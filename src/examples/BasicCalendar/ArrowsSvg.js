import React from "react";
import styled from "styled-components";

const LeftArrow = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 477.2 477.2"
  >
    <path d="M145.2 238.6L360.7 23c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0L116.5 229a13.5 13.5 0 0 0 0 19.2l225 225c2.7 2.6 6.2 4 9.6 4s6.9-1.3 9.5-4a13.5 13.5 0 0 0 0-19.1L145.2 238.6z" />
  </svg>
);

export const ArrowSvgLeft = styled(LeftArrow)`
  fill: #fff;
  width: 10px;
  height: auto;
`;

const RightArrow = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 129 129"
  >
    <path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2a4.1 4.1 0 0 1 0-5.8l51-51-51-51a4.1 4.1 0 0 1 5.8-5.8l53.9 53.9a4.1 4.1 0 0 1 0 5.8l-53.9 53.9z" />
  </svg>
);

export const ArrowSvgRight = styled(RightArrow)`
  fill: #fff;
  width: 10px;
  height: auto;
`;
