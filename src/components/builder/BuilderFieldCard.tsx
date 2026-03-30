import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
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
import { fieldTypeMeta } from "../shared/fieldMeta";
import { FormField } from "../../types/form";

// ─────────────────────────────────────────────
// FieldPreview — schematic input mock per type
// ─────────────────────────────────────────────

function FieldPreview({ field }: { field: FormField }) {
  const inputShell = (content: ReactNode) => (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        px: 1.25,
        py: 0.75,
        bgcolor: "background.paper",
        minHeight: 34,
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
          borderRadius: "8px",
          minHeight: 64,
          bgcolor: "background.paper",
          px: 1.25,
          py: 0.75,
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
      <Stack spacing={0.6}>
        {field.options.map((option) => (
          <Stack
            key={option.id}
            direction="row"
            spacing={0.75}
            alignItems="center"
          >
            <Box
              sx={{
                width: 13,
                height: 13,
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
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Box
          sx={{
            width: 14,
            height: 14,
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: "3px",
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

  // text, email, phone, number
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
  field: FormField;
  index: number;
  total: number;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

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
        position: "relative",
        p: 1.75,
        pl: isSelected ? 2.25 : 1.75,
        borderRadius: "12px",
        border: "1.5px solid",
        borderColor: isSelected ? alpha(color, 0.45) : "divider",
        bgcolor: isSelected ? alpha(color, 0.04) : "background.paper",
        cursor: "pointer",
        outline: "none",
        transition:
          "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease, padding-left 160ms ease",
        boxShadow: isSelected
          ? `0 0 0 3px ${alpha(color, 0.12)}, 0 2px 12px ${alpha(color, 0.1)}`
          : "0 1px 4px rgba(15,23,42,0.04)",
        // Left accent bar (selected state)
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: 3,
          borderRadius: "0 3px 3px 0",
          bgcolor: color,
          opacity: isSelected ? 1 : 0,
          transition: "opacity 160ms ease",
        },
        "&:hover": {
          borderColor: isSelected ? alpha(color, 0.5) : alpha(color, 0.3),
          bgcolor: isSelected ? alpha(color, 0.05) : alpha(color, 0.025),
          boxShadow: isSelected
            ? `0 0 0 3px ${alpha(color, 0.14)}, 0 4px 16px ${alpha(color, 0.12)}`
            : `0 2px 12px rgba(15,23,42,0.07)`,
          // Reveal action buttons on hover
          "& .field-actions": { opacity: 1 },
        },
        "&:focus-visible": {
          boxShadow: `0 0 0 3px ${alpha(color, 0.3)}`,
        },
      }}
    >
      <Stack spacing={1.25}>
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
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: alpha(color, 0.1),
                color,
                mt: 0.15,
              }}
            >
              {icon}
            </Box>

            {/* Field label + metadata chips */}
            <Box sx={{ minWidth: 0 }}>
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
                <Chip
                  label={typeLabel}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    bgcolor: alpha(color, 0.1),
                    color,
                    border: "none",
                  }}
                />
                <Chip
                  label={field.width === "full" ? "Full" : "Half"}
                  size="small"
                  variant="outlined"
                  sx={{ height: 18, fontSize: "0.65rem" }}
                />
                {field.required && (
                  <Chip
                    label="Required"
                    size="small"
                    color="primary"
                    sx={{ height: 18, fontSize: "0.65rem" }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>

          {/* Right: action icon buttons — visible on hover or when selected */}
          <Stack
            className="field-actions"
            direction="row"
            spacing={0}
            sx={{
              flexShrink: 0,
              opacity: isSelected ? 1 : 0,
              transition: "opacity 160ms ease",
            }}
          >
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
        <Box sx={{ pl: 0.25 }}>
          {field.label && field.type !== "checkbox" && (
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
              sx={{ display: "block", mb: 0.4 }}
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

          {field.helpText && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", mt: 0.4, lineHeight: 1.4 }}
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
