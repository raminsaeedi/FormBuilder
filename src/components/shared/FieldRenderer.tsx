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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { FormField, PreviewFieldValue } from "../../types/form";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

export interface FieldRendererProps {
  /** The form field definition to render. */
  field: FormField;
  /**
   * When true, all inputs are rendered as read-only (preview mode).
   * When false, inputs are interactive.
   * @default true
   */
  readOnly?: boolean;
  /**
   * Optional CSS grid column override.
   * Defaults to `"1 / -1"` for full-width fields and `"auto"` for half-width.
   */
  gridColumn?: string;
  /** Controlled field value used by the preview form. */
  value?: PreviewFieldValue;
  /** Controlled change handler used by the preview form. */
  onChange?: (value: PreviewFieldValue) => void;
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

function getStringValue(value: PreviewFieldValue | undefined) {
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : "";
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

function FieldRenderer({
  field,
  readOnly = true,
  gridColumn,
  value,
  onChange,
}: FieldRendererProps) {
  const col = gridColumn ?? (field.width === "full" ? "1 / -1" : "auto");
  const label = buildLabel(field.label, field.required);
  const helperText = field.helpText || undefined;

  const handleTextLikeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (field.type === "number") {
      const nextValue = event.target.value;
      onChange?.(nextValue === "" ? "" : Number(nextValue));
      return;
    }

    onChange?.(event.target.value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  const handleRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    nextValue: string,
  ) => {
    onChange?.(nextValue || event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onChange?.(event.target.value);
  };

  // ── Textarea ───────────────────────────────
  if (field.type === "textarea") {
    return (
      <TextField
        label={label}
        placeholder={field.placeholder}
        helperText={helperText}
        multiline
        minRows={4}
        fullWidth
        value={getStringValue(value)}
        onChange={handleTextLikeChange}
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Select ─────────────────────────────────
  if (field.type === "select") {
    return (
      <FormControl fullWidth sx={{ gridColumn: col }}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={field.label || "Untitled"}
          value={getStringValue(value)}
          onChange={handleSelectChange}
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

  // ── Radio group ────────────────────────────
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
        <RadioGroup
          name={field.id}
          value={getStringValue(value)}
          onChange={handleRadioChange}
        >
          {field.options?.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.value}
              disabled={readOnly}
              control={<Radio size="small" />}
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

  // ── Checkbox ───────────────────────────────
  if (field.type === "checkbox") {
    return (
      <FormControl sx={{ gridColumn: col }}>
        <FormControlLabel
          disabled={readOnly}
          control={
            <Checkbox
              size="small"
              checked={Boolean(value)}
              onChange={handleCheckboxChange}
            />
          }
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

  // ── Password ───────────────────────────────
  if (field.type === "password") {
    return (
      <TextField
        label={label}
        type="password"
        placeholder={field.placeholder}
        helperText={helperText}
        fullWidth
        value={getStringValue(value)}
        onChange={handleTextLikeChange}
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Number ─────────────────────────────────
  if (field.type === "number") {
    return (
      <TextField
        label={label}
        type="number"
        placeholder={field.placeholder}
        helperText={helperText}
        fullWidth
        value={getStringValue(value)}
        onChange={handleTextLikeChange}
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Date ───────────────────────────────────
  if (field.type === "date") {
    return (
      <TextField
        label={label}
        type="date"
        helperText={helperText}
        fullWidth
        value={getStringValue(value)}
        onChange={handleTextLikeChange}
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly }}
        sx={{ gridColumn: col }}
      />
    );
  }

  // ── Text / Email / Phone (default) ─────────
  const inputType =
    field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text";

  return (
    <TextField
      label={label}
      type={inputType}
      placeholder={field.placeholder}
      helperText={helperText}
      fullWidth
      value={getStringValue(value)}
      onChange={handleTextLikeChange}
      InputProps={{ readOnly }}
      sx={{ gridColumn: col }}
    />
  );
}

export default FieldRenderer;
