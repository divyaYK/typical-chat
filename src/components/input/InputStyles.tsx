import styled from "styled-components";
import { rgba } from "polished";
import { ThemeEnum } from "../../theme";

export const StyledInput = styled.input`
  text-align: left;
  border: none;
  position: relative;
  background: inherit;
  word-wrap: break-word;
  flex-grow: 1;
  outline: none;
  color: inherit;

  &:focus {
    outline: none;
  }
`;

export interface IInputProps {
  mode: ThemeEnum;
}

export const StyledInputWrapper = styled.div<IInputProps>`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  border: 2px solid
    ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_02
    : props.theme.COLORS.LIGHT.BACKGROUND_02)};
  appearance: none;
  border-radius: 4px;
  background-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_02
    : props.theme.COLORS.LIGHT.BACKGROUND_02)};
  color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.TEXT
    : props.theme.COLORS.LIGHT.TEXT)};
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_02
    : props.theme.COLORS.LIGHT.BACKGROUND_02)};
  }

  &:focus-within {
    border-color: ${(props) => props.theme.COLORS.EMERALD_GREEN};
    box-shadow: 0px 0px 0px 1px
      ${(props) => rgba(props.theme.COLORS.EMERALD_GREEN, 0.2)};
  }
`;
