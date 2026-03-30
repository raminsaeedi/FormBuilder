import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormField } from "../../types/form";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

export interface FieldRendererProps {
  /** The form field definition to render. */
  field: FormField;
  /**
   * When true, all inputs are rendered as read-only (preview mode).
   * When false, inputs are interactive (future live-form mode).
   * @default true
   */
  readOnly?: boolean;
  /**
   * Optional CSS grid column override.
   * Defaults to `"1 / -1"` for full-width fields and `"auto"` for half-width.
   */
  gridColumn?: string;
}

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

/** Renders a red asterisk for required fields. */
function RequiredMark() {
  return (
    <Box component="span" sx={{ color: "error.main", ml: 0.25 }}>
      *
    </Box>
  );
}

/**
 * Composes a field label with an optional required marker.
 * Returns a ReactNode suitable for MUI `label` props.
 */
function buildLabel(label: string, required: boolean) {
  if (!required) return label || "Untitled";
  return (
    <>
      {label || "Untitled"}
      <RequiredMark />
    </>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * `FieldRenderer` — renders a single `FormField` as a real MUI input.
 *
 * Supports all 10 field types: text, email, phone, password, number, date,
 * textarea, select, radio, checkbox.
 *
 * Use `readOnly={true}` for preview panels and `readOnly={false}` for
 * interactive form submissions (future feature).
 *
 * @example
 * // In a preview panel:
 * <FieldRenderer field={field} readOnly />
 *
 * @example
 * // In a live form (future):
 * <FieldRenderer field={field} readOnly={false} />
 */
function FieldRenderer({
  field,
  readOnly = true,
  gridColumn,
}: FieldRendererProps) {
  const col = gridColumn ?? (field.width === "full" ? "1 / -1" : "auto");
  const label = buildLabel(field.label, field.required);
  const helperText = field.helpText || undefined;

  // ── Textarea ──────────────────────────────
  if (field.type === "textarea") {
    return (
      <TextField
        label={label}
        placeholder={field.placeholder}
        helperText={helperText}
        multiline
        minRows={4}
        fullWidth
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Select ────────────────────────────────
  if (field.type === "select") {
    return (
      <FormControl fullWidth sx={{ gridColumn: col }}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={field.label || "Untitled"}
          defaultValue=""
          inputProps={{ readOnly }}
        >
          <MenuItem value="">
            <em>{field.placeholder || "Select an option"}</em>
          </MenuItem>
          {field.options?.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  // ── Radio group ───────────────────────────
  if (field.type === "radio") {
    return (
      <FormControl sx={{ gridColumn: col }}>
        <FormLabel
          sx={{
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "text.primary",
            "&.Mui-focused": { color: "text.primary" },
            mb: 0.5,
          }}
        >
          {label}
        </FormLabel>
        <RadioGroup>
          {field.options?.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.value}
              control={<Radio size="small" readOnly={readOnly} />}
              label={<Typography variant="body2">{option.label}</Typography>}
            />
          ))}
        </RadioGroup>
        {helperText && (
          <FormHelperText sx={{ mx: 0 }}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }

  // ── Checkbox ──────────────────────────────
  if (field.type === "checkbox") {
    return (
      <FormControl sx={{ gridColumn: col }}>
        <FormControlLabel
          control={<Checkbox size="small" readOnly={readOnly} />}
          label={
            <Typography variant="body2">
              {field.label || "Untitled"}
              {field.required && <RequiredMark />}
            </Typography>
          }
        />
        {helperText && (
          <FormHelperText sx={{ mx: 0, mt: -0.5, ml: 3.75 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  // ── Password ──────────────────────────────
  if (field.type === "password") {
    return (
      <TextField
        label={label}
        type="password"
        placeholder={field.placeholder}
        helperText={helperText}
        fullWidth
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Number ────────────────────────────────
  if (field.type === "number") {
    return (
      <TextField
        label={label}
        type="number"
        placeholder={field.placeholder}
        helperText={helperText}
        fullWidth
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Date ──────────────────────────────────
  if (field.type === "date") {
    return (
      <TextField
        label={label}
        type="date"
        helperText={helperText}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Text / Email / Phone (default) ────────
  const inputType =
    field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text";

  return (
    <TextField
      label={label}
      type={inputType}
      placeholder={field.placeholder}
      helperText={helperText}
      fullWidth
      InputProps={{ readOnly }}
      sx={{ gridColumn: col }}
    />
  );
}

export default FieldRenderer;
