import { forwardRef, ComponentPropsWithoutRef } from "react";
import { StyledInputLeftAddOn } from "./InputStyles";
import useMode from "../../hooks/useMode";

const InputLeftAddOn = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, ...props }, ref) => {
  const { mode } = useMode();
  return (
    <StyledInputLeftAddOn mode={mode} ref={ref} {...props}>
      {children}
    </StyledInputLeftAddOn>
  );
});

export default InputLeftAddOn;
