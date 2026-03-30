import { alpha, createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#0f766e",
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    divider: alpha("#94a3b8", 0.18),
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h4: {
      fontSize: "1.75rem",
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontSize: "1.05rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontSize: "0.95rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "0.9rem",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.825rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "0.9rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.825rem",
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
    overline: {
      fontSize: "0.65rem",
      fontWeight: 700,
      letterSpacing: "0.12em",
      lineHeight: 1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.825rem",
          paddingInline: 14,
          paddingBlock: 6,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeSmall: {
          fontSize: "0.775rem",
          paddingInline: 10,
          paddingBlock: 4,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 4px 24px rgba(15, 23, 42, 0.06)",
          border: "1px solid",
          borderColor: alpha("#94a3b8", 0.18),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: "0.72rem",
        },
        sizeSmall: {
          height: 22,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 2px 12px rgba(15, 23, 42, 0.06)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            fontSize: "0.825rem",
            backgroundColor: "#fafbfc",
            transition: "background-color 150ms ease",
            "&:hover": {
              backgroundColor: "#f8faff",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.825rem",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "0.72rem",
            marginTop: 4,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: "0.825rem",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px !important",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.775rem",
          padding: "5px 10px",
          border: `1px solid ${alpha("#94a3b8", 0.25)} !important`,
          color: "#475569",
          "&.Mui-selected": {
            backgroundColor: alpha("#2563eb", 0.1),
            color: "#2563eb",
            "&:hover": {
              backgroundColor: alpha("#2563eb", 0.15),
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: 4,
          "& .MuiToggleButtonGroup-grouped": {
            borderRadius: "8px !important",
            border: `1px solid ${alpha("#94a3b8", 0.25)} !important`,
            marginLeft: "0 !important",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha("#94a3b8", 0.15),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.72rem",
          borderRadius: 8,
          padding: "5px 10px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        sizeSmall: {
          padding: 5,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
