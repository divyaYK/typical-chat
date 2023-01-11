export const getStyleBasedOnType = (style: number | string | undefined) => {
  switch (typeof style) {
    case "number":
      return `${style}px`;
    case "string":
      return style;
    default:
      return "50px";
  }
};
