import styled, { keyframes } from "styled-components";
import { IMode } from "../../utils/types";
import { ThemeEnum } from "../../theme";

export interface IStyledSkeletonProps {
  height: string | number;
  width: string | number;
}

const loadAnimation = keyframes`
  100%{
    transform: translateX(100%);
  }
`;

export const StyledSkeleton = styled.div<IStyledSkeletonProps & IMode>`
  color: transparent;
  user-select: none;
  pointer-events: none;
  border-radius: 4px;
  border: none;
  display: inline-block;
  position: relative;
  animation: skeleton-loading 1s linear infinite alternate;
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === "number" ? `${height}px` : height)};
  background-color: ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_02
    : theme.COLORS.LIGHT.BACKGROUND_02)};

  &::after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    animation: ${loadAnimation} 0.8s linear infinite;
    background: linear-gradient(
      ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? `90deg, ${theme.COLORS.DARK.BACKGROUND_02} 0%, #ccc 51%, theme.COLORS.DARK.BACKGROUND_02 100%`
    : `90deg, ${theme.COLORS.LIGHT.BACKGROUND_02} 0%, #fff 51%, theme.COLORS.LIGHT.BACKGROUND_02 100%`)}
    );
  }
`;

export const StyledSkeletonCircle = styled(StyledSkeleton)`
  border-radius: 50%;
`;
