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
import { fieldTypeMeta } from "../shared/fieldMeta";
import { useBuilderStore } from "../../store/builderStore";
import type { AppView } from "../../store/builderStore";
import { FieldOption, FieldWidth } from "../../types/form";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const createId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// ─────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────

function SectionHeading({ children }: { children: string }) {
  return (
    <Box
      sx={{
        pb: 0.75,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ letterSpacing: "0.1em" }}
      >
        {children}
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────
// No-selection empty state
// ──────────────────────────────────��──────────

function NoSelection({ activeView }: { activeView: AppView }) {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: "center",
        border: "1.5px dashed",
        borderColor: "divider",
        borderRadius: "12px",
        bgcolor: alpha("#f8faff", 0.8),
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
        {activeView === "analysis"
          ? "Select a field to review"
          : "Select a field to inspect"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.6, maxWidth: 240, mx: "auto" }}
      >
        {activeView === "analysis"
          ? "Choose a field from the form canvas first, then review its content and behaviour next to the UX findings."
          : "Click any field in the canvas to edit its label, placeholder, help text, width, and required state."}
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
          Answer choices
        </Typography>
        <Chip
          label={`${options.length} choice${options.length !== 1 ? "s" : ""}`}
          size="small"
          variant="outlined"
        />
      </Stack>

      {options.map((option, index) => (
        <Stack key={option.id} direction="row" spacing={1} alignItems="center">
          <TextField
            label={`Choice ${index + 1}`}
            value={option.label}
            onChange={(e) => handleLabelChange(option.id, e.target.value)}
            size="small"
            fullWidth
          />
          <Tooltip
            title={
              options.length <= 1
                ? "At least one choice is required"
                : "Remove this choice"
            }
            arrow
          >
            <span>
              <IconButton
                size="small"
                color="error"
                disabled={options.length <= 1}
                onClick={() => handleDelete(option.id)}
                aria-label={`Remove choice ${index + 1}`}
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
        Add choice
      </Button>
    </Stack>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function InspectorPanel() {
  const selectedFieldId = useBuilderStore((s) => s.selectedFieldId);
  const activeView = useBuilderStore((s) => s.activeView);
  const field = useBuilderStore(
    (s) => s.form.fields.find((f) => f.id === selectedFieldId) ?? null,
  );
  const updateField = useBuilderStore((s) => s.updateField);

  const meta = field ? fieldTypeMeta[field.type] : null;

  return (
    <PanelSection
      eyebrow={activeView === "analysis" ? "Analysis workspace" : "Inspector"}
      title={activeView === "analysis" ? "Selected field" : "Field settings"}
      description={
        activeView === "analysis"
          ? "Refine the selected field while comparing it with the UX findings on the right."
          : "Fine-tune the selected field's content, layout, and behaviour."
      }
      actions={
        meta && field ? (
          <Chip
            icon={
              <Box
                sx={{
                  display: "inline-flex",
                  color: meta.color,
                  "& svg": { fontSize: "0.85rem" },
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
              fontWeight: 700,
              border: "none",
            }}
          />
        ) : (
          <Chip
            icon={<TuneRoundedIcon />}
            label="Nothing selected"
            size="small"
            variant="outlined"
          />
        )
      }
    >
      {field ? (
        <Stack spacing={activeView === "analysis" ? 2 : 2.25}>
          {activeView === "analysis" && (
            <Box
              sx={{
                px: 1.25,
                py: 1,
                borderRadius: "14px",
                border: "1px solid",
                borderColor: alpha("#0f172a", 0.08),
                bgcolor: alpha("#f8fafc", 0.9),
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={0.9}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    Reviewing
                  </Typography>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1.35 }}>
                    {field.label.trim() || meta?.label || "Untitled field"}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={field.required ? "Required" : "Optional"}
                  color={field.required ? "primary" : "default"}
                  variant={field.required ? "filled" : "outlined"}
                />
              </Stack>
            </Box>
          )}
          {/* ── Section: Content ── */}
          <Stack spacing={1.5}>
            <SectionHeading>
              {activeView === "analysis" ? "Content clarity" : "Content"}
            </SectionHeading>

            {/* Label */}
            <TextField
              label="Label"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              fullWidth
              size="small"
              helperText={
                !field.label.trim()
                  ? "A label is required — users need to know what to enter."
                  : "Shown above the input. Keep it short and specific."
              }
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
                helperText="Example value shown inside the empty input. Avoid repeating the label."
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
              helperText="Optional guidance shown below the input. Use it to clarify format or intent."
              FormHelperTextProps={{ sx: { mx: 0 } }}
            />
          </Stack>

          <Divider />

          {/* ── Section: Layout & behaviour ── */}
          <Stack spacing={1.5}>
            <SectionHeading>
              {activeView === "analysis"
                ? "Layout & completion"
                : "Layout & behaviour"}
            </SectionHeading>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ sm: "center" }}
            >
              {/* Width */}
              <FormControl fullWidth size="small">
                <InputLabel id={`width-label-${field.id}`}>
                  Column width
                </InputLabel>
                <Select
                  labelId={`width-label-${field.id}`}
                  label="Column width"
                  value={field.width}
                  onChange={(e) =>
                    updateField(field.id, {
                      width: e.target.value as FieldWidth,
                    })
                  }
                >
                  <MenuItem value="half">Half — side by side</MenuItem>
                  <MenuItem value="full">Full — spans the row</MenuItem>
                </Select>
              </FormControl>

              {/* Required toggle */}
              <Box sx={{ flexShrink: 0 }}>
                <Tooltip
                  title={
                    field.required
                      ? "Users must fill this field before submitting"
                      : "Users can skip this field"
                  }
                  arrow
                >
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
                </Tooltip>
              </Box>
            </Stack>
          </Stack>

          {/* ── Section: Field type (read-only) ── */}
          <Divider />

          <Stack spacing={1.25}>
            <SectionHeading>
              {activeView === "analysis" ? "Field reference" : "Field type"}
            </SectionHeading>
            <Stack direction="row" spacing={1} alignItems="center">
              {meta && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "8px",
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

          {/* ── Section: Answer choices (select / radio only) ── */}
          {(field.type === "select" || field.type === "radio") &&
            field.options && (
              <>
                <Divider />
                <Stack spacing={1.25}>
                  <SectionHeading>
                    {activeView === "analysis"
                      ? "Answer choices"
                      : "Answer choices"}
                  </SectionHeading>
                  <OptionsEditor
                    fieldId={field.id}
                    options={field.options}
                    onUpdate={(options) => updateField(field.id, { options })}
                  />
                </Stack>
              </>
            )}
        </Stack>
      ) : (
        <NoSelection activeView={activeView} />
      )}
    </PanelSection>
  );
}

export default InspectorPanel;
