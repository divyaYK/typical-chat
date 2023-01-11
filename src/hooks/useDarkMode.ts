import { useEffect } from "react";
import useMediaQuery from "./useMediaQuery";
import useLocalStorage from "./useLocalStorage";

interface IUseDarkMode {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const useDarkMode = (defaultValue?: boolean): IUseDarkMode => {
  const defaultSetting = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "dark",
    defaultValue ?? defaultSetting ?? false,
  );

  useEffect(() => {
    setDarkMode(defaultSetting);
  }, [defaultSetting, setDarkMode]);

  return {
    isDarkMode,
    toggle: () => setDarkMode(((prev) => !prev)()),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
};

export default useDarkMode;
