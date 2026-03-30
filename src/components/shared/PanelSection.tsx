import { Box, Stack, Typography } from "@mui/material";
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
        borderRadius: 4,
        bgcolor: "background.paper",
        p: 2.25,
        boxShadow: "0 16px 60px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          alignItems="flex-start"
        >
          <Box>
            {eyebrow ? (
              <Typography
                variant="overline"
                color="primary.main"
                sx={{ letterSpacing: "0.12em" }}
              >
                {eyebrow}
              </Typography>
            ) : null}
            <Typography variant="h5">{title}</Typography>
            {description ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75 }}
              >
                {description}
              </Typography>
            ) : null}
          </Box>
          {actions}
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}

export default PanelSection;
