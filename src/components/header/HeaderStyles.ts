import styled from "styled-components";

export const StyledHeaderLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem;

  & svg {
    color: white;
  }

  & h1 {
    margin-left: 0.5rem;
  }
`;

export const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  justify-self: flex-end;
  min-width: 10%;
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.COLORS.DARK.BACKGROUND_03};
  border-bottom: 4px solid ${({ theme }) => theme.COLORS.DARK.BACKGROUND_01};
`;
