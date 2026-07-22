export const themeTokens = {
  colors: {
    background: "#080C14",
    backgroundSoft: "#0A0F24",
    surface: "rgba(255, 255, 255, 0.08)",
    surfaceStrong: "rgba(255, 255, 255, 0.13)",
    border: "rgba(153, 190, 255, 0.18)",
    text: "#F7FBFF",
    muted: "#9AA8C7",
    blue: "#00B2FF",
    violet: "#7B61FF",
    cyan: "#38F5FF",
    green: "#57FFB0",
    danger: "#FF5C8A"
  },
  radii: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    pill: "999px"
  },
  effects: {
    glassBlur: "20px",
    glowBlue: "0 0 32px rgba(0, 178, 255, 0.25)",
    glowViolet: "0 0 32px rgba(123, 97, 255, 0.25)",
    cardShadow: "0 24px 80px rgba(0, 0, 0, 0.34)"
  }
} as const;
