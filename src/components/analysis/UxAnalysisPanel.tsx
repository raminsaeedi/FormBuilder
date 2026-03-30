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
  borderColor: string;
  icon: ReactNode;
  label: string;
  order: number;
}

const severityConfig: Record<IssueSeverity, SeverityConfig> = {
  critical: {
    color: "error",
    muiColor: "#dc2626",
    bgColor: alpha("#dc2626", 0.04),
    borderColor: alpha("#dc2626", 0.2),
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
    label: "Critical",
    order: 0,
  },
  warning: {
    color: "warning",
    muiColor: "#d97706",
    bgColor: alpha("#d97706", 0.04),
    borderColor: alpha("#d97706", 0.2),
    icon: <WarningAmberRoundedIcon fontSize="small" />,
    label: "Warning",
    order: 1,
  },
  info: {
    color: "info",
    muiColor: "#0891b2",
    bgColor: alpha("#0891b2", 0.04),
    borderColor: alpha("#0891b2", 0.2),
    icon: <InfoOutlinedIcon fontSize="small" />,
    label: "Suggestion",
    order: 2,
  },
};

// ─────────────────────���───────────────────────
// Score bar
// ─────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const barColor = score >= 80 ? "success" : score >= 55 ? "warning" : "error";

  const scoreLabel =
    score >= 80
      ? "Looking good — minor polish may still help"
      : score >= 55
        ? "Room to improve — review the issues below"
        : "High friction risk — address critical issues first";

  const scoreColor =
    score >= 80 ? "success.main" : score >= 55 ? "warning.main" : "error.main";

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: alpha("#f8faff", 0.8),
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1.25 }}
      >
        <Stack spacing={0.2}>
          <Typography variant="subtitle2">Overall UX score</Typography>
          <Typography variant="caption" color="text.secondary">
            {scoreLabel}
          </Typography>
        </Stack>
        <Typography variant="h5" fontWeight={800} color={scoreColor}>
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
          height: 7,
          borderRadius: 8,
          bgcolor: "rgba(148, 163, 184, 0.12)",
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
        display: "flex",
        borderRadius: "10px",
        border: "1px solid",
        borderColor: cfg.borderColor,
        bgcolor: cfg.bgColor,
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <Box
        sx={{
          width: 3,
          flexShrink: 0,
          bgcolor: cfg.muiColor,
          borderRadius: "10px 0 0 10px",
        }}
      />

      {/* Content */}
      <Box sx={{ p: 1.5, flex: 1, minWidth: 0 }}>
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
                height: 18,
                fontSize: "0.65rem",
                fontWeight: 700,
              }}
            />
          </Stack>

          {/* Field reference */}
          {fieldLabel && (
            <Typography variant="caption" color="text.disabled">
              Affects field: <strong>{fieldLabel}</strong>
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
                fontSize: "0.85rem",
                color: "text.disabled",
                mt: 0.2,
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
        borderRadius: "10px",
        bgcolor: alpha("#0f766e", 0.06),
        border: "1px solid",
        borderColor: alpha("#0f766e", 0.18),
      }}
    >
      <CheckCircleOutlineRoundedIcon sx={{ color: "#0f766e", flexShrink: 0 }} />
      <Box>
        <Typography variant="subtitle2" sx={{ color: "#0f766e" }}>
          No issues found — great work!
        </Typography>
        <Typography variant="caption" color="text.secondary">
          This form passes all heuristic checks. Keep labels concise and help
          texts informative as you add more fields.
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
    <Stack spacing={0.75}>
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
          sx={{ flex: 1, height: "1px", bgcolor: alpha(cfg.muiColor, 0.18) }}
        />
        <Typography
          variant="caption"
          sx={{ color: cfg.muiColor, fontWeight: 700 }}
        >
          {issues.length}
        </Typography>
      </Stack>

      {/* Issue cards */}
      <Stack spacing={0.6}>
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

  const fieldLabelById = Object.fromEntries(
    fields.map((field) => [field.id, field.label || `Unnamed (${field.type})`]),
  ) as Record<string, string>;

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
      description="Heuristic checks that surface usability risk before your users encounter it."
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

        {/* ── Issues section header ── */}
        <Stack spacing={0.4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={0.1}>
              <Typography variant="subtitle2">Detected issues</Typography>
              {totalIssues > 0 && (
                <Typography variant="caption" color="text.secondary">
                  Fix critical issues first — they have the highest impact on
                  completion rates.
                </Typography>
              )}
            </Stack>
            {totalIssues > 0 && (
              <Chip
                label={`${totalIssues} issue${totalIssues !== 1 ? "s" : ""}`}
                size="small"
                color={criticalIssues.length > 0 ? "error" : "warning"}
                variant="outlined"
                sx={{ height: 20, fontSize: "0.65rem", flexShrink: 0, ml: 1 }}
              />
            )}
          </Stack>
        </Stack>

        {/* ── Issues list or success state ── */}
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
