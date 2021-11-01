import styled from "styled-components";
import { space, color, SpaceProps, BackgroundColorProps } from "styled-system";

export interface CardBodyProps extends SpaceProps, BackgroundColorProps {}

const CardBody = styled.div<CardBodyProps>`
  ${space}
  ${color}
`;

CardBody.defaultProps = {
  p: "24px",
};

export default CardBody;
