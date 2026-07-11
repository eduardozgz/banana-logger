export function mentionColor(color: number) {
  const hex = color.toString(16).padStart(6, "0");
  const alpha = (opacity: number) =>
    Math.round(255 * opacity)
      .toString(16)
      .padStart(2, "0");

  return {
    text: "#" + hex,
    background: "#" + hex + alpha(0.3),
    backgroundHover: "#" + hex + alpha(0.4),
  };
}
