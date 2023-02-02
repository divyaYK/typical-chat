import useMode from "../../hooks/useMode";
import { IStyledSkeletonProps, StyledSkeleton } from "./SkeletonStyles";

const Skeleton = (props: IStyledSkeletonProps) => {
  const { mode } = useMode();
  return <StyledSkeleton mode={mode} {...props} />;
};

export default Skeleton;
