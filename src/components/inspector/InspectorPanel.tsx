import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PanelSection from "../shared/PanelSection";
import { useBuilderStore } from "../../store/builderStore";

function InspectorPanel() {
  const selectedFieldId = useBuilderStore((state) => state.selectedFieldId);
  const field = useBuilderStore(
    (state) =>
      state.form.fields.find((item) => item.id === selectedFieldId) ?? null,
  );
  const updateField = useBuilderStore((state) => state.updateField);

  return (
    <PanelSection
      eyebrow="Inspector"
      title="Field settings"
      description="Update the selected field with only the settings needed for a convincing UI MVP."
      actions={
        <Chip
          icon={<TuneRoundedIcon />}
          label={field ? field.type : "No selection"}
          variant="outlined"
        />
      }
    >
      {field ? (
        <Stack spacing={2}>
          <TextField
            label="Label"
            value={field.label}
            onChange={(event) =>
              updateField(field.id, { label: event.target.value })
            }
            fullWidth
          />
          <TextField
            label="Placeholder"
            value={field.placeholder}
            onChange={(event) =>
              updateField(field.id, { placeholder: event.target.value })
            }
            fullWidth
          />
          <TextField
            label="Help text"
            value={field.helpText}
            onChange={(event) =>
              updateField(field.id, { helpText: event.target.value })
            }
            fullWidth
            multiline
            minRows={2}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="field-width-label">Width</InputLabel>
              <Select
                labelId="field-width-label"
                label="Width"
                value={field.width}
                onChange={(event) =>
                  updateField(field.id, {
                    width: event.target.value as "full" | "half",
                  })
                }
              >
                <MenuItem value="half">Half width</MenuItem>
                <MenuItem value="full">Full width</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", px: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={field.required}
                    onChange={(event) =>
                      updateField(field.id, { required: event.target.checked })
                    }
                  />
                }
                label="Required field"
              />
            </Box>
          </Stack>
          {(field.type === "select" || field.type === "radio") &&
          field.options ? (
            <Stack spacing={1.25}>
              <Typography variant="subtitle2">Options</Typography>
              {field.options.map((option, index) => (
                <TextField
                  key={option.id}
                  label={`Option ${index + 1}`}
                  value={option.label}
                  onChange={(event) => {
                    const options = field.options?.map((item) =>
                      item.id === option.id
                        ? {
                            ...item,
                            label: event.target.value,
                            value: event.target.value
                              .toLowerCase()
                              .replace(/\s+/g, "-"),
                          }
                        : item,
                    );
                    updateField(field.id, { options });
                  }}
                  fullWidth
                />
              ))}
            </Stack>
          ) : null}
        </Stack>
      ) : (
        <Box
          sx={{
            p: 3,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Select a field from the canvas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The inspector will show editable settings like label, helper copy,
            width and required state.
          </Typography>
        </Box>
      )}
    </PanelSection>
  );
}

export default InspectorPanel;
