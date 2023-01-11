import styled from "styled-components";

export const StyledToggleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

export const StyledToggleLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.COLORS.EMERALD_GREEN};
  border-radius: 1rem;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 5px;

  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.COLORS.EMERALD_GREEN};
    transition: all 0.3s ease;
  }
`;

export const StyledToggleInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;

  &:checked + ${StyledToggleLabel}::after {
    transform: translateX(65%);
  }

  & + ${StyledToggleLabel} .sun {
    visibility: visible;
    z-index: 1;
  }

  & + ${StyledToggleLabel} .moon {
    visibility: hidden;
  }

  &:checked + ${StyledToggleLabel} .moon {
    visibility: visible;
    z-index: 1;
  }

  &:checked + ${StyledToggleLabel} .sun {
    visibility: hidden;
  }
`;
