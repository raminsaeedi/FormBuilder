import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ViewStreamRoundedIcon from "@mui/icons-material/ViewStreamRounded";
import { alpha, Box, Button, Chip, Stack, Typography } from "@mui/material";
import PanelSection from "../shared/PanelSection";
import BuilderFieldCard from "./BuilderFieldCard";
import { useBuilderStore } from "../../store/builderStore";

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
      {/* Icon badge */}
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

      {/* Headline */}
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Start building your form
      </Typography>

      {/* Supporting copy */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 300, mx: "auto", lineHeight: 1.6 }}
      >
        Choose a field type from the palette on the left, or add a text field
        right now to get started.
      </Typography>

      {/* Primary CTA */}
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={onAddFirst}
      >
        Add your first field
      </Button>
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
      description="Drag fields into order, then click any field to edit its settings in the inspector."
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
            <BuilderFieldCard
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
