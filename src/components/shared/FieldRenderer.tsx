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
import { ChangeEvent, ReactNode } from "react";
import { FormField, PreviewFieldValue } from "../../types/form";

export interface FieldRendererProps {
  field: FormField;
  readOnly?: boolean;
  gridColumn?: string;
  value?: PreviewFieldValue;
  onChange?: (value: PreviewFieldValue) => void;
}

function RequiredMark() {
  return (
    <Box component="span" sx={{ color: "error.main", ml: 0.25 }}>
      *
    </Box>
  );
}

function buildLabel(label: string, required: boolean): ReactNode {
  if (!required) return label || "Untitled";
  return (
    <>
      {label || "Untitled"}
      <RequiredMark />
    </>
  );
}

function getStringValue(value: PreviewFieldValue | undefined) {
  return typeof value === "string" ? value : "";
}

function getCheckboxValue(value: PreviewFieldValue | undefined) {
  return typeof value === "boolean" ? value : false;
}

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
          {field.options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

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
          {field.options.map((option) => (
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

  if (field.type === "checkbox") {
    return (
      <FormControl sx={{ gridColumn: col }}>
        <FormControlLabel
          disabled={readOnly}
          control={
            <Checkbox
              size="small"
              checked={getCheckboxValue(value)}
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
