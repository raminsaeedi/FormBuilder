import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
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

function AppHeader() {
  const form = useBuilderStore((s) => s.form);
  const activeView = useBuilderStore((s) => s.activeView);
  const setActiveView = useBuilderStore((s) => s.setActiveView);
  const loadTemplate = useBuilderStore((s) => s.loadTemplate);
  const resetToPrimaryTemplate = useBuilderStore(
    (s) => s.resetToPrimaryTemplate,
  );

  const formName = form.name;
  const fieldCount = form.fields.length;
  const isPreviewView = activeView === "preview";
  const isAnalysisView = activeView === "analysis";
  const isBuilderView = activeView === "builder";

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#0f172a", 0.08),
        borderRadius: "24px",
        bgcolor: alpha("#ffffff", 0.94),
        boxShadow: "0 12px 36px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(10px)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(8,145,178,0.03) 45%, rgba(15,118,110,0.04) 100%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          bgcolor: alpha("#ffffff", 0.8),
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, md: 2.75, xl: 3 },
          py: { xs: 2, md: 2.25 },
        }}
      >
        <Stack spacing={{ xs: 1.75, lg: 2 }}>
          <Stack
            direction={{ xs: "column", xl: "row" }}
            spacing={{ xs: 1.75, xl: 2.5 }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", xl: "center" }}
          >
            <Stack spacing={1.1} sx={{ minWidth: 0, maxWidth: 760 }}>
              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
              >
                <Chip
                  icon={<AutoAwesomeRoundedIcon />}
                  label="Smart Form Builder"
                  color="primary"
                  size="small"
                />
                <Chip label="UX Validation" variant="outlined" size="small" />
                <Chip
                  label={`${fieldCount} field${fieldCount !== 1 ? "s" : ""}`}
                  variant="outlined"
                  size="small"
                />
                <ScoreBadge />
              </Stack>

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h4" sx={{ mb: 0.35 }}>
                  {isAnalysisView
                    ? "Review UX issues with focused analysis"
                    : isPreviewView
                      ? "Preview the form in a dedicated view"
                      : "Build forms with clearer structure and lower UX friction"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: 680, lineHeight: 1.65 }}
                >
                  {isAnalysisView
                    ? "Use the field settings on the left to refine the selected field while reviewing UX findings on the right."
                    : isPreviewView
                      ? "Inspect the rendered form in isolation without the builder workspace competing for attention."
                      : "Design the form structure, inspect field behaviour, review the rendered preview and validate usability signals in one balanced workspace."}
                </Typography>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 0.6, sm: 1.25 }}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <DashboardCustomizeRoundedIcon
                    sx={{ fontSize: "0.95rem", color: "text.disabled" }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Active form:{" "}
                    <Box
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 700 }}
                    >
                      {formName}
                    </Box>
                  </Typography>
                </Stack>

                <Typography variant="caption" color="text.disabled">
                  {isAnalysisView
                    ? "Analysis view keeps settings and findings side by side."
                    : isPreviewView
                      ? "Preview view keeps the rendered form fully focused."
                      : "Builder view keeps palette, canvas and settings visible together."}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              spacing={1.1}
              sx={{ width: { xs: "100%", xl: "auto" }, minWidth: { xl: 420 } }}
              alignItems={{ xs: "stretch", xl: "flex-end" }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ width: { xs: "100%", xl: "auto" } }}
              >
                <Tooltip
                  title={
                    isPreviewView
                      ? "Switch back to the builder view"
                      : "Open the dedicated preview view"
                  }
                  arrow
                >
                  <Button
                    variant={isPreviewView ? "contained" : "outlined"}
                    startIcon={
                      isPreviewView ? (
                        <VisibilityOffRoundedIcon />
                      ) : (
                        <VisibilityRoundedIcon />
                      )
                    }
                    onClick={() =>
                      setActiveView(isPreviewView ? "builder" : "preview")
                    }
                    color={isPreviewView ? "primary" : "inherit"}
                    sx={{ minWidth: 148 }}
                  >
                    {isPreviewView ? "Exit preview" : "Preview form"}
                  </Button>
                </Tooltip>

                <Tooltip
                  title={
                    isAnalysisView
                      ? "Switch back to the builder view"
                      : "Open the dedicated analysis view"
                  }
                  arrow
                >
                  <Button
                    variant={isAnalysisView ? "contained" : "outlined"}
                    startIcon={<InsightsRoundedIcon />}
                    onClick={() =>
                      setActiveView(isAnalysisView ? "builder" : "analysis")
                    }
                    color={isAnalysisView ? "primary" : "inherit"}
                    sx={{ minWidth: 148 }}
                  >
                    {isAnalysisView ? "Exit analysis" : "View analysis"}
                  </Button>
                </Tooltip>

                <Tooltip
                  title="Jump to the field palette to add a new field"
                  arrow
                >
                  <Button
                    variant={isBuilderView ? "contained" : "outlined"}
                    startIcon={<AddCircleOutlineRoundedIcon />}
                    onClick={() => {
                      setActiveView("builder");
                      requestAnimationFrame(() => {
                        document
                          .getElementById("field-library")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      });
                    }}
                    sx={{ minWidth: 132 }}
                  >
                    Add field
                  </Button>
                </Tooltip>
              </Stack>

              {!isAnalysisView && (
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "18px",
                    border: "1px solid",
                    borderColor: alpha("#0f172a", 0.08),
                    bgcolor: alpha("#f8fafc", 0.82),
                    px: 1.25,
                    py: 1.1,
                  }}
                >
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                    >
                      <Typography variant="overline" color="text.secondary">
                        Templates
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        Quick starting points
                      </Typography>
                    </Stack>

                    <Divider />

                    <Stack
                      direction="row"
                      spacing={0.75}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Tooltip
                        title="Restore the default signup demo form"
                        arrow
                      >
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
                        title="Load a support form with intentional UX issues"
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
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default AppHeader;
