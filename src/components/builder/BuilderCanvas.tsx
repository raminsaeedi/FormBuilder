import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import ViewStreamRoundedIcon from "@mui/icons-material/ViewStreamRounded";
import { alpha, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useBuilderStore } from "../../store/builderStore";
import PanelSection from "../shared/PanelSection";
import BuilderFieldCard from "./BuilderFieldCard";
import {
  BUILDER_CANVAS_DROP_ZONE_ID,
  BUILDER_REMOVE_DROP_ZONE_ID,
} from "./dnd";

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
          "background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
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
          transition: "opacity 160ms ease",
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
          transition: "background-color 160ms ease, transform 160ms ease",
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
          ? "The field will be inserted directly into this canvas position."
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

function RemoveDropZone() {
  const { isOver, setNodeRef } = useDroppable({
    id: BUILDER_REMOVE_DROP_ZONE_ID,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        minHeight: 64,
        px: 2,
        borderRadius: 3,
        border: "1px dashed",
        borderColor: isOver ? alpha("#ef4444", 0.42) : alpha("#ef4444", 0.18),
        bgcolor: isOver ? alpha("#ef4444", 0.08) : alpha("#ef4444", 0.03),
        color: isOver ? "error.main" : "text.secondary",
        boxShadow: isOver ? `0 0 0 4px ${alpha("#ef4444", 0.08)}` : "none",
        transition:
          "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
        transform: isOver ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <DeleteOutlineRoundedIcon fontSize="small" />
      <Typography variant="body2" fontWeight={700}>
        {isOver
          ? "Release to remove this field"
          : "Drag a canvas field here to remove it"}
      </Typography>
    </Box>
  );
}

function BuilderCanvas() {
  const fields = useBuilderStore((state) => state.form.fields);
  const selectedFieldId = useBuilderStore((state) => state.selectedFieldId);
  const selectField = useBuilderStore((state) => state.selectField);
  const addField = useBuilderStore((state) => state.addField);
  const removeField = useBuilderStore((state) => state.removeField);
  const duplicateField = useBuilderStore((state) => state.duplicateField);
  const moveField = useBuilderStore((state) => state.moveField);
  const { setNodeRef, isOver } = useDroppable({
    id: BUILDER_CANVAS_DROP_ZONE_ID,
  });

  const fieldCount = fields.length;

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
                "background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
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
                : "Drop directly on a card to insert before it, or drag a card out to delete it."}
          </Typography>
        </Stack>

        <Box
          ref={setNodeRef}
          sx={{
            position: "relative",
            borderRadius: 4.5,
            transition:
              "box-shadow 160ms ease, background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
            bgcolor: isOver ? alpha("#2563eb", 0.035) : "transparent",
            boxShadow: isOver ? `0 0 0 2px ${alpha("#2563eb", 0.18)}` : "none",
            border: "1px dashed",
            borderColor: isOver
              ? alpha("#2563eb", 0.4)
              : alpha("#0f172a", 0.08),
            p: 1.1,
            transform: isOver ? "translateY(-1px)" : "none",
            overflow: "hidden",
            minHeight: fieldCount === 0 ? 0 : 220,
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: isOver ? 1 : 0,
              background: `linear-gradient(180deg, ${alpha("#2563eb", 0.06)} 0%, transparent 40%)`,
              transition: "opacity 160ms ease",
            },
          }}
        >
          {fieldCount === 0 ? (
            <EmptyCanvas onAddFirst={() => addField("text")} isOver={isOver} />
          ) : (
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <Stack spacing={1.1} sx={{ position: "relative" }}>
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
                      "background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease",
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
                      transition: "all 160ms ease",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={isOver ? "primary.main" : "text.primary"}
                  >
                    {isOver
                      ? "Drop here to append a new field to the canvas"
                      : "Drop on a card to insert before it, or use the handle to reorder smoothly"}
                  </Typography>
                </Box>

                {fields.map((field, index) => (
                  <BuilderFieldCard
                    key={field.id}
                    field={field}
                    index={index}
                    total={fieldCount}
                    isSelected={selectedFieldId === field.id}
                    onSelect={() => selectField(field.id)}
                    onMoveUp={() => moveField(field.id, index - 1)}
                    onMoveDown={() => moveField(field.id, index + 1)}
                    onDuplicate={() => duplicateField(field.id)}
                    onDelete={() => removeField(field.id)}
                  />
                ))}
              </Stack>
            </SortableContext>
          )}
        </Box>

        {fieldCount > 0 && <RemoveDropZone />}
      </Stack>
    </PanelSection>
  );
}

export default memo(BuilderCanvas);
