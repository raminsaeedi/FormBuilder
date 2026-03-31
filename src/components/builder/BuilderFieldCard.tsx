import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
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
import { FormField } from "../../types/form";
import { fieldTypeMeta } from "../shared/fieldMeta";
import { DND_ITEM_TYPE } from "./dnd";

// ─────────────────────────────────────────────
// FieldPreview — schematic input mock per type
// ─────────────────────────────────────────────

function FieldPreview({ field }: { field: FormField }) {
  const inputShell = (content: ReactNode) => (
    <Box
      sx={{
        border: "1px solid",
        borderColor: alpha("#0f172a", 0.08),
        borderRadius: 2,
        px: 1.25,
        py: 0.85,
        bgcolor: alpha("#ffffff", 0.82),
        minHeight: 36,
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(6px)",
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
          borderColor: alpha("#0f172a", 0.08),
          borderRadius: 2,
          minHeight: 72,
          bgcolor: alpha("#ffffff", 0.82),
          px: 1.25,
          py: 0.85,
          backdropFilter: "blur(6px)",
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
      <Stack spacing={0.7}>
        {field.options.map((option) => (
          <Stack
            key={option.id}
            direction="row"
            spacing={0.8}
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
                bgcolor: "background.paper",
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
      <Stack direction="row" spacing={0.8} alignItems="center">
        <Box
          sx={{
            width: 14,
            height: 14,
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: "4px",
            flexShrink: 0,
            bgcolor: "background.paper",
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
        alignItems="center"
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    data: {
      type: DND_ITEM_TYPE.canvasField,
      fieldId: field.id,
    },
  });

  const showControls = isSelected || isDragging;

  return (
    <Box
      ref={setNodeRef}
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
        overflow: "hidden",
        p: 1.75,
        borderRadius: 3,
        border: "1px solid",
        borderColor: isDragging
          ? alpha(color, 0.5)
          : isSelected
            ? alpha(color, 0.34)
            : alpha("#0f172a", 0.08),
        bgcolor: isDragging
          ? alpha(color, 0.08)
          : isSelected
            ? alpha(color, 0.05)
            : alpha("#ffffff", 0.92),
        backgroundImage: isDragging
          ? `linear-gradient(135deg, ${alpha(color, 0.12)} 0%, ${alpha(
              color,
              0.04,
            )} 100%)`
          : isSelected
            ? `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(
                color,
                0.02,
              )} 100%)`
            : "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)",
        cursor: isDragging ? "grabbing" : "pointer",
        outline: "none",
        opacity: isDragging ? 0.98 : 1,
        transform: CSS.Transform.toString(transform),
        transition:
          transition ||
          "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
        boxShadow: isDragging
          ? `0 20px 44px ${alpha(color, 0.22)}`
          : isSelected
            ? `0 0 0 1px ${alpha(color, 0.12)}, 0 10px 28px ${alpha(color, 0.12)}`
            : "0 6px 18px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(10px)",
        zIndex: isDragging ? 3 : 1,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            isDragging || isSelected
              ? `linear-gradient(90deg, ${alpha(color, 0.18)} 0px, ${alpha(
                  color,
                  0.08,
                )} 4px, transparent 4px)`
              : "transparent",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 1,
          borderRadius: "inherit",
          pointerEvents: "none",
          boxShadow: isDragging
            ? `inset 0 0 0 1px ${alpha(color, 0.18)}`
            : "none",
        },
        "&:hover": {
          borderColor: isDragging
            ? alpha(color, 0.5)
            : isSelected
              ? alpha(color, 0.4)
              : alpha(color, 0.22),
          bgcolor: isDragging
            ? alpha(color, 0.08)
            : isSelected
              ? alpha(color, 0.06)
              : alpha(color, 0.03),
          boxShadow: isDragging
            ? `0 20px 44px ${alpha(color, 0.22)}`
            : isSelected
              ? `0 0 0 1px ${alpha(color, 0.14)}, 0 12px 30px ${alpha(color, 0.14)}`
              : `0 10px 24px ${alpha("#0f172a", 0.08)}`,
          transform: isDragging
            ? CSS.Transform.toString(transform)
            : "translateY(-1px)",
          "& .field-actions": { opacity: 1, transform: "translateX(0)" },
          "& .drag-handle": { opacity: 1, transform: "translateX(0)" },
        },
        "&:focus-visible": {
          boxShadow: `0 0 0 3px ${alpha(color, 0.22)}, 0 10px 24px ${alpha(
            color,
            0.12,
          )}`,
        },
      }}
    >
      <Stack spacing={1.4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1.25}
        >
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="flex-start"
            sx={{ minWidth: 0, flex: 1 }}
          >
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 2.5,
                bgcolor: alpha(
                  color,
                  isDragging ? 0.18 : isSelected ? 0.14 : 0.1,
                ),
                color,
                boxShadow: isDragging
                  ? `0 8px 18px ${alpha(color, 0.18)}`
                  : "inset 0 0 0 1px rgba(255,255,255,0.35)",
                mt: 0.1,
              }}
            >
              {icon}
            </Box>

            <Stack spacing={0.8} sx={{ minWidth: 0, flex: 1 }}>
              <Stack spacing={0.45} sx={{ minWidth: 0 }}>
                <Stack
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  flexWrap="wrap"
                  useFlexGap
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    sx={{
                      color: isDragging
                        ? color
                        : isSelected
                          ? color
                          : "text.primary",
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

                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 20,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      borderColor: alpha(color, 0.18),
                      bgcolor: alpha(color, 0.04),
                    }}
                  />
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: 1.45, display: "block" }}
                >
                  {field.helpText ||
                    `Configure this ${typeLabel.toLowerCase()} field in the inspector.`}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.55} flexWrap="wrap" useFlexGap>
                <Chip
                  label={typeLabel}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    bgcolor: alpha(color, 0.12),
                    color,
                    border: "none",
                  }}
                />
                <Chip
                  label={field.width === "full" ? "Full width" : "Half width"}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: "0.68rem",
                    borderColor: alpha("#0f172a", 0.1),
                    bgcolor: alpha("#ffffff", 0.55),
                  }}
                />
                {field.required && (
                  <Chip
                    label="Required"
                    size="small"
                    color="primary"
                    sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700 }}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={0.35}
            alignItems="center"
            sx={{ flexShrink: 0, pl: 0.5 }}
          >
            <Tooltip title="Drag to reorder" arrow>
              <Box
                className="drag-handle"
                onClick={(e) => e.stopPropagation()}
                {...attributes}
                {...listeners}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: isDragging
                    ? alpha(color, 0.28)
                    : alpha("#0f172a", 0.08),
                  bgcolor: isDragging
                    ? alpha(color, 0.12)
                    : alpha("#ffffff", 0.72),
                  color: isDragging ? color : "text.secondary",
                  cursor: isDragging ? "grabbing" : "grab",
                  opacity: showControls ? 1 : 0,
                  transform: showControls ? "translateX(0)" : "translateX(4px)",
                  transition:
                    "opacity 160ms ease, transform 160ms ease, background-color 160ms ease, color 160ms ease, border-color 160ms ease",
                  boxShadow: isDragging
                    ? `0 8px 18px ${alpha(color, 0.16)}`
                    : "none",
                  "&:hover": {
                    bgcolor: alpha(color, 0.08),
                    borderColor: alpha(color, 0.22),
                    color,
                  },
                }}
              >
                <DragIndicatorRoundedIcon fontSize="small" />
              </Box>
            </Tooltip>

            <Stack
              className="field-actions"
              direction="row"
              spacing={0.15}
              sx={{
                flexShrink: 0,
                opacity: showControls ? 1 : 0,
                transform: showControls ? "translateX(0)" : "translateX(4px)",
                transition: "opacity 160ms ease, transform 160ms ease",
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
                    sx={{
                      opacity: isFirst ? 0.3 : 1,
                      borderRadius: 2,
                      color: "text.secondary",
                      "&:hover": { bgcolor: alpha(color, 0.08), color },
                    }}
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
                    sx={{
                      opacity: isLast ? 0.3 : 1,
                      borderRadius: 2,
                      color: "text.secondary",
                      "&:hover": { bgcolor: alpha(color, 0.08), color },
                    }}
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
                  sx={{
                    borderRadius: 2,
                    color: "text.secondary",
                    "&:hover": { bgcolor: alpha(color, 0.08), color },
                  }}
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
                  sx={{
                    borderRadius: 2,
                    "&:hover": { bgcolor: alpha("#ef4444", 0.08) },
                  }}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            ml: { xs: 0, sm: 6.25 },
            p: 1.15,
            borderRadius: 2.5,
            border: "1px solid",
            borderColor: alpha("#0f172a", 0.06),
            bgcolor: alpha("#ffffff", 0.62),
          }}
        >
          {field.label && field.type !== "checkbox" && (
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              sx={{ display: "block", mb: 0.55, lineHeight: 1.3 }}
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
        </Box>
      </Stack>
    </Box>
  );
}

export default BuilderFieldCard;
