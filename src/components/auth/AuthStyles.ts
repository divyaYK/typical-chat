import styled from "styled-components";
import { IMode } from "../../utils/types";
import { ThemeEnum } from "../../theme";

export const StyledResendActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  min-width: 150px;
`;

export const StyledErrorMessage = styled.span`
  color: ${({ theme }) => theme.COLORS.RED};
  align-self: flex-start;
`;

export const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  &.form__input {
    margin-top: 1rem;

    &.form__input--password {
      margin-bottom: 1.5rem;
    }
  }

  & > div {
    width: 100%;
  }

  &.form__control__avatar ${StyledErrorMessage} {
    align-self: center;
  }
`;

export const StyledInlineFormControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-evenly;
  width: 100%;
`;

export const StyledFormFooter = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

export const StyledPostFormSubmission = styled.div<IMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  background-color: ${({ theme, mode }) =>
    mode === ThemeEnum.DARK
      ? theme.COLORS.DARK.BACKGROUND_01
      : theme.COLORS.LIGHT.BACKGROUND_02};

  & h1,
  & p {
    padding: 1rem;
    text-align: center;
  }
`;

export const StyledFormWrapper = styled.section<IMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  background-color: ${({ theme, mode }) =>
    mode === ThemeEnum.DARK
      ? theme.COLORS.DARK.BACKGROUND_01
      : theme.COLORS.LIGHT.BACKGROUND_02};

  &.form__wrapper--login {
    @media only screen and (min-width: 0) {
      width: 90vw;
      height: 60vh;
      padding: 2rem 1rem;

      & input {
        min-width: 50px;
      }
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.xs}) {
      width: 90vw;
      height: 60vh;
      padding: 2rem;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.sm}) {
      width: 60vw;
      height: 80vh;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.md}) {
      height: 40vh;
      width: 50vw;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.lg}) {
      height: 70vh;
      width: 35vw;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.xl}) {
      height: 60vh;
      width: 30vw;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.BREAKPOINTS["2xl"]}) {
      height: 65vh;
      width: 30vw;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.BREAKPOINTS["3xl"]}) {
      height: 40vh;
      width: 20vw;
    }
  }

  &.form__wrapper--signup {
    @media only screen and (min-width: 0) {
      width: 90vw;
      height: 90vh;
      padding: 2rem 1rem;

      & ${StyledForm} ${StyledInlineFormControl}.form__control--inline {
        flex-wrap: wrap;

        & ${StyledFormControl} {
          margin-bottom: 1rem;
        }
      }

      & input {
        min-width: 50px;
      }
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.xs}) {
      width: 90vw;
      height: 80vh;
      padding: 2rem;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.sm}) {
      width: 80vw;
      height: 80vh;

      & ${StyledForm} ${StyledInlineFormControl}.form__control--inline {
        flex-wrap: nowrap;

        & ${StyledFormControl} {
          margin-bottom: 0;
        }
      }
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.md}) {
      height: 80vh;
      width: 70vw;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.lg}) {
      height: 90vh;
      width: 60vw;
    }
    @media only screen and (min-width: ${({ theme }) => theme.BREAKPOINTS.xl}) {
      height: 80vh;
      width: 50vw;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.BREAKPOINTS["2xl"]}) {
      height: 80vh;
      width: 40vw;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.BREAKPOINTS["3xl"]}) {
      height: 60vh;
      width: 30vw;
    }
  }
`;
