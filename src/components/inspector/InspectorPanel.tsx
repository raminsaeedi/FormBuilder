import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MouseRoundedIcon from "@mui/icons-material/MouseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
  alpha,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PanelSection from "../shared/PanelSection";
import { fieldTypeMeta } from "../builder/BuilderFieldCard";
import { useBuilderStore } from "../../store/builderStore";
import { FieldOption, FieldWidth } from "../../types/form";

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────

const createId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// ─────────────────────────────────────────────
// No-selection empty state
// ─────────────────────────────────────────────

function NoSelection() {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: "center",
        border: "1.5px dashed",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "grey.50",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: alpha("#2563eb", 0.08),
          color: "primary.main",
          mb: 1.5,
        }}
      >
        <MouseRoundedIcon />
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        No field selected
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Click any field in the canvas to edit its label, placeholder, help text,
        width and required state.
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Options editor (select / radio)
// ─────────────────────────────────────────────

interface OptionsEditorProps {
  fieldId: string;
  options: FieldOption[];
  onUpdate: (options: FieldOption[]) => void;
}

function OptionsEditor({
  fieldId: _fieldId,
  options,
  onUpdate,
}: OptionsEditorProps) {
  const handleLabelChange = (optionId: string, newLabel: string) => {
    onUpdate(
      options.map((opt) =>
        opt.id === optionId
          ? { ...opt, label: newLabel, value: slugify(newLabel) || opt.value }
          : opt,
      ),
    );
  };

  const handleAdd = () => {
    const newOption: FieldOption = {
      id: createId("opt"),
      label: `Option ${options.length + 1}`,
      value: `option-${options.length + 1}`,
    };
    onUpdate([...options, newOption]);
  };

  const handleDelete = (optionId: string) => {
    onUpdate(options.filter((opt) => opt.id !== optionId));
  };

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="text.secondary">
          Options
        </Typography>
        <Chip
          label={`${options.length} option${options.length !== 1 ? "s" : ""}`}
          size="small"
          variant="outlined"
        />
      </Stack>

      {options.map((option, index) => (
        <Stack key={option.id} direction="row" spacing={1} alignItems="center">
          <TextField
            label={`Option ${index + 1}`}
            value={option.label}
            onChange={(e) => handleLabelChange(option.id, e.target.value)}
            size="small"
            fullWidth
          />
          <Tooltip title="Remove option" arrow>
            <span>
              <IconButton
                size="small"
                color="error"
                disabled={options.length <= 1}
                onClick={() => handleDelete(option.id)}
                aria-label={`Remove option ${index + 1}`}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      ))}

      <Button
        size="small"
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        onClick={handleAdd}
        sx={{ alignSelf: "flex-start" }}
      >
        Add option
      </Button>
    </Stack>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function InspectorPanel() {
  const selectedFieldId = useBuilderStore((s) => s.selectedFieldId);
  const field = useBuilderStore(
    (s) => s.form.fields.find((f) => f.id === selectedFieldId) ?? null,
  );
  const updateField = useBuilderStore((s) => s.updateField);

  const meta = field ? fieldTypeMeta[field.type] : null;

  return (
    <PanelSection
      eyebrow="Inspector"
      title="Field settings"
      description="Edit the selected field's content and layout properties."
      actions={
        meta && field ? (
          <Chip
            icon={
              <Box
                sx={{
                  display: "inline-flex",
                  color: meta.color,
                  "& svg": { fontSize: "0.9rem" },
                }}
              >
                {meta.icon}
              </Box>
            }
            label={meta.label}
            size="small"
            sx={{
              bgcolor: alpha(meta.color, 0.1),
              color: meta.color,
              fontWeight: 600,
              border: "none",
            }}
          />
        ) : (
          <Chip
            icon={<TuneRoundedIcon />}
            label="No selection"
            size="small"
            variant="outlined"
          />
        )
      }
    >
      {field ? (
        <Stack spacing={2.5}>
          {/* ── Section: Content ── */}
          <Stack spacing={1.75}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.1em" }}
            >
              Content
            </Typography>

            {/* Label */}
            <TextField
              label="Label"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              fullWidth
              size="small"
              helperText="Visible above the input — keep it short and clear."
              error={!field.label.trim()}
              FormHelperTextProps={{ sx: { mx: 0 } }}
            />

            {/* Placeholder — hidden for checkbox / radio */}
            {field.type !== "checkbox" && field.type !== "radio" && (
              <TextField
                label="Placeholder"
                value={field.placeholder}
                onChange={(e) =>
                  updateField(field.id, { placeholder: e.target.value })
                }
                fullWidth
                size="small"
                helperText="Example value shown inside the empty input."
                FormHelperTextProps={{ sx: { mx: 0 } }}
              />
            )}

            {/* Help text */}
            <TextField
              label="Help text"
              value={field.helpText}
              onChange={(e) =>
                updateField(field.id, { helpText: e.target.value })
              }
              fullWidth
              size="small"
              multiline
              minRows={2}
              helperText="Optional guidance shown below the input."
              FormHelperTextProps={{ sx: { mx: 0 } }}
            />
          </Stack>

          <Divider />

          {/* ── Section: Layout & behaviour ── */}
          <Stack spacing={1.75}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.1em" }}
            >
              Layout & behaviour
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              {/* Width */}
              <FormControl fullWidth size="small">
                <InputLabel id={`width-label-${field.id}`}>Width</InputLabel>
                <Select
                  labelId={`width-label-${field.id}`}
                  label="Width"
                  value={field.width}
                  onChange={(e) =>
                    updateField(field.id, {
                      width: e.target.value as FieldWidth,
                    })
                  }
                >
                  <MenuItem value="half">Half width</MenuItem>
                  <MenuItem value="full">Full width</MenuItem>
                </Select>
              </FormControl>

              {/* Required toggle */}
              <Box sx={{ flexShrink: 0 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.required}
                      onChange={(e) =>
                        updateField(field.id, { required: e.target.checked })
                      }
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">Required</Typography>}
                />
              </Box>
            </Stack>
          </Stack>

          {/* ── Section: Field type (read-only) ── */}
          <Divider />

          <Stack spacing={1}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.1em" }}
            >
              Field type
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {meta && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderRadius: 1.5,
                    bgcolor: alpha(meta.color, 0.1),
                    color: meta.color,
                  }}
                >
                  {meta.icon}
                </Box>
              )}
              <Box>
                <Typography variant="subtitle2">
                  {meta?.label ?? field.type}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Field ID: {field.id}
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* ── Section: Options (select / radio only) ── */}
          {(field.type === "select" || field.type === "radio") &&
            field.options && (
              <>
                <Divider />
                <OptionsEditor
                  fieldId={field.id}
                  options={field.options}
                  onUpdate={(options) => updateField(field.id, { options })}
                />
              </>
            )}
        </Stack>
      ) : (
        <NoSelection />
      )}
    </PanelSection>
  );
}

export default InspectorPanel;
