import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import {
  alpha,
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { FieldType, FormField } from "../../types/form";

// ─────────────────────────────────────────────
// Field type metadata — icon + accent colour + display label
// ─────────────────────────────────────────────

interface FieldTypeMeta {
  icon: ReactNode;
  color: string;
  label: string;
}

export const fieldTypeMeta: Record<FieldType, FieldTypeMeta> = {
  text: {
    icon: <ShortTextRoundedIcon fontSize="small" />,
    color: "#2563eb",
    label: "Text",
  },
  email: {
    icon: <MailOutlineRoundedIcon fontSize="small" />,
    color: "#0891b2",
    label: "Email",
  },
  phone: {
    icon: <PhoneRoundedIcon fontSize="small" />,
    color: "#0f766e",
    label: "Phone",
  },
  password: {
    icon: <LockOutlinedIcon fontSize="small" />,
    color: "#7c3aed",
    label: "Password",
  },
  number: {
    icon: <NumbersRoundedIcon fontSize="small" />,
    color: "#b45309",
    label: "Number",
  },
  date: {
    icon: <CalendarTodayRoundedIcon fontSize="small" />,
    color: "#be185d",
    label: "Date",
  },
  textarea: {
    icon: <NotesRoundedIcon fontSize="small" />,
    color: "#475569",
    label: "Textarea",
  },
  select: {
    icon: <SubjectRoundedIcon fontSize="small" />,
    color: "#16a34a",
    label: "Select",
  },
  radio: {
    icon: <RadioButtonCheckedRoundedIcon fontSize="small" />,
    color: "#ea580c",
    label: "Radio",
  },
  checkbox: {
    icon: <CheckBoxOutlinedIcon fontSize="small" />,
    color: "#dc2626",
    label: "Checkbox",
  },
};

// ─────────────────────────────────────────────
// FieldPreview — schematic input mock per type
// ─────────────────────────────────────────────

function FieldPreview({ field }: { field: FormField }) {
  const inputShell = (content: ReactNode) => (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        px: 1.5,
        py: 1,
        bgcolor: "background.paper",
        minHeight: 36,
        display: "flex",
        alignItems: "center",
      }}
    >
      {content}
    </Box>
  );

  if (field.type === "textarea") {
    return (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          minHeight: 72,
          bgcolor: "background.paper",
          px: 1.5,
          py: 1,
        }}
      >
        <Typography variant="caption" color="text.disabled">
          {field.placeholder || "Long-form text…"}
        </Typography>
      </Box>
    );
  }

  if (field.type === "radio" && field.options) {
    return (
      <Stack spacing={0.75}>
        {field.options.map((option) => (
          <Stack
            key={option.id}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                border: "1.5px solid",
                borderColor: "divider",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {option.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    );
  }

  if (field.type === "checkbox") {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 16,
            height: 16,
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: 0.75,
            flexShrink: 0,
          }}
        />
        <Typography variant="caption" color="text.secondary">
          {field.label || "Checkbox label"}
        </Typography>
      </Stack>
    );
  }

  if (field.type === "select" && field.options) {
    return inputShell(
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography variant="caption" color="text.disabled">
          {field.placeholder || "Select an option"}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          ▾
        </Typography>
      </Stack>,
    );
  }

  if (field.type === "password") {
    return inputShell(
      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ letterSpacing: 3 }}
      >
        ••••••••
      </Typography>,
    );
  }

  if (field.type === "date") {
    return inputShell(
      <Typography variant="caption" color="text.disabled">
        DD.MM.YYYY
      </Typography>,
    );
  }

  // text, email, phone, number — generic input mock
  return inputShell(
    <Typography variant="caption" color="text.disabled">
      {field.placeholder || "Enter a value"}
    </Typography>,
  );
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

export interface BuilderFieldCardProps {
  /** The form field to display. */
  field: FormField;
  /** Zero-based position in the field list — used to disable move buttons. */
  index: number;
  /** Total number of fields — used to disable the "move down" button. */
  total: number;
  /** Whether this card is currently selected in the canvas. */
  isSelected: boolean;
  /** Called when the user clicks or keyboard-activates the card. */
  onSelect: () => void;
  /** Move the field one position up. */
  onMoveUp: () => void;
  /** Move the field one position down. */
  onMoveDown: () => void;
  /** Insert a copy of the field directly after this one. */
  onDuplicate: () => void;
  /** Remove the field from the form. */
  onDelete: () => void;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * `BuilderFieldCard` — a single field row in the form canvas.
 *
 * Displays the field's label, type badge, required marker, help text and a
 * schematic input preview. Highlights with the field-type accent colour when
 * selected. Fully keyboard-accessible.
 */
function BuilderFieldCard({
  field,
  index,
  total,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}: BuilderFieldCardProps) {
  const { icon, color, label: typeLabel } = fieldTypeMeta[field.type];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${field.label || "Unnamed field"} — ${typeLabel} field`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1.5px solid",
        borderColor: isSelected ? color : "divider",
        bgcolor: isSelected ? alpha(color, 0.05) : "grey.50",
        cursor: "pointer",
        outline: "none",
        transition:
          "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
        boxShadow: isSelected ? `0 0 0 3px ${alpha(color, 0.15)}` : "none",
        "&:hover": {
          borderColor: isSelected ? color : alpha(color, 0.5),
          bgcolor: isSelected ? alpha(color, 0.05) : alpha(color, 0.03),
        },
        "&:focus-visible": {
          boxShadow: `0 0 0 3px ${alpha(color, 0.3)}`,
        },
      }}
    >
      <Stack spacing={1.5}>
        {/* ── Header: icon + meta + actions ── */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          {/* Left: type icon + label + chips */}
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="flex-start"
            sx={{ minWidth: 0 }}
          >
            {/* Type icon badge */}
            <Box
              aria-hidden
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
                mt: 0.25,
              }}
            >
              {icon}
            </Box>

            {/* Field label + metadata chips */}
            <Box sx={{ minWidth: 0 }}>
              {/* Label */}
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  color: isSelected ? color : "text.primary",
                  mb: 0.5,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                }}
              >
                {field.label ? (
                  field.label
                ) : (
                  <Box
                    component="span"
                    sx={{ color: "error.main", fontStyle: "italic" }}
                  >
                    Missing label
                  </Box>
                )}
              </Typography>

              {/* Chips row */}
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {/* Field type */}
                <Chip
                  label={typeLabel}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    bgcolor: alpha(color, 0.1),
                    color,
                    border: "none",
                  }}
                />
                {/* Width */}
                <Chip
                  label={field.width === "full" ? "Full width" : "Half width"}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: "0.68rem" }}
                />
                {/* Required */}
                {field.required && (
                  <Chip
                    label="Required"
                    size="small"
                    color="primary"
                    sx={{ height: 20, fontSize: "0.68rem" }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>

          {/* Right: action icon buttons */}
          <Stack direction="row" spacing={0} sx={{ flexShrink: 0 }}>
            <Tooltip title="Move up" arrow>
              <span>
                <IconButton
                  size="small"
                  disabled={isFirst}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp();
                  }}
                  sx={{ opacity: isFirst ? 0.3 : 1 }}
                  aria-label="Move field up"
                >
                  <ArrowUpwardRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Move down" arrow>
              <span>
                <IconButton
                  size="small"
                  disabled={isLast}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown();
                  }}
                  sx={{ opacity: isLast ? 0.3 : 1 }}
                  aria-label="Move field down"
                >
                  <ArrowDownwardRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Duplicate field" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate();
                }}
                aria-label="Duplicate field"
              >
                <ContentCopyRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete field" arrow>
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                aria-label="Delete field"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* ── Input preview ── */}
        <Box sx={{ pl: 0.5 }}>
          {/* Inline label above preview (mirrors real form rendering) */}
          {field.label && field.type !== "checkbox" && (
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
              sx={{ display: "block", mb: 0.5 }}
            >
              {field.label}
              {field.required && (
                <Box component="span" sx={{ color: "error.main", ml: 0.25 }}>
                  *
                </Box>
              )}
            </Typography>
          )}

          <FieldPreview field={field} />

          {/* Help text */}
          {field.helpText && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", mt: 0.5, lineHeight: 1.4 }}
            >
              {field.helpText}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default BuilderFieldCard;
