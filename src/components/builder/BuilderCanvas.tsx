import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ViewStreamRoundedIcon from "@mui/icons-material/ViewStreamRounded";
import { alpha, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useBuilderStore } from "../../store/builderStore";
import PanelSection from "../shared/PanelSection";
import BuilderFieldCard from "./BuilderFieldCard";
import { BUILDER_CANVAS_DROP_ZONE_ID } from "./dnd";

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
        Start building your form
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 300, mx: "auto", lineHeight: 1.6 }}
      >
        Drag a field type from the palette into this canvas, or add a text field
        right now to get started.
      </Typography>

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

function FormCanvas() {
  const form = useBuilderStore((s) => s.form);
  const selectedFieldId = useBuilderStore((s) => s.selectedFieldId);
  const selectField = useBuilderStore((s) => s.selectField);
  const addField = useBuilderStore((s) => s.addField);
  const deleteField = useBuilderStore((s) => s.deleteField);
  const duplicateField = useBuilderStore((s) => s.duplicateField);
  const moveField = useBuilderStore((s) => s.moveField);
  const { setNodeRef, isOver } = useDroppable({
    id: BUILDER_CANVAS_DROP_ZONE_ID,
  });

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
      <Box
        ref={setNodeRef}
        sx={{
          borderRadius: 4,
          transition:
            "box-shadow 160ms ease, background-color 160ms ease, border-color 160ms ease",
          bgcolor: isOver ? alpha("#2563eb", 0.03) : "transparent",
          boxShadow: isOver ? `0 0 0 2px ${alpha("#2563eb", 0.18)}` : "none",
          border: "1px dashed",
          borderColor: isOver ? alpha("#2563eb", 0.4) : "transparent",
          p: 1,
        }}
      >
        {fieldCount === 0 ? (
          <EmptyCanvas onAddFirst={() => addField("text")} />
        ) : (
          <SortableContext
            items={form.fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <Stack spacing={1.25}>
              {isOver && (
                <Box
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: alpha("#2563eb", 0.35),
                    bgcolor: alpha("#2563eb", 0.05),
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="primary.main"
                  >
                    Drop here to add a new field
                  </Typography>
                </Box>
              )}

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
          </SortableContext>
        )}
      </Box>
    </PanelSection>
  );
}

export default FormCanvas;
