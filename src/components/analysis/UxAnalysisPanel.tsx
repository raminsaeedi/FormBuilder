import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import PanelSection from "../shared/PanelSection";
import { useBuilderStore } from "../../store/builderStore";
import { analyzeForm } from "../../utils/analysis";
import { WarningSeverity } from "../../types/form";

const severityColor: Record<
  WarningSeverity,
  "default" | "info" | "warning" | "error"
> = {
  info: "info",
  warning: "warning",
  critical: "error",
};

function UxAnalysisPanel() {
  const form = useBuilderStore((state) => state.form);
  const analysis = analyzeForm(form);

  return (
    <PanelSection
      eyebrow="Analysis"
      title="UX validation demo"
      description="A lightweight heuristic layer to show how the product can surface usability risk early."
      actions={
        <Chip
          icon={<InsightsRoundedIcon />}
          label={`Score ${analysis.score}/100`}
          color="primary"
        />
      }
    >
      <Stack spacing={2}>
        <Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Form clarity score</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {analysis.score}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={analysis.score}
            sx={{
              height: 10,
              borderRadius: 10,
              bgcolor: "rgba(148, 163, 184, 0.18)",
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            icon={<TaskAltRoundedIcon />}
            label={`${analysis.summary.requiredFields} required`}
            variant="outlined"
          />
          <Chip
            label={`${analysis.summary.optionalFields} optional`}
            variant="outlined"
          />
          <Chip
            label={`${analysis.summary.longLabels} long labels`}
            variant="outlined"
          />
        </Stack>

        <Stack spacing={1.25}>
          {analysis.warnings.map((warning) => (
            <Box
              key={warning.id}
              sx={{
                p: 1.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                bgcolor: "grey.50",
              }}
            >
              <Stack spacing={0.8}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography variant="subtitle2">{warning.title}</Typography>
                  <Chip
                    size="small"
                    color={severityColor[warning.severity]}
                    label={warning.severity}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {warning.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Recommendation: {warning.recommendation}
                </Typography>
              </Stack>
            </Box>
          ))}

          {!analysis.warnings.length ? (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: "rgba(15, 118, 110, 0.08)",
              }}
            >
              <ReportProblemRoundedIcon color="success" />
              <Typography variant="body2">
                No major issues detected in this mock form state.
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </PanelSection>
  );
}

export default UxAnalysisPanel;
