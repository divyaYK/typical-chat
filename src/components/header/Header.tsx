import useDarkMode from "../../hooks/useDarkMode";
import { ThemeEnum } from "../../theme";
import { Icon } from "../icon/Icon";
import ThemeButton from "../theme/ThemeButton";
import { Text } from "../typography/Text";
import {
  StyledHeader,
  StyledHeaderActions,
  StyledHeaderLogo,
} from "./HeaderStyles";

const Header = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledHeader>
      <StyledHeaderLogo>
        <Icon width="30px" icon="Buildings" />
        <Text
          as="h1"
          variant="h3"
          mode={isDarkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT}
        >
          Space
        </Text>
      </StyledHeaderLogo>
      <StyledHeaderActions>
        <ThemeButton />
        <Icon width="30px" icon="Bell" color="white" />
      </StyledHeaderActions>
    </StyledHeader>
  );
};

export default Header;
