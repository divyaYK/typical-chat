import { ComponentPropsWithoutRef, forwardRef } from "react";
import { IInputProps, StyledInput, StyledInputWrapper } from "./InputStyles";

export interface IInput
  extends ComponentPropsWithoutRef<"input">,
    IInputProps {}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ mode, ...props }, ref) => (
    <StyledInputWrapper mode={mode}>
      <StyledInput ref={ref} {...props} />
    </StyledInputWrapper>
  ),
);
