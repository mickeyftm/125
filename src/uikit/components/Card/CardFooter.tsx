import styled from "styled-components";
import { space, color, SpaceProps, BackgroundColorProps } from "styled-system";

export interface CardFooterProps extends SpaceProps, BackgroundColorProps {}

const CardFooter = styled.div<CardFooterProps>`
  // border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${space}
  ${color}
`;

CardFooter.defaultProps = {
  p: "12px",
};

export default CardFooter;
