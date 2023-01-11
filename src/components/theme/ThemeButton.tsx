import { useRef } from "react";
import { Icon } from "../icon/Icon";
import {
  StyledToggleInput,
  StyledToggleLabel,
  StyledToggleWrapper,
} from "./TogglerStyles";
import useDarkMode from "../../hooks/useDarkMode";

const ThemeButton = () => {
  const themeRef = useRef<HTMLInputElement>(null);
  const { isDarkMode, enable, disable } = useDarkMode();

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
        <Icon icon="Sun" className="sun" />
        <Icon icon="Moon" className="moon" />
      </StyledToggleLabel>
    </StyledToggleWrapper>
  );
};

export default ThemeButton;
