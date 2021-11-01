import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 12 12" {...props}>
     <path d="M6 0C2.68594 0 0 2.68594 0 6C0 9.31406 2.68594 12 6 12C9.31406 12 12 9.31406 12 6C12 2.68594 9.31406 0 6 0ZM6 9C5.66953 9 5.4 8.73047 5.4 8.4V6C5.4 5.66953 5.66953 5.4 6 5.4C6.33047 5.4 6.6 5.66953 6.6 6V8.4C6.6 8.73047 6.33047 9 6 9ZM6.3 4.2H5.7C5.53359 4.2 5.4 4.06641 5.4 3.9V3.3C5.4 3.13359 5.53359 3 5.7 3H6.3C6.46641 3 6.6 3.13359 6.6 3.3V3.9C6.6 4.06641 6.46641 4.2 6.3 4.2Z" />
    </Svg>
  );
};

export default Icon;
