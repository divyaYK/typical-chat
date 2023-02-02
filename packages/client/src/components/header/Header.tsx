import useMode from "../../hooks/useMode";
import { Icon } from "../icon/Icon";
import ThemeButton from "../theme/ThemeButton";
import { Text } from "../typography/Text";
import {
  StyledHeader,
  StyledHeaderActions,
  StyledHeaderLogo,
} from "./HeaderStyles";

const Header = () => {
  const { mode } = useMode();

  return (
    <StyledHeader mode={mode}>
      <StyledHeaderLogo>
        <Icon width="30px" icon="Buildings" />
        <Text as="h1" variant="h3">
          Space
        </Text>
      </StyledHeaderLogo>
      <StyledHeaderActions>
        <ThemeButton />
        <Icon width="30px" icon="Bell" />
      </StyledHeaderActions>
    </StyledHeader>
  );
};

export default Header;
