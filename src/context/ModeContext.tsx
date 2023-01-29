import { ReactNode, createContext, useMemo } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { ThemeEnum } from "../theme";

export interface IModeContext {
  isDarkMode: boolean;
  mode: ThemeEnum;
  enable: () => void;
  disable: () => void;
}

export const ModeContext = createContext<IModeContext>({
  isDarkMode: false,
  mode: ThemeEnum.LIGHT,
  enable: () => undefined,
  disable: () => undefined,
});

export const ModeProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
}) => {
  const { isDarkMode, enable, disable } = useDarkMode();
  const mode = isDarkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT;
  const passContext = useMemo(
    () => ({
      isDarkMode,
      mode,
      enable,
      disable,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  return (
    <ModeContext.Provider value={passContext}>{children}</ModeContext.Provider>
  );
};
