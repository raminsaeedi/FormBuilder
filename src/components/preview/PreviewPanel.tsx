import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PanelSection from "../shared/PanelSection";
import FieldRenderer from "../shared/FieldRenderer";
import { useBuilderStore } from "../../store/builderStore";

// ─────────────────────────────────────────────
// Viewport mode
// ─────────────────────────────────────────────

type ViewportMode = "desktop" | "mobile";

// ─────────────────────────────────────────────
// Empty preview state
// ─────────────────────────────────────────────

function EmptyPreview() {
  return (
    <Box
      sx={{
        py: 5,
        textAlign: "center",
        border: "1.5px dashed",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "grey.50",
      }}
    >
      <VisibilityRoundedIcon
        sx={{ fontSize: 36, color: "text.disabled", mb: 1 }}
      />
      <Typography variant="subtitle2" color="text.secondary">
        No fields to preview
      </Typography>
      <Typography variant="caption" color="text.disabled">
        Add fields in the canvas to see them rendered here.
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function PreviewPanel() {
  const form = useBuilderStore((s) => s.form);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");

  const isMobile = viewport === "mobile";
  const requiredCount = form.fields.filter((f) => f.required).length;

  return (
    <PanelSection
      eyebrow="Preview"
      title="Rendered form preview"
      description="A realistic read on how the current structure feels when shown as an actual form."
      actions={
        <Stack direction="row" spacing={1} alignItems="center">
          {requiredCount > 0 && (
            <Chip
              label={`${requiredCount} required`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          <Chip
            icon={<VisibilityRoundedIcon />}
            label="Read-only preview"
            size="small"
            variant="outlined"
          />
        </Stack>
      }
    >
      <Stack spacing={3}>
        {/* ── Form header + viewport toggle ── */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="subtitle2">{form.name}</Typography>
            {form.description && (
              <Typography variant="body2" color="text.secondary">
                {form.description}
              </Typography>
            )}
          </Box>

          <ToggleButtonGroup
            value={viewport}
            exclusive
            onChange={(_, val) => val && setViewport(val)}
            size="small"
            aria-label="Viewport mode"
          >
            <Tooltip title="Desktop layout (two columns)" arrow>
              <ToggleButton value="desktop" aria-label="Desktop">
                <DesktopWindowsRoundedIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Mobile layout (single column, max 390px)" arrow>
              <ToggleButton value="mobile" aria-label="Mobile">
                <PhoneAndroidRoundedIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Stack>

        {/* ── Form preview area ── */}
        <Box
          sx={{
            mx: "auto",
            width: "100%",
            maxWidth: isMobile ? 390 : "100%",
            transition: "max-width 250ms ease",
          }}
        >
          {form.fields.length === 0 ? (
            <EmptyPreview />
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(2, minmax(0, 1fr))",
                gap: 2.5,
                transition: "grid-template-columns 250ms ease",
              }}
            >
              {form.fields.map((field) => (
                <FieldRenderer key={field.id} field={field} readOnly />
              ))}
            </Box>
          )}
        </Box>

        {/* ── Submit area ── */}
        {form.fields.length > 0 && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            sx={{ pt: 0.5 }}
          >
            <Button
              variant="contained"
              startIcon={<SendRoundedIcon />}
              sx={{ alignSelf: "flex-start" }}
            >
              Submit form
            </Button>
            <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
              Cancel
            </Button>
          </Stack>
        )}

        {/* ── Required fields legend ── */}
        {requiredCount > 0 && (
          <Typography variant="caption" color="text.disabled">
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>{" "}
            Required fields must be completed before submitting.
          </Typography>
        )}
      </Stack>
    </PanelSection>
  );
}

export default PreviewPanel;
