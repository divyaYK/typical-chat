import { ComponentPropsWithoutRef, forwardRef } from "react";
import { IButtonProps, StyledButton } from "./ButtonStyles";

export interface IButton
  extends ComponentPropsWithoutRef<"button">,
    IButtonProps {}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, mode, ...props }, ref) => (
    <StyledButton mode={mode} ref={ref} type="button" {...props}>
      {children}
    </StyledButton>
  ),
);

Button.displayName = "Button";

Button.defaultProps = {
  variant: "primary",
};
