import styled from "styled-components";
import { IMode } from "../../utils/types";
import { ThemeEnum } from "../../theme";

export const StyledHeaderLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem;

  & h1 {
    margin-left: 0.5rem;
  }
`;

export const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  justify-self: flex-end;
  min-width: 10%;
`;

export const StyledHeader = styled.header<IMode>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_01
    : theme.COLORS.LIGHT.BACKGROUND_01)};
  border-bottom: 4px solid
    ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_02
    : theme.COLORS.LIGHT.BACKGROUND_02)};
`;
