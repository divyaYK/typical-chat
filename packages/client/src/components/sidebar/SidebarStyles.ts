import styled from "styled-components";
import { IMode } from "../../utils/types";
import { ThemeEnum } from "../../theme";

export const StyledSidebar = styled.aside<IMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5%;
  height: 100%;
  padding: 1rem 0.5rem;
  background-color: ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_02
    : theme.COLORS.LIGHT.BACKGROUND_02)};
  border-right: 2px solid
    ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_02
    : theme.COLORS.LIGHT.BACKGROUND_02)};
`;

export const StyledSidebarFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSidebarActions = styled.div<IMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: ${({ theme, mode }) => (mode === ThemeEnum.DARK ? theme.COLORS.DARK.TEXT : theme.COLORS.LIGHT.TEXT)};
  width: 100%;

  & svg {
    height: 1.5rem;
    margin: 1rem 0;
  }
`;
