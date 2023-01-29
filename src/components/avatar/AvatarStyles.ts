import styled from "styled-components";
import { getStyleBasedOnType } from "../../utils/StyleHelpers";

export interface IAvatarProps {
  width?: number | string;
  height?: number | string;
}
export const StyledAvatarWrapper = styled.div<IAvatarProps>`
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: hidden;
  vertical-align: top;
  border: none;
  outline: none;
  width: ${(props) => getStyleBasedOnType(props.width)};
  height: ${(props) => getStyleBasedOnType(props.height)};
  background-color: transparent;
`;
export const StyledAvatar = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledAvatarStatus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.COLORS.EMERALD_GREEN};
  bottom: 0;
  right: 0;
  transform: translate(-5%, -5%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
