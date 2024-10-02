export const gradientColor = (colorScheme) => {
  if (colorScheme === "dark") {
    return ["rgba(10, 110, 1, 1)", "rgba(255, 255, 255, 0.2)"];
  } else {
    return ["rgba(255, 255, 255, 0.2)", "rgba(0, 0,0, 0)"];
  }
};
