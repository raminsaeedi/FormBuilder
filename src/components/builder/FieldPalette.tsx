import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import { alpha, Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import PanelSection from "../shared/PanelSection";
import { fieldCatalog } from "../../data/fieldCatalog";
import { useBuilderStore } from "../../store/builderStore";
import { FieldCategory, FieldType } from "../../types/form";

// ─────────────────────────────────────────────
// Icon + accent colour per field type
// ─────────────────────────────────────────────

interface FieldMeta {
  icon: ReactNode;
  color: string;
}

const fieldMeta: Record<FieldType, FieldMeta> = {
  text: {
    icon: <ShortTextRoundedIcon fontSize="small" />,
    color: "#2563eb", // blue
  },
  email: {
    icon: <MailOutlineRoundedIcon fontSize="small" />,
    color: "#0891b2", // cyan
  },
  phone: {
    icon: <PhoneRoundedIcon fontSize="small" />,
    color: "#0f766e", // teal
  },
  password: {
    icon: <LockOutlinedIcon fontSize="small" />,
    color: "#7c3aed", // violet
  },
  number: {
    icon: <NumbersRoundedIcon fontSize="small" />,
    color: "#b45309", // amber
  },
  date: {
    icon: <CalendarTodayRoundedIcon fontSize="small" />,
    color: "#be185d", // pink
  },
  textarea: {
    icon: <NotesRoundedIcon fontSize="small" />,
    color: "#475569", // slate
  },
  select: {
    icon: <SubjectRoundedIcon fontSize="small" />,
    color: "#16a34a", // green
  },
  radio: {
    icon: <RadioButtonCheckedRoundedIcon fontSize="small" />,
    color: "#ea580c", // orange
  },
  checkbox: {
    icon: <CheckBoxOutlinedIcon fontSize="small" />,
    color: "#dc2626", // red
  },
};

// ─────────────────────────────────────────────
// Single palette card
// ─────────────────────────────────────────────

interface PaletteCardProps {
  type: FieldType;
  title: string;
  description: string;
  onAdd: (type: FieldType) => void;
}

function PaletteCard({ type, title, description, onAdd }: PaletteCardProps) {
  const { icon, color } = fieldMeta[type];

  return (
    <Tooltip title={`Click to add a ${title} field`} placement="right" arrow>
      <Box
        role="button"
        tabIndex={0}
        onClick={() => onAdd(type)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onAdd(type);
          }
        }}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          p: 1.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
          cursor: "pointer",
          transition: "all 150ms ease",
          outline: "none",
          "&:hover": {
            borderColor: color,
            bgcolor: alpha(color, 0.06),
            boxShadow: `0 0 0 3px ${alpha(color, 0.12)}`,
            transform: "translateY(-1px)",
          },
          "&:focus-visible": {
            borderColor: color,
            boxShadow: `0 0 0 3px ${alpha(color, 0.25)}`,
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        {/* Icon badge */}
        <Box
          sx={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: 2,
            bgcolor: alpha(color, 0.1),
            color,
          }}
        >
          {icon}
        </Box>

        {/* Text */}
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{ lineHeight: 1.3, color: "text.primary" }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.4 }}
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

const GROUPS: FieldCategory[] = ["Basic", "Choice"];

function FieldPalette() {
  const addField = useBuilderStore((s) => s.addField);

  return (
    <PanelSection
      eyebrow="Palette"
      title="Field types"
      description="Click any field to add it to the canvas."
      actions={
        <Chip
          icon={<LayersRoundedIcon />}
          label={`${fieldCatalog.length} types`}
          variant="outlined"
          size="small"
        />
      }
    >
      <Stack spacing={2.5}>
        {GROUPS.map((group) => {
          const items = fieldCatalog.filter((item) => item.category === group);
          return (
            <Stack key={group} spacing={1}>
              {/* Group label */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ letterSpacing: "0.1em", lineHeight: 1 }}
                >
                  {group}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    bgcolor: "divider",
                  }}
                />
                <Typography variant="caption" color="text.disabled">
                  {items.length}
                </Typography>
              </Stack>

              {/* Cards */}
              <Stack spacing={0.75}>
                {items.map((item) => (
                  <PaletteCard
                    key={item.type}
                    type={item.type}
                    title={item.title}
                    description={item.description}
                    onAdd={addField}
                  />
                ))}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </PanelSection>
  );
}

export default FieldPalette;
