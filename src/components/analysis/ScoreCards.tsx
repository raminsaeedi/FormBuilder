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

type ScoreLevel = "good" | "medium" | "poor";

function getLevel(score: number): ScoreLevel {
  if (score >= 80) return "good";
  if (score >= 55) return "medium";
  return "poor";
}

const levelColor: Record<ScoreLevel, string> = {
  good: "#0f766e",
  medium: "#b45309",
  poor: "#b91c1c",
};

const levelLabel: Record<ScoreLevel, string> = {
  good: "Strong",
  medium: "Moderate",
  poor: "Needs work",
};

interface ScoreGaugeProps {
  score: number;
}

function ScoreGauge({ score }: ScoreGaugeProps) {
  const level = getLevel(score);
  const color = levelColor[level];
  const size = 64;
  const thickness = 4.5;

  return (
    <Box sx={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{ color: alpha(color, 0.12), position: "absolute" }}
      />
      <CircularProgress
        variant="determinate"
        value={score}
        size={size}
        thickness={thickness}
        sx={{ color }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={0.1} alignItems="center">
          <Typography
            variant="subtitle2"
            fontWeight={800}
            sx={{ color, lineHeight: 1, fontSize: "0.9rem" }}
          >
            {score}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", lineHeight: 1, fontSize: "0.62rem" }}
          >
            /100
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

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
          minWidth: 220,
          flex: "0 0 220px",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: alpha("#0f172a", 0.08),
          bgcolor: "background.paper",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
          px: 2,
          py: 1.75,
          transition:
            "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
          cursor: "default",
          "&:hover": {
            borderColor: alpha(color, 0.22),
            boxShadow: `0 12px 28px ${alpha(color, 0.1)}`,
            transform: "translateY(-1px)",
          },
        }}
      >
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1.5}
          >
            <Stack spacing={0.75} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color,
                  bgcolor: alpha(color, 0.08),
                  border: "1px solid",
                  borderColor: alpha(color, 0.14),
                  "& svg": { fontSize: "1rem" },
                }}
              >
                {icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ lineHeight: 1.25 }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.35, lineHeight: 1.5 }}
                >
                  {description}
                </Typography>
              </Box>
            </Stack>

            <ScoreGauge score={score} />
          </Stack>

          <Box
            sx={{
              display: "inline-flex",
              alignSelf: "flex-start",
              px: 1,
              py: 0.45,
              borderRadius: "999px",
              bgcolor: alpha(color, 0.08),
              border: "1px solid",
              borderColor: alpha(color, 0.14),
            }}
          >
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ color, letterSpacing: "0.03em" }}
            >
              {label}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Tooltip>
  );
}

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
      title: "UX score",
      score: analysis.score,
      description:
        "Overall usability based on the current heuristic evaluation.",
      tooltip:
        "Composite score from label quality, required-field load, help text coverage and option completeness.",
    },
    {
      icon: <AccessibilityNewRoundedIcon />,
      title: "Accessibility",
      score: accessibilityScore,
      description: "Label clarity and assistive-technology friendliness.",
      tooltip:
        "Penalises missing labels and overly long label text that reduces screen-reader comprehension.",
    },
    {
      icon: <PhoneAndroidRoundedIcon />,
      title: "Mobile",
      score: mobileScore,
      description: "Expected friction level on smaller screens and keyboards.",
      tooltip:
        "Penalises high required-field counts and long forms that create friction on mobile keyboards.",
    },
    {
      icon: <SpellcheckRoundedIcon />,
      title: "Clarity",
      score: clarityScore,
      description: "Conciseness of labels and overall cognitive load.",
      tooltip:
        "Penalises long labels (>28 chars) and forms with more than 5 fields that increase cognitive load.",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        overflowX: "auto",
        overflowY: "hidden",
        pb: 0.5,
        pr: 0.25,
        scrollSnapType: "x proximity",
        "& > *": {
          scrollSnapAlign: "start",
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
