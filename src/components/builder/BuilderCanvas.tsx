import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
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
import ViewStreamRoundedIcon from "@mui/icons-material/ViewStreamRounded";
import {
  alpha,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import PanelSection from "../shared/PanelSection";
import { useBuilderStore } from "../../store/builderStore";
import { FieldType, FormField } from "../../types/form";

// ─────────────────────────────────────────────
// Icon + accent colour per field type
// (mirrors FieldPalette for visual consistency)
// ─────────────────────────────────────────────

interface FieldMeta {
  icon: ReactNode;
  color: string;
  label: string;
}

const fieldMeta: Record<FieldType, FieldMeta> = {
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
  const inputBox = (content: ReactNode) => (
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
    return inputBox(
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
    return inputBox(
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
    return inputBox(
      <Typography variant="caption" color="text.disabled">
        DD.MM.YYYY
      </Typography>,
    );
  }

  if (field.type === "number") {
    return inputBox(
      <Typography variant="caption" color="text.disabled">
        {field.placeholder || "0"}
      </Typography>,
    );
  }

  // text, email, phone — generic input mock
  return inputBox(
    <Typography variant="caption" color="text.disabled">
      {field.placeholder || "Enter a value"}
    </Typography>,
  );
}

// ─────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────

function EmptyCanvas({ onAddFirst }: { onAddFirst: () => void }) {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
        border: "1.5px dashed",
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "grey.50",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: alpha("#2563eb", 0.08),
          color: "primary.main",
          mb: 2,
        }}
      >
        <ViewStreamRoundedIcon fontSize="medium" />
      </Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Canvas is empty
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 280, mx: "auto" }}
      >
        Pick a field type from the palette on the left to start building your
        form.
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={onAddFirst}
      >
        Add text field
      </Button>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Single field card
// ─────────────────────────────────────────────

interface FieldCardProps {
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

function FieldCard({
  field,
  index,
  total,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}: FieldCardProps) {
  const { icon, color, label } = fieldMeta[field.type];

  return (
    <Box
      role="button"
      tabIndex={0}
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
        transition: "all 160ms ease",
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
        {/* ── Header row ── */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          {/* Left: icon + label + chips */}
          <Stack direction="row" spacing={1.25} alignItems="flex-start">
            {/* Type icon badge */}
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
                mt: 0.25,
              }}
            >
              {icon}
            </Box>

            {/* Field info */}
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  color: isSelected ? color : "text.primary",
                  mb: 0.5,
                  lineHeight: 1.3,
                }}
              >
                {field.label || (
                  <Box
                    component="span"
                    sx={{ color: "error.main", fontStyle: "italic" }}
                  >
                    Missing label
                  </Box>
                )}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap">
                <Chip
                  label={label}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.68rem",
                    bgcolor: alpha(color, 0.1),
                    color,
                    fontWeight: 600,
                    border: "none",
                  }}
                />
                <Chip
                  label={field.width === "full" ? "Full width" : "Half width"}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: "0.68rem" }}
                />
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

          {/* Right: action buttons */}
          <Stack direction="row" spacing={0} sx={{ flexShrink: 0 }}>
            <Tooltip title="Move up" arrow>
              <span>
                <IconButton
                  size="small"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp();
                  }}
                  sx={{ opacity: index === 0 ? 0.3 : 1 }}
                >
                  <ArrowUpwardRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Move down" arrow>
              <span>
                <IconButton
                  size="small"
                  disabled={index === total - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown();
                  }}
                  sx={{ opacity: index === total - 1 ? 0.3 : 1 }}
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
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* ── Field preview mock ── */}
        <Box sx={{ pl: 0.5 }}>
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
          {field.helpText && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", mt: 0.5 }}
            >
              {field.helpText}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Main component — FormCanvas
// ─────────────────────────────────────────────

function FormCanvas() {
  const form = useBuilderStore((s) => s.form);
  const selectedFieldId = useBuilderStore((s) => s.selectedFieldId);
  const selectField = useBuilderStore((s) => s.selectField);
  const addField = useBuilderStore((s) => s.addField);
  const deleteField = useBuilderStore((s) => s.deleteField);
  const duplicateField = useBuilderStore((s) => s.duplicateField);
  const moveField = useBuilderStore((s) => s.moveField);

  const fieldCount = form.fields.length;

  return (
    <PanelSection
      eyebrow="Canvas"
      title="Form structure"
      description="Click a field to select it and edit its settings in the inspector."
      actions={
        <Chip
          label={`${fieldCount} field${fieldCount !== 1 ? "s" : ""}`}
          variant="outlined"
          size="small"
        />
      }
    >
      {fieldCount === 0 ? (
        <EmptyCanvas onAddFirst={() => addField("text")} />
      ) : (
        <Stack spacing={1.25}>
          {form.fields.map((field, index) => (
            <FieldCard
              key={field.id}
              field={field}
              index={index}
              total={fieldCount}
              isSelected={selectedFieldId === field.id}
              onSelect={() => selectField(field.id)}
              onMoveUp={() => moveField(field.id, "up")}
              onMoveDown={() => moveField(field.id, "down")}
              onDuplicate={() => duplicateField(field.id)}
              onDelete={() => deleteField(field.id)}
            />
          ))}
        </Stack>
      )}
    </PanelSection>
  );
}

export default FormCanvas;
