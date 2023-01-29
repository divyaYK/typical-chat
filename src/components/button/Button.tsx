import { ComponentPropsWithoutRef, forwardRef } from "react";
import { IButtonProps, StyledButton } from "./ButtonStyles";
import useMode from "../../hooks/useMode";

export interface IButton
  extends ComponentPropsWithoutRef<"button">,
    IButtonProps {}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, ...props }, ref) => {
    const { mode } = useMode();
    return (
      <StyledButton mode={mode} ref={ref} type="button" {...props}>
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";

Button.defaultProps = {
  variant: "primary",
};
