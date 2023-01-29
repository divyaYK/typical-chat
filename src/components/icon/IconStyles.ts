import styled from "styled-components";
import { getColorForIcon, getStyleBasedOnType } from "../../utils/StyleHelpers";
import { IMode } from "../../utils/types";

export interface IIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  inherit?: boolean;
}

export const StyledIcon = styled.div<IIconProps & IMode>`
  display: flex;
  color: ${(props) => getColorForIcon(props)};

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
