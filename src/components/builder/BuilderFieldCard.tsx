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
import { memo, ReactNode } from "react";
import { FormField } from "../../types/form";
import { fieldTypeMeta } from "../shared/fieldMeta";
import { DND_ITEM_TYPE } from "./dnd";

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

const BuilderFieldCard = memo(function BuilderFieldCard({
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
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: field.id,
    data: {
      type: DND_ITEM_TYPE.canvasField,
      fieldId: field.id,
    },
  });

  const showControls = isSelected || isDragging || isOver;

  return (
    <Box
      ref={setNodeRef}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${field.label || "Unnamed field"} — ${typeLabel} field`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      sx={{
        position: "relative",
        overflow: "visible",
        p: 1.9,
        borderRadius: 3.25,
        border: "1px solid",
        borderColor: isDragging
          ? alpha(color, 0.5)
          : isOver
            ? alpha(color, 0.42)
            : isSelected
              ? alpha(color, 0.34)
              : alpha("#0f172a", 0.08),
        bgcolor: isDragging
          ? alpha(color, 0.08)
          : isOver
            ? alpha(color, 0.06)
            : isSelected
              ? alpha(color, 0.05)
              : alpha("#ffffff", 0.96),
        backgroundImage: isDragging
          ? `linear-gradient(135deg, ${alpha(color, 0.12)} 0%, ${alpha(
              color,
              0.04,
            )} 100%)`
          : isOver
            ? `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(
                color,
                0.03,
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
          : isOver
            ? `0 0 0 1px ${alpha(color, 0.12)}, 0 14px 30px ${alpha(color, 0.14)}`
            : isSelected
              ? `0 0 0 1px ${alpha(color, 0.12)}, 0 10px 28px ${alpha(color, 0.12)}`
              : "0 8px 22px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(10px)",
        zIndex: isDragging ? 3 : isOver ? 2 : 1,
        touchAction: "manipulation",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          background:
            isDragging || isSelected || isOver
              ? `linear-gradient(90deg, ${alpha(color, 0.18)} 0px, ${alpha(
                  color,
                  0.08,
                )} 4px, transparent 4px)`
              : "transparent",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 18,
          right: 18,
          top: -10,
          height: 6,
          borderRadius: 999,
          pointerEvents: "none",
          bgcolor: isOver && !isDragging ? alpha(color, 0.9) : "transparent",
          boxShadow:
            isOver && !isDragging ? `0 0 0 6px ${alpha(color, 0.12)}` : "none",
          transition: "background-color 180ms ease, box-shadow 180ms ease",
        },
        "&:hover": {
          borderColor: isDragging
            ? alpha(color, 0.5)
            : isOver
              ? alpha(color, 0.42)
              : isSelected
                ? alpha(color, 0.4)
                : alpha(color, 0.22),
          bgcolor: isDragging
            ? alpha(color, 0.08)
            : isOver
              ? alpha(color, 0.06)
              : isSelected
                ? alpha(color, 0.06)
                : alpha(color, 0.03),
          boxShadow: isDragging
            ? `0 20px 44px ${alpha(color, 0.22)}`
            : isOver
              ? `0 0 0 1px ${alpha(color, 0.12)}, 0 14px 30px ${alpha(color, 0.14)}`
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
      <Stack spacing={1.55}>
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
                width: 40,
                height: 40,
                borderRadius: 2.75,
                bgcolor: alpha(
                  color,
                  isDragging ? 0.18 : isOver ? 0.16 : isSelected ? 0.14 : 0.1,
                ),
                color,
                boxShadow: isDragging
                  ? `0 8px 18px ${alpha(color, 0.18)}`
                  : "inset 0 0 0 1px rgba(255,255,255,0.35)",
                mt: 0.1,
                transition: "background-color 180ms ease, transform 180ms ease",
                transform: isOver && !isDragging ? "translateY(-1px)" : "none",
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
                        : isOver
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

                  {isOver && !isDragging && (
                    <Chip
                      label="Drop position"
                      size="small"
                      color="primary"
                      sx={{ height: 20, fontSize: "0.68rem", fontWeight: 800 }}
                    />
                  )}
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

              <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
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
                ref={setActivatorNodeRef}
                className="drag-handle"
                onClick={(event) => event.stopPropagation()}
                {...attributes}
                {...listeners}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 2.25,
                  border: "1px solid",
                  borderColor: isDragging
                    ? alpha(color, 0.28)
                    : isOver
                      ? alpha(color, 0.22)
                      : alpha("#0f172a", 0.08),
                  bgcolor: isDragging
                    ? alpha(color, 0.12)
                    : isOver
                      ? alpha(color, 0.08)
                      : alpha("#ffffff", 0.72),
                  color: isDragging || isOver ? color : "text.secondary",
                  cursor: isDragging ? "grabbing" : "grab",
                  opacity: showControls ? 1 : 0,
                  transform: showControls ? "translateX(0)" : "translateX(4px)",
                  transition:
                    "opacity 160ms ease, transform 160ms ease, background-color 160ms ease, color 160ms ease, border-color 160ms ease",
                  boxShadow: isDragging
                    ? `0 8px 18px ${alpha(color, 0.16)}`
                    : "none",
                  touchAction: "none",
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
                    onClick={(event) => {
                      event.stopPropagation();
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
                    onClick={(event) => {
                      event.stopPropagation();
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
                  onClick={(event) => {
                    event.stopPropagation();
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
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete();
                  }}
                  aria-label="Delete field"
                  sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: alpha("#ef4444", 0.16),
                    bgcolor: alpha("#ef4444", showControls ? 0.06 : 0.03),
                    boxShadow: showControls
                      ? `0 4px 12px ${alpha("#ef4444", 0.12)}`
                      : "none",
                    "&:hover": {
                      bgcolor: alpha("#ef4444", 0.12),
                      borderColor: alpha("#ef4444", 0.24),
                    },
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
            p: 1.25,
            borderRadius: 2.75,
            border: "1px solid",
            borderColor: isOver ? alpha(color, 0.14) : alpha("#0f172a", 0.06),
            bgcolor: isOver ? alpha(color, 0.04) : alpha("#ffffff", 0.62),
            transition: "background-color 180ms ease, border-color 180ms ease",
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

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{ mt: 1.2 }}
          >
            <Typography
              variant="caption"
              color={isOver ? "primary.main" : "text.disabled"}
            >
              {isOver
                ? "Release now to place the dragged field here."
                : "Use the drag handle to reorder, or open the inspector to refine this field."}
            </Typography>

            <Tooltip title="Remove this field" arrow>
              <IconButton
                size="small"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
                aria-label="Remove this field"
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha("#ef4444", 0.16),
                  bgcolor: alpha("#ef4444", 0.05),
                  "&:hover": {
                    bgcolor: alpha("#ef4444", 0.1),
                    borderColor: alpha("#ef4444", 0.24),
                  },
                }}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
});

export default BuilderFieldCard;
