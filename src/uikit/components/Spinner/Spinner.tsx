import React from "react";
import styled, { keyframes } from "styled-components";
import RocketIcon from "./RocketIcon";
import { SpinnerProps } from "./types";

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`;

const Container = styled.div`
  position: relative;
`;

const FloatingRocketIcon = styled(RocketIcon)`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${float} 2s linear infinite;
  transform: translate3d(0, 0, 0);
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <FloatingRocketIcon width={`${size * 0.5}px`} />
    </Container>
  );
};

export default Spinner;
