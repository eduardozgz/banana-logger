import { useMediaQuery } from "./useMediaQuery";

const screens: Record<string, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export function useBreakpoint(breakpoint: keyof typeof screens) {
  const screenBreakpoint = screens[breakpoint];

  const isActive = useMediaQuery(`(min-width: ${screenBreakpoint})`);

  return isActive;
}
