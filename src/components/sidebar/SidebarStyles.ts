import styled from "styled-components";

export const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5%;
  height: 100%;
  padding: 1rem 0.5rem;
`;

export const StyledSidebarFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSidebarActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: white;
  width: 100%;

  & svg {
    height: 1.5rem;
    margin: 1rem 0;
  }
`;
