import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import {
  alpha,
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
// Sub-component: live UX score badge
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
        label={`UX ${score}/100`}
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
  const form = useBuilderStore((s) => s.form);
  const previewMode = useBuilderStore((s) => s.previewMode);
  const togglePreviewMode = useBuilderStore((s) => s.togglePreviewMode);
  const loadTemplate = useBuilderStore((s) => s.loadTemplate);
  const resetToPrimaryTemplate = useBuilderStore(
    (s) => s.resetToPrimaryTemplate,
  );

  const formName = form.name;
  const fieldCount = form.fields.length;

  return (
    <Box
      component="header"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "18px",
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.5, md: 3 },
        bgcolor: "background.paper",
        boxShadow: "0 2px 16px rgba(15, 23, 42, 0.05)",
        overflow: "hidden",
        position: "relative",
        // Subtle top accent stripe
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, #2563eb 0%, #0891b2 50%, #0f766e 100%)",
          borderRadius: "18px 18px 0 0",
        },
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
      >
        {/* ── Left: branding + meta ── */}
        <Stack spacing={1.5}>
          {/* Status chips */}
          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
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
            <Typography variant="h4" gutterBottom sx={{ mb: 0.25 }}>
              Smart Form Builder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              UX Validation · Single-page builder dashboard
            </Typography>
          </Box>

          {/* Active form name */}
          <Stack direction="row" spacing={0.75} alignItems="center">
            <DashboardCustomizeRoundedIcon
              sx={{ fontSize: "0.9rem", color: "text.disabled" }}
            />
            <Typography variant="caption" color="text.secondary">
              Active form:{" "}
              <Box component="span" fontWeight={600} color="text.primary">
                {formName}
              </Box>
            </Typography>
          </Stack>
        </Stack>

        {/* ── Right: action groups ── */}
        <Stack spacing={2} alignItems={{ xs: "flex-start", lg: "flex-end" }}>
          {/* Primary actions */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
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
                {previewMode ? "Exit preview" : "Preview form"}
              </Button>
            </Tooltip>

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
                View analysis
              </Button>
            </Tooltip>

            <Tooltip title="Add a new blank field to the canvas" arrow>
              <Button
                variant="contained"
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

          <Divider flexItem />

          {/* Template loaders — visually grouped */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.75,
              p: 1.25,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: alpha("#f1f5f9", 0.8),
            }}
          >
            <Typography
              variant="overline"
              color="text.disabled"
              sx={{ width: "100%", mb: 0.25 }}
            >
              Load template
            </Typography>

            <Tooltip title="Restore the default signup demo form" arrow>
              <Button
                variant="text"
                size="small"
                startIcon={<RestartAltRoundedIcon />}
                onClick={resetToPrimaryTemplate}
                sx={{ color: "text.secondary" }}
              >
                Signup demo
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
                sx={{ color: "text.secondary" }}
              >
                Checkout
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
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AppHeader;
