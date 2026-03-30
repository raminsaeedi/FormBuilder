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
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "18px",
        bgcolor: "background.paper",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(15, 23, 42, 0.05)",
      }}
    >
      {/* ── Panel header ── */}
      <Box
        sx={{
          px: 2.5,
          pt: 2.25,
          pb: 2,
          background: `linear-gradient(180deg, ${alpha("#f8faff", 1)} 0%, ${alpha("#ffffff", 1)} 100%)`,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          alignItems="flex-start"
        >
          <Box sx={{ minWidth: 0 }}>
            {eyebrow && (
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: "0.12em",
                  display: "block",
                  mb: 0.4,
                }}
              >
                {eyebrow}
              </Typography>
            )}
            <Typography variant="h5">{title}</Typography>
            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, lineHeight: 1.55 }}
              >
                {description}
              </Typography>
            )}
          </Box>
          {actions && <Box sx={{ flexShrink: 0, pt: 0.25 }}>{actions}</Box>}
        </Stack>
      </Box>

      {/* ── Divider ── */}
      <Divider />

      {/* ── Panel body ── */}
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Box>
  );
}

export default PanelSection;
