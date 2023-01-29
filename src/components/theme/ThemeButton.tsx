import { useRef } from "react";
import { Icon } from "../icon/Icon";
import {
  StyledToggleInput,
  StyledToggleLabel,
  StyledToggleWrapper,
} from "./TogglerStyles";
import useMode from "../../hooks/useMode";

const ThemeButton = () => {
  const { isDarkMode, enable, disable } = useMode();
  const themeRef = useRef<HTMLInputElement>(null);

  const handleThemeChange = () => {
    if (themeRef.current?.checked) {
      enable();
    } else {
      disable();
    }
  };
  return (
    <StyledToggleWrapper>
      <StyledToggleInput
        ref={themeRef}
        checked={isDarkMode}
        onChange={handleThemeChange}
        type="checkbox"
        id="themeButton"
      />
      <StyledToggleLabel htmlFor="themeButton">
        <Icon icon="Sun" className="sun" inherit />
        <Icon icon="Moon" className="moon" />
      </StyledToggleLabel>
    </StyledToggleWrapper>
  );
};

export default ThemeButton;
