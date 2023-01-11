import { Icon } from "../icon/Icon";
import { StyledSearchInput, StyledSearchWrapper } from "./SearchStyles";

const Search = () => (
  <StyledSearchWrapper>
    <StyledSearchInput type="search" placeholder="Search" />
    <Icon icon="Search" />
  </StyledSearchWrapper>
);

export default Search;
