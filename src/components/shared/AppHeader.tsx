import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { templates } from "../../data/mockForm";
import { useBuilderStore } from "../../store/builderStore";

// ─────────────────────────────────────────────
// Sub-component: Score badge shown next to the title
// ─────────────────────────────────────────────

function ScoreBadge() {
  const score = useBuilderStore((s) => s.analysisResult.score);
  const issueCount = useBuilderStore((s) => s.analysisResult.issues.length);

  const color = score >= 80 ? "success" : score >= 55 ? "warning" : "error";

  return (
    <Tooltip
      title={`${issueCount} UX issue${issueCount !== 1 ? "s" : ""} detected`}
      arrow
    >
      <Chip
        icon={<InsightsRoundedIcon />}
        label={`UX score ${score}/100`}
        color={color}
        size="small"
        sx={{ fontWeight: 700, cursor: "default" }}
      />
    </Tooltip>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function AppHeader() {
  const formName = useBuilderStore((s) => s.form.name);
  const fieldCount = useBuilderStore((s) => s.form.fields.length);
  const previewMode = useBuilderStore((s) => s.previewMode);
  const togglePreviewMode = useBuilderStore((s) => s.togglePreviewMode);
  const loadTemplate = useBuilderStore((s) => s.loadTemplate);
  const resetToPrimaryTemplate = useBuilderStore(
    (s) => s.resetToPrimaryTemplate,
  );

  return (
    <Box
      component="header"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        px: { xs: 2, md: 3 },
        py: 2.5,
        bgcolor: "background.paper",
        boxShadow: "0 24px 80px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
      >
        {/* ── Left: branding + meta ── */}
        <Stack spacing={1.25}>
          {/* Status chips */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="UI MVP"
              color="primary"
              size="small"
            />
            <Chip label="Draft" variant="outlined" size="small" />
            <Chip
              label={`${fieldCount} field${fieldCount !== 1 ? "s" : ""}`}
              variant="outlined"
              size="small"
            />
            <ScoreBadge />
          </Stack>

          {/* Title */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Smart Form Builder
            </Typography>
            <Typography variant="body1" color="text.secondary">
              UX Validation · Single-page builder dashboard
            </Typography>
          </Box>

          {/* Active form name */}
          <Stack direction="row" spacing={1} alignItems="center">
            <DashboardCustomizeRoundedIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Active form:{" "}
              <Box component="span" fontWeight={600} color="text.primary">
                {formName}
              </Box>
            </Typography>
          </Stack>
        </Stack>

        {/* ── Right: action buttons ── */}
        <Stack spacing={1.5} alignItems={{ xs: "flex-start", lg: "flex-end" }}>
          {/* Primary actions */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            {/* Preview toggle */}
            <Tooltip
              title={
                previewMode
                  ? "Switch back to the builder canvas"
                  : "See how the form looks to end users"
              }
              arrow
            >
              <Button
                variant={previewMode ? "contained" : "outlined"}
                startIcon={
                  previewMode ? (
                    <VisibilityOffRoundedIcon />
                  ) : (
                    <VisibilityRoundedIcon />
                  )
                }
                onClick={togglePreviewMode}
                color={previewMode ? "primary" : "inherit"}
              >
                {previewMode ? "Exit preview" : "Preview"}
              </Button>
            </Tooltip>

            {/* Analyze — scrolls to the analysis panel */}
            <Tooltip title="Jump to the UX analysis panel" arrow>
              <Button
                variant="outlined"
                startIcon={<InsightsRoundedIcon />}
                onClick={() => {
                  document
                    .getElementById("ux-analysis-panel")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Analyze
              </Button>
            </Tooltip>
          </Stack>

          <Divider flexItem sx={{ display: { xs: "none", sm: "block" } }} />

          {/* Template loaders */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Tooltip title="Restore the default signup demo form" arrow>
              <Button
                variant="text"
                size="small"
                startIcon={<RestartAltRoundedIcon />}
                onClick={resetToPrimaryTemplate}
              >
                Reset demo
              </Button>
            </Tooltip>

            <Tooltip
              title="Load a checkout form with realistic UX pain points"
              arrow
            >
              <Button
                variant="text"
                size="small"
                startIcon={<DashboardCustomizeRoundedIcon />}
                onClick={() => loadTemplate(templates[1])}
              >
                Checkout template
              </Button>
            </Tooltip>

            <Tooltip
              title="Load a support form with intentional UX issues — score ~38"
              arrow
            >
              <Button
                variant="text"
                size="small"
                color="error"
                startIcon={<BugReportRoundedIcon />}
                onClick={() => loadTemplate(templates[2])}
              >
                UX stress test
              </Button>
            </Tooltip>

            <Tooltip title="Add a new blank field to the canvas" arrow>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  document
                    .getElementById("field-library")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Add field
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AppHeader;
