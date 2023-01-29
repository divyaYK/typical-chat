import styled from "styled-components";
import { THEME, ThemeEnum } from "../../theme";
import { IMode } from "../../utils/types";

export interface ITextProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "code" | "sub";
}

const getTypeStyles = (p: ITextProps & IMode & { theme: typeof THEME }) => {
  switch (p.variant) {
    case "h1":
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE["4xl"],
        fontWeight: p.theme.FONT.WEIGHT.extrabold,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "h2":
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE["2xl"],
        fontWeight: p.theme.FONT.WEIGHT.bold,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "h3":
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE.xl,
        fontWeight: p.theme.FONT.WEIGHT.bold,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "h4":
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE.lg,
        fontWeight: p.theme.FONT.WEIGHT.semibold,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "h5":
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE.md,
        fontWeight: p.theme.FONT.WEIGHT.semibold,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "h6":
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE.sm,
        fontWeight: p.theme.FONT.WEIGHT.semibold,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "sub":
      return {
        fontFamily: p.theme.FONT.TYPE.SANS,
        fontSize: p.theme.FONT.SIZE.base,
        fontWeight: p.theme.FONT.WEIGHT.normal,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    case "code":
      return {
        fontFamily: p.theme.FONT.TYPE.MONOSPACE,
        fontSize: p.theme.FONT.SIZE.base,
        fontWeight: p.theme.FONT.WEIGHT.normal,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
    default:
      return {
        fontFamily: p.theme.FONT.TYPE.DEFAULT,
        fontSize: p.theme.FONT.SIZE.base,
        fontWeight: p.theme.FONT.WEIGHT.normal,
        color:
          p.mode === ThemeEnum.DARK
            ? p.theme.COLORS.DARK.TEXT
            : p.theme.COLORS.LIGHT.TEXT,
      };
  }
};

export const StyledText = styled.p<ITextProps & IMode>`
  font-family: ${(props) => props.fontFamily || getTypeStyles(props).fontFamily};
  font-size: ${(props) => props.fontSize || getTypeStyles(props).fontSize};
  font-weight: ${(props) => props.fontWeight || getTypeStyles(props).fontWeight};
  color: ${(props) => props.color || getTypeStyles(props).color};
`;
