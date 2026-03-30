import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PanelSection from "../shared/PanelSection";
import { useBuilderStore } from "../../store/builderStore";

function PreviewPanel() {
  const form = useBuilderStore((state) => state.form);

  return (
    <PanelSection
      eyebrow="Preview"
      title="Rendered form preview"
      description="A realistic read on how the current structure feels when shown as an actual form."
      actions={
        <Chip
          icon={<VisibilityRoundedIcon />}
          label="Live demo preview"
          variant="outlined"
        />
      }
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="subtitle1">{form.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {form.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {form.fields.map((field) => {
            const commonProps = {
              key: field.id,
              sx: {
                gridColumn: field.width === "full" ? "1 / -1" : "auto",
              },
            };

            if (field.type === "textarea") {
              return (
                <TextField
                  {...commonProps}
                  label={field.label}
                  placeholder={field.placeholder}
                  helperText={field.helpText}
                  multiline
                  minRows={4}
                  fullWidth
                />
              );
            }

            if (field.type === "select") {
              return (
                <FormControl {...commonProps} fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select label={field.label} defaultValue="">
                    <MenuItem value="">
                      <em>{field.placeholder || "Select an option"}</em>
                    </MenuItem>
                    {field.options?.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {field.helpText ? (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.75, ml: 1.75 }}
                    >
                      {field.helpText}
                    </Typography>
                  ) : null}
                </FormControl>
              );
            }

            if (field.type === "radio") {
              return (
                <Box {...commonProps}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {field.label}
                  </Typography>
                  <RadioGroup>
                    {field.options?.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                  {field.helpText ? (
                    <Typography variant="caption" color="text.secondary">
                      {field.helpText}
                    </Typography>
                  ) : null}
                </Box>
              );
            }

            if (field.type === "checkbox") {
              return (
                <Box {...commonProps}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={field.label}
                  />
                  {field.helpText ? (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", ml: 4.5 }}
                    >
                      {field.helpText}
                    </Typography>
                  ) : null}
                </Box>
              );
            }

            return (
              <TextField
                {...commonProps}
                type={
                  field.type === "email"
                    ? "email"
                    : field.type === "phone"
                      ? "tel"
                      : "text"
                }
                label={field.label}
                placeholder={field.placeholder}
                helperText={field.helpText}
                fullWidth
              />
            );
          })}
        </Box>

        <Stack direction="row" spacing={1.25}>
          <Button variant="contained">Submit preview</Button>
          <Button variant="outlined">Secondary action</Button>
        </Stack>
      </Stack>
    </PanelSection>
  );
}

export default PreviewPanel;
