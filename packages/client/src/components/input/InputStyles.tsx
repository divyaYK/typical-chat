import styled from "styled-components";
import { rgba } from "polished";
import { ThemeEnum } from "../../theme";
import { IMode } from "../../utils/types";

export const StyledInput = styled.input<IMode>`
  text-align: left;
  position: relative;
  word-wrap: break-word;
  outline: none;
  padding: 1rem 0.5rem;

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
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_02
    : props.theme.COLORS.LIGHT.BACKGROUND_02)};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.COLORS.EMERALD_GREEN};
    box-shadow: 0px 0px 0px 1px
      ${(props) => rgba(props.theme.COLORS.EMERALD_GREEN, 0.2)};
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.COLORS.RED};
  }

  &:-internal-autofill-selected,
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active,
  &[data-autocompleted] {
    background-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_02
    : props.theme.COLORS.LIGHT.BACKGROUND_02)} !important;
    color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.TEXT
    : props.theme.COLORS.LIGHT.TEXT)} !important;
  }

  &[type="file"] {
    display: none;
  }
`;

export const StyledInputGroup = styled.div<IMode>`
  display: flex;
  flex-direction: row;
  position: relative;
  border: 2px solid
    ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_02
    : props.theme.COLORS.LIGHT.BACKGROUND_02)};
  border-radius: 4px;

  &:focus-within {
    outline: none;
    border-color: ${(props) => props.theme.COLORS.EMERALD_GREEN};
    box-shadow: 0px 0px 0px 1px
      ${(props) => rgba(props.theme.COLORS.EMERALD_GREEN, 0.2)};
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.COLORS.RED};
  }

  & ${StyledInput} {
    border: none;
    flex-grow: 1;
    border-radius: 0;
    transition: all 0.3s ease;

    &[aria-invalid="true"] {
      border: none;
    }

    &:focus,
    &:hover {
      border: none;
      box-shadow: none;
    }
  }
`;

export const StyledInputLeftAddOn = styled.div<IMode>`
  display: flex;
  border-bottom-left-radius: ;
  border-top-left-radius: ;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  width: auto;
  padding: 0.5rem 1rem;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_01
    : props.theme.COLORS.LIGHT.BACKGROUND_01)}
  flex: 0 0 auto;

  & .input__addon__button{
    padding: 0;
    background-color: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
  }
`;

export const StyledInputRightAddOn = styled.div<IMode>`
  display: flex;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: ;
  border-top-right-radius: ;
  width: auto;
  padding: 0.5rem 1rem;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_01
    : props.theme.COLORS.LIGHT.BACKGROUND_01)};
  flex: 0 0 auto;
  cursor: pointer;

  & .input__addon__button {
    padding: 0;
    background-color: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
  }
`;
