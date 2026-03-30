import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import SpellcheckRoundedIcon from "@mui/icons-material/SpellcheckRounded";
import {
  alpha,
  Box,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useBuilderStore } from "../../store/builderStore";

// ─────────────────────────────────────────────
// Score derivation helpers
// ─────────────────────────────────────────────

function deriveScores(
  uxScore: number,
  requiredFields: number,
  totalFields: number,
  longLabels: number,
) {
  const accessibilityScore = Math.max(
    30,
    Math.min(100, uxScore - longLabels * 6),
  );
  const mobileScore = Math.max(
    30,
    Math.min(
      100,
      100 - Math.max(0, requiredFields - 3) * 10 - (totalFields > 6 ? 12 : 0),
    ),
  );
  const clarityScore = Math.max(
    30,
    Math.min(100, 100 - longLabels * 8 - Math.max(0, totalFields - 5) * 4),
  );
  return { accessibilityScore, mobileScore, clarityScore };
}

// ─────────────────────────────────────────────
// Score colour helpers
// ─────────────────────────────────────────────

type ScoreLevel = "good" | "medium" | "poor";

function getLevel(score: number): ScoreLevel {
  if (score >= 80) return "good";
  if (score >= 55) return "medium";
  return "poor";
}

const levelColor: Record<ScoreLevel, string> = {
  good: "#0f766e",
  medium: "#d97706",
  poor: "#dc2626",
};

const levelLabel: Record<ScoreLevel, string> = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
};

// ─────────────────────────────────────────────
// Circular score gauge
// ─────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const level = getLevel(score);
  const color = levelColor[level];
  const size = 72;
  const thickness = 4.5;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Background track */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{ color: alpha(color, 0.1), position: "absolute" }}
      />
      {/* Foreground value */}
      <CircularProgress
        variant="determinate"
        value={score}
        size={size}
        thickness={thickness}
        sx={{ color }}
      />
      {/* Score label */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={800}
          sx={{ color, lineHeight: 1, fontSize: "0.85rem" }}
        >
          {score}
        </Typography>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Single score card
// ─────────────────────────────────────────────

interface ScoreCardProps {
  icon: ReactNode;
  title: string;
  score: number;
  description: string;
  tooltip: string;
}

function ScoreCard({
  icon,
  title,
  score,
  description,
  tooltip,
}: ScoreCardProps) {
  const level = getLevel(score);
  const color = levelColor[level];
  const label = levelLabel[level];

  return (
    <Tooltip title={tooltip} arrow placement="top">
      <Box
        sx={{
          flex: "1 1 140px",
          minWidth: 130,
          minHeight: 200,
          p: 2,
          borderRadius: "12px",
          border: "1px solid",
          borderColor: alpha(color, 0.18),
          bgcolor: alpha(color, 0.03),
          transition:
            "border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease",
          cursor: "default",
          "&:hover": {
            borderColor: alpha(color, 0.35),
            bgcolor: alpha(color, 0.06),
            boxShadow: `0 4px 20px ${alpha(color, 0.12)}`,
          },
        }}
      >
        <Stack spacing={1.25} alignItems="center" textAlign="center">
          {/* Gauge */}
          <ScoreGauge score={score} />

          {/* Icon + title */}
          <Stack spacing={0.2} alignItems="center">
            <Box
              sx={{
                display: "inline-flex",
                color,
                "& svg": { fontSize: "0.95rem" },
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ lineHeight: 1.2 }}
            >
              {title}
            </Typography>
          </Stack>

          {/* Level badge */}
          <Box
            sx={{
              px: 1,
              py: 0.2,
              borderRadius: "99px",
              bgcolor: alpha(color, 0.1),
            }}
          >
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ color, letterSpacing: "0.04em", fontSize: "0.68rem" }}
            >
              {label}
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.45, fontSize: "0.7rem" }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>
    </Tooltip>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function ScoreCards() {
  const analysis = useBuilderStore((s) => s.analysisResult);

  const { accessibilityScore, mobileScore, clarityScore } = deriveScores(
    analysis.score,
    analysis.summary.requiredFields,
    analysis.summary.totalFields,
    analysis.summary.longLabels,
  );

  const cards: ScoreCardProps[] = [
    {
      icon: <AutoAwesomeRoundedIcon />,
      title: "UX Score",
      score: analysis.score,
      description: "Overall usability based on heuristic checks.",
      tooltip:
        "Composite score from label quality, required-field load, help text coverage and option completeness.",
    },
    {
      icon: <AccessibilityNewRoundedIcon />,
      title: "Accessibility",
      score: accessibilityScore,
      description: "Label clarity and screen-reader friendliness.",
      tooltip:
        "Penalises missing labels and overly long label text that reduces screen-reader comprehension.",
    },
    {
      icon: <PhoneAndroidRoundedIcon />,
      title: "Mobile",
      score: mobileScore,
      description: "Friction level on small-screen devices.",
      tooltip:
        "Penalises high required-field counts and long forms that create friction on mobile keyboards.",
    },
    {
      icon: <SpellcheckRoundedIcon />,
      title: "Clarity",
      score: clarityScore,
      description: "Label conciseness and form length.",
      tooltip:
        "Penalises long labels (>28 chars) and forms with more than 5 fields that increase cognitive load.",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1.25,
        // Collapse to 2 columns on narrow panels
        "@media (max-width: 480px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
      }}
    >
      {cards.map((card) => (
        <ScoreCard key={card.title} {...card} />
      ))}
    </Box>
  );
}

export default ScoreCards;
