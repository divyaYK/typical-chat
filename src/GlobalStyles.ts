import { createGlobalStyle } from "styled-components";
import { THEME, ThemeEnum } from "./theme";

interface IThemeProps {
  mode: ThemeEnum;
  theme: typeof THEME;
}

const GlobalStyle = createGlobalStyle<IThemeProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.FONT.TYPE.DEFAULT};
    font-size: ${({ theme }) => theme.FONT.SIZE.base};
    font-weight: ${({ theme }) => theme.FONT.WEIGHT.normal};
  }

  body {
    background-color: ${(props) => (props.mode === ThemeEnum.DARK
    ? props.theme.COLORS.DARK.BACKGROUND_01
    : props.theme.COLORS.LIGHT.BACKGROUND_01)};
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`;

export default GlobalStyle;
