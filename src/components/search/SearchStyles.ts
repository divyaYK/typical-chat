import styled from "styled-components";

export const StyledSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.COLORS.DARK.BACKGROUND_02};
  border: 2px solid transparent;
  border-radius: 0.8rem;

  & svg {
    color: white;
    width: 1.5rem;
  }

  &:focus-within {
    border-color: ${(props) => props.theme.COLORS.EMERALD_GREEN};
  }
`;

export const StyledSearchInput = styled.input`
  flex-grow: 1;
  background-color: transparent;
  color: inherit;
  font-size: ${(props) => props.theme.FONT.SIZE.lg};
  outline: none;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
`;
