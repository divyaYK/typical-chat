import useMode from "../../hooks/useMode";
import { Icon } from "../icon/Icon";
import { StyledSearchInput, StyledSearchWrapper } from "./SearchStyles";

const Search = () => {
  const { mode } = useMode();

  return (
    <StyledSearchWrapper mode={mode}>
      <StyledSearchInput type="search" placeholder="Search" />
      <Icon icon="Search" />
    </StyledSearchWrapper>
  );
};

export default Search;
