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
        borderRadius: "22px",
        bgcolor: alpha("#ffffff", 0.94),
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
        backdropFilter: "blur(8px)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(248,250,252,0.72) 0%, rgba(255,255,255,0) 120px)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            px: { xs: 2, md: 2.5 },
            pt: { xs: 1.9, md: 2.2 },
            pb: { xs: 1.6, md: 1.85 },
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
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                }}
              >
                {title}
              </Typography>

              {description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.7,
                    lineHeight: 1.65,
                    maxWidth: 720,
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

        <Divider sx={{ borderColor: alpha("#0f172a", 0.07) }} />

        <Box
          sx={{
            px: { xs: 2, md: 2.5 },
            py: { xs: 2, md: 2.35 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default PanelSection;
