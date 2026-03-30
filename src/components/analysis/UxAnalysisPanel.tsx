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
import PanelSection from "../shared/PanelSection";
import ScoreCards from "./ScoreCards";
import { useBuilderStore } from "../../store/builderStore";
import { IssueSeverity, UxIssue } from "../../types/form";

// ─────────────────────────────────────────────
// Severity configuration
// ─────────────────────────────────────────────

interface SeverityConfig {
  color: "error" | "warning" | "info";
  muiColor: string;
  bgColor: string;
  icon: ReactNode;
  label: string;
  order: number;
}

const severityConfig: Record<IssueSeverity, SeverityConfig> = {
  critical: {
    color: "error",
    muiColor: "#dc2626",
    bgColor: alpha("#dc2626", 0.06),
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
    label: "Critical",
    order: 0,
  },
  warning: {
    color: "warning",
    muiColor: "#d97706",
    bgColor: alpha("#d97706", 0.06),
    icon: <WarningAmberRoundedIcon fontSize="small" />,
    label: "Warning",
    order: 1,
  },
  info: {
    color: "info",
    muiColor: "#0891b2",
    bgColor: alpha("#0891b2", 0.06),
    icon: <InfoOutlinedIcon fontSize="small" />,
    label: "Info",
    order: 2,
  },
};

// ─────────────────────────────────────────────
// Score bar
// ─────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const barColor = score >= 80 ? "success" : score >= 55 ? "warning" : "error";

  const scoreLabel =
    score >= 80
      ? "Good"
      : score >= 55
        ? "Needs improvement"
        : "Poor — action required";

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{ mb: 1 }}
      >
        <Stack spacing={0.25}>
          <Typography variant="subtitle2">Form clarity score</Typography>
          <Typography variant="caption" color="text.secondary">
            {scoreLabel}
          </Typography>
        </Stack>
        <Typography
          variant="h5"
          fontWeight={800}
          color={
            score >= 80
              ? "success.main"
              : score >= 55
                ? "warning.main"
                : "error.main"
          }
        >
          {score}
          <Typography
            component="span"
            variant="caption"
            color="text.disabled"
            fontWeight={400}
          >
            /100
          </Typography>
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={score}
        color={barColor}
        sx={{
          height: 8,
          borderRadius: 8,
          bgcolor: "rgba(148, 163, 184, 0.15)",
        }}
      />
    </Box>
  );
}

// ─────────────────────────────────────────────
// Summary chips
// ─────────────────────────────────────────────

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
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
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
          color="warning"
          variant="outlined"
        />
      )}
    </Stack>
  );
}

// ─────────────────────────────────────────────
// Single issue card
// ─────────────────────────────────────────────

interface IssueCardProps {
  issue: UxIssue;
  fieldLabel?: string;
}

function IssueCard({ issue, fieldLabel }: IssueCardProps) {
  const cfg = severityConfig[issue.severity];

  return (
    <Box
      sx={{
        p: 1.5,
        border: "1px solid",
        borderColor: alpha(cfg.muiColor, 0.25),
        borderRadius: 2.5,
        bgcolor: cfg.bgColor,
      }}
    >
      <Stack spacing={0.75}>
        {/* Header: title + severity chip */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{ minWidth: 0 }}
          >
            <Box
              sx={{
                color: cfg.muiColor,
                display: "inline-flex",
                flexShrink: 0,
              }}
            >
              {cfg.icon}
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ lineHeight: 1.3, wordBreak: "break-word" }}
            >
              {issue.title}
            </Typography>
          </Stack>
          <Chip
            label={cfg.label}
            size="small"
            color={cfg.color}
            sx={{
              flexShrink: 0,
              height: 20,
              fontSize: "0.68rem",
              fontWeight: 600,
            }}
          />
        </Stack>

        {/* Field reference */}
        {fieldLabel && (
          <Typography variant="caption" color="text.disabled">
            Field: <strong>{fieldLabel}</strong>
          </Typography>
        )}

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.5 }}
        >
          {issue.description}
        </Typography>

        {/* Recommendation */}
        <Stack direction="row" spacing={0.75} alignItems="flex-start">
          <LightbulbOutlinedIcon
            sx={{
              fontSize: "0.9rem",
              color: "text.disabled",
              mt: 0.15,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.4 }}
          >
            {issue.recommendation}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

// ─────────────────────────────────────────────
// No issues state
// ─────────────────────────────────────────────

function NoIssues() {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{
        p: 1.75,
        borderRadius: 3,
        bgcolor: alpha("#0f766e", 0.07),
        border: "1px solid",
        borderColor: alpha("#0f766e", 0.2),
      }}
    >
      <CheckCircleOutlineRoundedIcon sx={{ color: "#0f766e", flexShrink: 0 }} />
      <Box>
        <Typography variant="subtitle2" sx={{ color: "#0f766e" }}>
          No issues detected
        </Typography>
        <Typography variant="caption" color="text.secondary">
          This form looks clean. Keep labels short and help texts informative.
        </Typography>
      </Box>
    </Stack>
  );
}

// ─────────────────────────────────────────────
// Issue group (by severity)
// ─────────────────────────────────────────────

interface IssueGroupProps {
  severity: IssueSeverity;
  issues: UxIssue[];
  fieldLabelById: Record<string, string>;
}

function IssueGroup({ severity, issues, fieldLabelById }: IssueGroupProps) {
  if (issues.length === 0) return null;
  const cfg = severityConfig[severity];

  return (
    <Stack spacing={1}>
      {/* Group header */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ color: cfg.muiColor, display: "inline-flex" }}>
          {cfg.icon}
        </Box>
        <Typography
          variant="overline"
          sx={{ color: cfg.muiColor, letterSpacing: "0.1em", lineHeight: 1 }}
        >
          {cfg.label}
        </Typography>
        <Box
          sx={{ flex: 1, height: "1px", bgcolor: alpha(cfg.muiColor, 0.2) }}
        />
        <Typography
          variant="caption"
          sx={{ color: cfg.muiColor, fontWeight: 700 }}
        >
          {issues.length}
        </Typography>
      </Stack>

      {/* Issue cards */}
      <Stack spacing={0.75}>
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

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function UxAnalysisPanel() {
  const analysis = useBuilderStore((s) => s.analysisResult);
  const fields = useBuilderStore((s) => s.form.fields);

  // Build a lookup map: fieldId → field label (for issue cards)
  const fieldLabelById: Record<string, string> = {};
  fields.forEach((f) => {
    fieldLabelById[f.id] = f.label || `Unnamed (${f.type})`;
  });

  // Group issues by severity in display order
  const criticalIssues = analysis.issues.filter(
    (i) => i.severity === "critical",
  );
  const warningIssues = analysis.issues.filter((i) => i.severity === "warning");
  const infoIssues = analysis.issues.filter((i) => i.severity === "info");

  const totalIssues = analysis.issues.length;

  return (
    <PanelSection
      eyebrow="Analysis"
      title="UX validation"
      description="Heuristic checks that surface usability risk before users encounter it."
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
      <Stack spacing={2.5}>
        {/* ── Score cards ── */}
        <ScoreCards />

        {/* ── Score bar ── */}
        <ScoreBar score={analysis.score} />

        {/* ── Summary chips ── */}
        <SummaryChips
          totalFields={analysis.summary.totalFields}
          requiredFields={analysis.summary.requiredFields}
          optionalFields={analysis.summary.optionalFields}
          longLabels={analysis.summary.longLabels}
        />

        <Divider />

        {/* ── Issues section ── */}
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">Issues</Typography>
            {totalIssues > 0 && (
              <Chip
                label={`${totalIssues} found`}
                size="small"
                color={criticalIssues.length > 0 ? "error" : "warning"}
                variant="outlined"
                sx={{ height: 20, fontSize: "0.68rem" }}
              />
            )}
          </Stack>
        </Stack>

        {totalIssues === 0 ? (
          <NoIssues />
        ) : (
          <Stack spacing={2}>
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
    </PanelSection>
  );
}

export default UxAnalysisPanel;
