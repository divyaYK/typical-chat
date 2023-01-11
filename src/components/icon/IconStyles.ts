import styled from "styled-components";
import { getStyleBasedOnType } from "../../utils/StyleHelpers";

export interface IIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const StyledIcon = styled.div<IIconProps>`
  display: flex;
  color: ${(props) => (props.color ? props.color : "inherit")};

  & svg {
    display: inline-block;
    shape-rendering: inherit;
    vertical-align: middle;
    width: ${(props) => getStyleBasedOnType(props.width)};
    height: ${(props) => getStyleBasedOnType(props.height)};

    path {
      fill: currentColor;
    }
  }
`;
