import styled, { css } from "styled-components";
import { rgba } from "polished";
import { THEME, ThemeEnum } from "../../theme";
import { IMode } from "../../utils/types";

export interface IButtonProps {
  variant?: "primary" | "primaryLight" | "noStyles";
}

/**
 * @function
 * @name buttonVariantStyles
 * @description Function called to extract the styles for the button based on the variant prop
 * @param variant - Variant of the button
 */
const buttonVariantStyles = (
  p: IButtonProps & IMode & { theme: typeof THEME },
) => {
  let color = p.theme.COLORS.WHITE;
  let backgroundColor = p.theme.COLORS.EMERALD_GREEN;
  let hover = "";

  if (p.variant === "primaryLight") {
    color = p.theme.COLORS.EMERALD_GREEN;
    if (p.mode === ThemeEnum.DARK) {
      backgroundColor = p.theme.COLORS.DARK.BACKGROUND_02;
    } else {
      backgroundColor = rgba(p.theme.COLORS.EMERALD_GREEN, 0.2);
    }
  } else if (p.variant === "noStyles") {
    color = "inherit";
    backgroundColor = "inherit";
  }

  if (p.variant !== "noStyles") {
    hover = `&:hover {
      box-shadow: 0px 7px 29px 0px ${rgba(backgroundColor, 0.2)};
    }`;
  }

  return css`
    color: ${color};
    background-color: ${backgroundColor};
    ${hover}
  `;
};

/**
 * @name StyledButton
 * @description Styled Button Component with common styles for all variants
 */
export const StyledButton = styled.button<IButtonProps & IMode>`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.FONT.WEIGHT.medium};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: none;
  border-radius: 8px;
  outline: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease-in;

  ${(props) => buttonVariantStyles(props)}
`;
