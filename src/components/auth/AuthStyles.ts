import styled from "styled-components";
import { Input } from "../input/Input";

export const StyledFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: ${({ theme }) => theme.COLORS.LIGHT.BACKGROUND_01}; */
  background-color: transparent;
  min-height: 50%;
  width: 25%;
  border-radius: 1.5rem;
  padding: 2rem;
  justify-content: space-evenly;
  box-shadow: 0px 0px 80px 30px ${({ theme }) => theme.COLORS.EMERALD_GREEN};
`;

export const StyledFormInput = styled(Input)`
  background-color: ${({ theme }) => theme.COLORS.LIGHT.BACKGROUND_01};
`;
