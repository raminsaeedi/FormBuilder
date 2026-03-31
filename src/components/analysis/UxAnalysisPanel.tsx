import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  alpha,
  Box,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useBuilderStore } from "../../store/builderStore";
import { IssueSeverity, UxIssue } from "../../types/form";
import PanelSection from "../shared/PanelSection";
import ScoreCards from "./ScoreCards";

interface SeverityConfig {
  color: "error" | "warning" | "info";
  muiColor: string;
  softBg: string;
  borderColor: string;
  icon: ReactNode;
  label: string;
}

const severityConfig: Record<IssueSeverity, SeverityConfig> = {
  critical: {
    color: "error",
    muiColor: "#b91c1c",
    softBg: alpha("#b91c1c", 0.05),
    borderColor: alpha("#b91c1c", 0.14),
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
    label: "Critical",
  },
  warning: {
    color: "warning",
    muiColor: "#b45309",
    softBg: alpha("#b45309", 0.05),
    borderColor: alpha("#b45309", 0.14),
    icon: <WarningAmberRoundedIcon fontSize="small" />,
    label: "Warning",
  },
  info: {
    color: "info",
    muiColor: "#0f766e",
    softBg: alpha("#0f766e", 0.05),
    borderColor: alpha("#0f766e", 0.14),
    icon: <InfoOutlinedIcon fontSize="small" />,
    label: "Suggestion",
  },
};

function getScoreTone(score: number) {
  if (score >= 80) {
    return {
      color: "success" as const,
      accent: "#0f766e",
      label: "Healthy baseline",
      description:
        "The current form is in a strong state with only minor optimisation potential.",
    };
  }

  if (score >= 55) {
    return {
      color: "warning" as const,
      accent: "#b45309",
      label: "Moderate friction",
      description:
        "The form is usable, but several improvements would reduce hesitation and drop-off.",
    };
  }

  return {
    color: "error" as const,
    accent: "#b91c1c",
    label: "High friction risk",
    description:
      "The current structure is likely to create avoidable friction and should be refined before release.",
  };
}

function ScoreOverview({ score }: { score: number }) {
  const tone = getScoreTone(score);

  return (
    <Box
      sx={{
        borderRadius: "20px",
        border: "1px solid",
        borderColor: alpha("#0f172a", 0.08),
        bgcolor: alpha("#f8fafc", 0.92),
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
        px: { xs: 2, sm: 2.4 },
        py: { xs: 1.9, sm: 2.15 },
      }}
    >
      <Stack spacing={1.5}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.25}
        >
          <Stack spacing={0.45} sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="text.secondary">
              Overall assessment
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {tone.label}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 560 }}
            >
              {tone.description}
            </Typography>
          </Stack>

          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: "14px",
              border: "1px solid",
              borderColor: alpha(tone.accent, 0.16),
              bgcolor: alpha(tone.accent, 0.05),
              minWidth: 108,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 0.25 }}
            >
              Score
            </Typography>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: tone.accent, lineHeight: 1 }}
            >
              {score}
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "text.disabled", fontWeight: 500, ml: 0.25 }}
              >
                /100
              </Typography>
            </Typography>
          </Box>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={score}
          color={tone.color}
          sx={{
            height: 8,
            borderRadius: 999,
            bgcolor: alpha("#94a3b8", 0.14),
          }}
        />
      </Stack>
    </Box>
  );
}

function SummaryChips({
  totalFields,
  requiredFields,
  optionalFields,
  longLabels,
}: {
  totalFields: number;
  requiredFields: number;
  optionalFields: number;
  longLabels: number;
}) {
  return (
    <Stack direction="row" spacing={0.9} flexWrap="wrap" useFlexGap>
      <Chip
        label={`${totalFields} field${totalFields !== 1 ? "s" : ""}`}
        size="small"
        variant="outlined"
      />
      <Chip
        label={`${requiredFields} required`}
        size="small"
        variant="outlined"
        color={requiredFields >= 5 ? "warning" : "default"}
      />
      <Chip
        label={`${optionalFields} optional`}
        size="small"
        variant="outlined"
      />
      {longLabels > 0 && (
        <Chip
          label={`${longLabels} long label${longLabels !== 1 ? "s" : ""}`}
          size="small"
          variant="outlined"
          color="warning"
        />
      )}
    </Stack>
  );
}

interface IssueCardProps {
  issue: UxIssue;
  fieldLabel?: string;
}

function IssueCard({ issue, fieldLabel }: IssueCardProps) {
  const cfg = severityConfig[issue.severity];

  return (
    <Box
      sx={{
        borderRadius: "18px",
        border: "1px solid",
        borderColor: cfg.borderColor,
        bgcolor: alpha("#ffffff", 0.98),
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 3,
          bgcolor: cfg.muiColor,
        }}
      />

      <Box sx={{ px: 2.1, py: 1.9 }}>
        <Stack spacing={1.25}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="flex-start"
              sx={{ minWidth: 0 }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: cfg.muiColor,
                  bgcolor: cfg.softBg,
                  border: "1px solid",
                  borderColor: cfg.borderColor,
                  flexShrink: 0,
                }}
              >
                {cfg.icon}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ lineHeight: 1.35, wordBreak: "break-word" }}
                >
                  {issue.title}
                </Typography>
                {fieldLabel && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 0.35 }}
                  >
                    Affects field:{" "}
                    <Box
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 600 }}
                    >
                      {fieldLabel}
                    </Box>
                  </Typography>
                )}
              </Box>
            </Stack>

            <Chip
              label={cfg.label}
              size="small"
              variant="outlined"
              sx={{
                color: cfg.muiColor,
                borderColor: cfg.borderColor,
                bgcolor: cfg.softBg,
                fontWeight: 700,
                flexShrink: 0,
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.65 }}
          >
            {issue.description}
          </Typography>

          <Box
            sx={{
              borderRadius: "14px",
              border: "1px solid",
              borderColor: alpha("#0f172a", 0.08),
              bgcolor: alpha("#f8fafc", 0.86),
              px: 1.35,
              py: 1.05,
            }}
          >
            <Stack direction="row" spacing={0.9} alignItems="flex-start">
              <LightbulbOutlinedIcon
                sx={{
                  fontSize: "0.95rem",
                  color: cfg.muiColor,
                  mt: 0.15,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ display: "block", color: "text.secondary", mb: 0.2 }}
                >
                  Recommendation
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.55 }}>
                  {issue.recommendation}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

function NoIssues() {
  return (
    <Box
      sx={{
        borderRadius: "18px",
        border: "1px solid",
        borderColor: alpha("#0f766e", 0.16),
        bgcolor: alpha("#0f766e", 0.05),
        px: { xs: 2, sm: 2.25 },
        py: { xs: 2, sm: 2.25 },
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="flex-start">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0f766e",
            bgcolor: alpha("#0f766e", 0.08),
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.14),
            flexShrink: 0,
          }}
        >
          <CheckCircleOutlineRoundedIcon fontSize="small" />
        </Box>

        <Stack spacing={0.45}>
          <Typography variant="subtitle2" sx={{ color: "#0f766e" }}>
            No issues detected
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.65 }}
          >
            This form currently passes the active heuristic checks. Maintain
            concise labels, clear helper text and a restrained number of
            required inputs as the form evolves.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

interface IssueGroupProps {
  severity: IssueSeverity;
  issues: UxIssue[];
  fieldLabelById: Record<string, string>;
}

function IssueGroup({ severity, issues, fieldLabelById }: IssueGroupProps) {
  if (issues.length === 0) return null;

  const cfg = severityConfig[severity];

  return (
    <Stack spacing={1.2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 0.25,
        }}
      >
        <Stack direction="row" spacing={0.9} alignItems="center">
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "9px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: cfg.muiColor,
              bgcolor: cfg.softBg,
              border: "1px solid",
              borderColor: cfg.borderColor,
            }}
          >
            {cfg.icon}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {cfg.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {issues.length} item{issues.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Stack>

        <Chip
          label={`${issues.length}`}
          size="small"
          variant="outlined"
          sx={{
            color: cfg.muiColor,
            borderColor: cfg.borderColor,
            bgcolor: cfg.softBg,
            fontWeight: 700,
          }}
        />
      </Stack>

      <Stack spacing={1.1}>
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            fieldLabel={
              issue.fieldId ? fieldLabelById[issue.fieldId] : undefined
            }
          />
        ))}
      </Stack>
    </Stack>
  );
}

function IssuesSectionHeader({
  totalIssues,
  criticalCount,
}: {
  totalIssues: number;
  criticalCount: number;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={1.25}
    >
      <Stack spacing={0.45}>
        <Typography variant="overline" color="text.secondary">
          Findings
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          Validation issues
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 620 }}
        >
          Review the findings below in order of severity. Resolve critical
          issues first, then reduce warning-level friction and informational
          suggestions.
        </Typography>
      </Stack>

      <Chip
        label={`${totalIssues} issue${totalIssues !== 1 ? "s" : ""}`}
        size="small"
        color={criticalCount > 0 ? "error" : "warning"}
        variant="outlined"
        sx={{ fontWeight: 700, flexShrink: 0 }}
      />
    </Stack>
  );
}

function UxAnalysisPanel() {
  const analysis = useBuilderStore((s) => s.analysisResult);
  const fields = useBuilderStore((s) => s.form.fields);

  const fieldLabelById = Object.fromEntries(
    fields.map((field) => [field.id, field.label || `Unnamed (${field.type})`]),
  ) as Record<string, string>;

  const criticalIssues = analysis.issues.filter(
    (issue) => issue.severity === "critical",
  );
  const warningIssues = analysis.issues.filter(
    (issue) => issue.severity === "warning",
  );
  const infoIssues = analysis.issues.filter(
    (issue) => issue.severity === "info",
  );
  const totalIssues = analysis.issues.length;

  return (
    <PanelSection
      eyebrow="Analysis"
      title="UX validation"
      description="Structured heuristic feedback for evaluating form quality, friction and completion risk."
      actions={
        <Chip
          icon={<InsightsRoundedIcon />}
          label={`${analysis.score}/100`}
          color={
            analysis.score >= 80
              ? "success"
              : analysis.score >= 55
                ? "warning"
                : "error"
          }
          size="small"
          sx={{ fontWeight: 700 }}
        />
      }
    >
      <Stack spacing={3}>
        <Box
          sx={{
            borderRadius: "20px",
            border: "1px solid",
            borderColor: alpha("#0f172a", 0.08),
            bgcolor: alpha("#f8fafc", 0.55),
            px: { xs: 1.5, sm: 1.75 },
            py: { xs: 1.5, sm: 1.75 },
          }}
        >
          <Stack spacing={1.75}>
            <Stack spacing={0.45}>
              <Typography variant="overline" color="text.secondary">
                Score summary
              </Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                Quality indicators
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A compact view of the most important quality signals for the
                current form configuration.
              </Typography>
            </Stack>

            <ScoreCards />
            <ScoreOverview score={analysis.score} />
            <SummaryChips
              totalFields={analysis.summary.totalFields}
              requiredFields={analysis.summary.requiredFields}
              optionalFields={analysis.summary.optionalFields}
              longLabels={analysis.summary.longLabels}
            />
          </Stack>
        </Box>

        <Divider />

        <Stack spacing={1.75}>
          <IssuesSectionHeader
            totalIssues={totalIssues}
            criticalCount={criticalIssues.length}
          />

          {totalIssues === 0 ? (
            <NoIssues />
          ) : (
            <Stack spacing={2.25}>
              <IssueGroup
                severity="critical"
                issues={criticalIssues}
                fieldLabelById={fieldLabelById}
              />
              <IssueGroup
                severity="warning"
                issues={warningIssues}
                fieldLabelById={fieldLabelById}
              />
              <IssueGroup
                severity="info"
                issues={infoIssues}
                fieldLabelById={fieldLabelById}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </PanelSection>
  );
}

export default UxAnalysisPanel;
