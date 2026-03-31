import { alpha, Box, Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PanelSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

function PanelSection({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PanelSectionProps) {
  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid",
        borderColor: alpha("#0f172a", 0.08),
        borderRadius: "24px",
        bgcolor: alpha("#ffffff", 0.96),
        overflow: "hidden",
        boxShadow: "0 14px 36px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(10px)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(248,250,252,0.82) 0%, rgba(255,255,255,0) 140px)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            px: { xs: 2, md: 2.75 },
            pt: { xs: 2.1, md: 2.5 },
            pb: { xs: 1.75, md: 2 },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={{ xs: 1.5, sm: 2 }}
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              {eyebrow && (
                <Typography
                  variant="overline"
                  sx={{
                    color: "text.secondary",
                    letterSpacing: "0.12em",
                    display: "block",
                    mb: 0.55,
                  }}
                >
                  {eyebrow}
                </Typography>
              )}

              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  fontWeight: 750,
                }}
              >
                {title}
              </Typography>

              {description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.8,
                    lineHeight: 1.7,
                    maxWidth: 760,
                  }}
                >
                  {description}
                </Typography>
              )}
            </Box>

            {actions && (
              <Box
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: "flex-start", sm: "flex-start" },
                  pt: { xs: 0, sm: 0.15 },
                }}
              >
                {actions}
              </Box>
            )}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: alpha("#0f172a", 0.065) }} />

        <Box
          sx={{
            px: { xs: 2, md: 2.75 },
            py: { xs: 2.1, md: 2.6 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default PanelSection;
