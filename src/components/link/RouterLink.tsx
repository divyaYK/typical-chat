import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  margin: 0 0.5rem;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.EMERALD_GREEN};

  &:visited,
  &:hover,
  &:focus {
    color: inherit;
  }

  &:hover,
  &:focus {
    border: 1px solid transparent;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.COLORS.EMERALD_GREEN};
    transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover::before,
  &:focus::before {
    width: 100%;
    left: 0;
    right: auto;
  }
`;

export default StyledLink;
