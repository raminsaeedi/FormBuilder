import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import ViewStreamRoundedIcon from "@mui/icons-material/ViewStreamRounded";
import { alpha, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useBuilderStore } from "../../store/builderStore";
import PanelSection from "../shared/PanelSection";
import BuilderFieldCard from "./BuilderFieldCard";
import { BUILDER_CANVAS_DROP_ZONE_ID } from "./dnd";

function EmptyCanvas({
  onAddFirst,
  isOver,
}: {
  onAddFirst: () => void;
  isOver: boolean;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        py: 6.5,
        px: 3.25,
        textAlign: "center",
        border: "1.5px dashed",
        borderColor: isOver ? alpha("#2563eb", 0.42) : alpha("#0f172a", 0.12),
        borderRadius: 4.5,
        bgcolor: isOver ? alpha("#2563eb", 0.05) : alpha("#f8fafc", 0.9),
        boxShadow: isOver
          ? `0 0 0 4px ${alpha("#2563eb", 0.08)}`
          : "inset 0 1px 0 rgba(255,255,255,0.7)",
        transition:
          "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
        transform: isOver ? "scale(1.005)" : "scale(1)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: isOver ? 1 : 0,
          background: `linear-gradient(180deg, ${alpha("#2563eb", 0.08)} 0%, transparent 55%)`,
          transition: "opacity 180ms ease",
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: alpha("#2563eb", isOver ? 0.14 : 0.08),
          color: "primary.main",
          mb: 2,
          transition: "background-color 180ms ease, transform 180ms ease",
          transform: isOver ? "translateY(-1px)" : "none",
        }}
      >
        <ViewStreamRoundedIcon fontSize="medium" />
      </Box>

      <Typography
        variant="h6"
        fontWeight={700}
        gutterBottom
        sx={{ position: "relative" }}
      >
        {isOver ? "Release to place your first field" : "Your form starts here"}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          position: "relative",
          mb: 1.5,
          maxWidth: 360,
          mx: "auto",
          lineHeight: 1.65,
        }}
      >
        {isOver
          ? "The field will be added to this canvas so you can continue editing without losing context."
          : "Add your first field by dragging a type from the palette or by clicking any field type to insert it instantly."}
      </Typography>

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{
          position: "relative",
          display: "block",
          mb: 3,
          maxWidth: 340,
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        {isOver
          ? "Drop now to begin structuring the form."
          : "Once a field is added, you can reorder it in the canvas and refine its settings in the inspector."}
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={onAddFirst}
        sx={{ position: "relative" }}
      >
        Add first field
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
      description="Build the form by adding fields from the palette, then select any field to refine its settings in the inspector."
      actions={
        <Chip
          label={`${fieldCount} field${fieldCount !== 1 ? "s" : ""}`}
          variant="outlined"
          size="small"
        />
      }
    >
      <Stack spacing={1.5}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ px: 0.25 }}
        >
          <Chip
            size="small"
            icon={<SouthRoundedIcon />}
            label={
              isOver
                ? "Release to add into the canvas"
                : "Drag from the palette or click to add"
            }
            color={isOver ? "primary" : "default"}
            variant={isOver ? "filled" : "outlined"}
            sx={{
              fontWeight: 700,
              borderColor: isOver ? "transparent" : alpha("#0f172a", 0.1),
              boxShadow: isOver
                ? `0 8px 18px ${alpha("#2563eb", 0.16)}`
                : "none",
              transition:
                "background-color 180ms ease, color 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            }}
          />

          <Typography
            variant="caption"
            color={isOver ? "primary.main" : "text.secondary"}
          >
            {isOver
              ? "The canvas is ready. Drop now to place the field here."
              : fieldCount === 0
                ? "Start with a single field, then continue building step by step."
                : "Use the drag handle to reorder fields after they have been added."}
          </Typography>
        </Stack>

        <Box
          ref={setNodeRef}
          sx={{
            position: "relative",
            borderRadius: 4.5,
            transition:
              "box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease, transform 180ms ease",
            bgcolor: isOver ? alpha("#2563eb", 0.035) : "transparent",
            boxShadow: isOver ? `0 0 0 2px ${alpha("#2563eb", 0.18)}` : "none",
            border: "1px dashed",
            borderColor: isOver
              ? alpha("#2563eb", 0.4)
              : alpha("#0f172a", 0.08),
            p: 1.1,
            transform: isOver ? "translateY(-1px)" : "none",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: isOver ? 1 : 0,
              background: `linear-gradient(180deg, ${alpha("#2563eb", 0.06)} 0%, transparent 40%)`,
              transition: "opacity 180ms ease",
            },
          }}
        >
          {fieldCount === 0 ? (
            <EmptyCanvas onAddFirst={() => addField("text")} isOver={isOver} />
          ) : (
            <SortableContext
              items={form.fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <Stack spacing={1.4} sx={{ position: "relative" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.35,
                    py: 1,
                    borderRadius: 3,
                    border: "1px dashed",
                    borderColor: isOver
                      ? alpha("#2563eb", 0.34)
                      : alpha("#0f172a", 0.08),
                    bgcolor: isOver
                      ? alpha("#2563eb", 0.06)
                      : alpha("#0f172a", 0.015),
                    transition:
                      "background-color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
                    transform: isOver ? "scale(1.01)" : "scale(1)",
                    boxShadow: isOver
                      ? `0 10px 24px ${alpha("#2563eb", 0.1)}`
                      : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: isOver ? "primary.main" : alpha("#0f172a", 0.18),
                      boxShadow: isOver
                        ? `0 0 0 6px ${alpha("#2563eb", 0.12)}`
                        : "none",
                      transition: "all 180ms ease",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={isOver ? "primary.main" : "text.primary"}
                  >
                    {isOver
                      ? "Drop here to add a new field to the canvas"
                      : "Add more fields by dragging from the palette or clicking a field type"}
                  </Typography>
                </Box>

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
      </Stack>
    </PanelSection>
  );
}

export default FormCanvas;
