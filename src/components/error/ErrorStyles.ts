import styled from "styled-components";
import { IMode } from "../../utils/types";
import { ThemeEnum } from "../../theme";

export const ErrorWrapper = styled.section<IMode>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_01
    : theme.COLORS.LIGHT.BACKGROUND_01)};
`;

export const ErrorBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;

  & h1 {
    margin-top: 2rem;
  }

  & p {
    margin-top: 1rem;
    font-weight: normal;
  }

  & button {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
`;
