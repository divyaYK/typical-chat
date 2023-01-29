import { useContext } from "react";
import { ModeContext } from "../context/ModeContext";

const useMode = () => {
  const {
    isDarkMode, mode, enable, disable,
  } = useContext(ModeContext);
  return {
    isDarkMode, mode, enable, disable,
  };
};

export default useMode;
