import { IIconProps } from "../components/icon/IconStyles";
import { THEME, ThemeEnum } from "../theme";
import { IMode } from "./types";

export const getStyleBasedOnType = (style: number | string | undefined) => {
  switch (typeof style) {
    case "number":
      return `${style}px`;
    case "string":
      return style;
    default:
      return "auto";
  }
};
export const getColorForIcon = (
  props: IIconProps & IMode & { theme: typeof THEME },
) => {
  if (props.color) return props.color;
  if (props.inherit) return "inherit";

  return props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.TEXT
    : props.theme.COLORS.LIGHT.TEXT;
};
