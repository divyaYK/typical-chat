import { ComponentPropsWithoutRef, forwardRef } from "react";
import { StyledInput } from "./InputStyles";
import useMode from "../../hooks/useMode";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ ...props }, ref) => {
  const { mode } = useMode();
  return <StyledInput mode={mode} ref={ref} {...props} />;
});
