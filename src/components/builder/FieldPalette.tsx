import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import { alpha, Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { memo } from "react";
import { fieldCatalog } from "../../data/fieldCatalog";
import { useBuilderStore } from "../../store/builderStore";
import { FieldCategory, FieldType } from "../../types/form";
import { fieldTypeMeta } from "../shared/fieldMeta";
import PanelSection from "../shared/PanelSection";
import { DND_ITEM_TYPE } from "./dnd";

interface PaletteCardProps {
  type: FieldType;
  title: string;
  description: string;
  onAdd: (type: FieldType) => void;
}

const PaletteCard = memo(function PaletteCard({
  type,
  title,
  description,
  onAdd,
}: PaletteCardProps) {
  const { icon, color } = fieldTypeMeta[type];
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${type}`,
      data: {
        type: DND_ITEM_TYPE.paletteField,
        fieldType: type,
      },
    });

  return (
    <Tooltip title={`Add ${title}`} placement="right" arrow>
      <Box
        ref={setNodeRef}
        onClick={() => onAdd(type)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onAdd(type);
          }
        }}
        {...listeners}
        {...attributes}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          p: 1.1,
          borderRadius: 1,
          border: "1px solid",
          borderColor: isDragging ? alpha(color, 0.42) : alpha("#0f172a", 0.08),
          bgcolor: isDragging ? alpha(color, 0.08) : alpha("#ffffff", 0.96),
          cursor: isDragging ? "grabbing" : "grab",
          transition:
            "transform 160ms ease, border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
          outline: "none",
          opacity: isDragging ? 0.48 : 1,
          transform: CSS.Translate.toString(transform),
          boxShadow: isDragging
            ? `0 14px 30px ${alpha(color, 0.16)}`
            : "0 6px 18px rgba(15, 23, 42, 0.05)",
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(90deg, ${alpha(color, 0.12)} 0px, transparent 64px)`,
            opacity: isDragging ? 1 : 0,
            transition: "opacity 160ms ease",
          },
          "&:hover": {
            borderColor: alpha(color, 0.28),
            bgcolor: alpha(color, 0.04),
            boxShadow: `0 12px 24px ${alpha(color, 0.1)}`,
            transform: isDragging
              ? CSS.Translate.toString(transform)
              : "translateY(-1px)",
          },
          "&:focus-visible": {
            borderColor: color,
            boxShadow: `0 0 0 3px ${alpha(color, 0.18)}, 0 10px 24px ${alpha(color, 0.1)}`,
          },
          "&:active": {
            transform: CSS.Translate.toString(transform),
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: alpha(color, isDragging ? 0.18 : 0.1),
            color,
            transition: "background-color 160ms ease, transform 160ms ease",
            transform: isDragging ? "scale(1.04)" : "scale(1)",
          }}
        >
          {icon}
        </Box>

        <Stack
          spacing={0.2}
          sx={{ minWidth: 0, flex: 1, position: "relative", zIndex: 1 }}
        >
          <Stack
            direction="row"
            spacing={0.2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle2"
              sx={{ lineHeight: 1.3, color: "text.primary", fontWeight: 700 }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.35,
                color: isDragging ? color : "text.disabled",
                transition: "color 160ms ease, transform 160ms ease",
                transform: isDragging ? "translateX(0)" : "translateX(1px)",
              }}
            >
              <DragIndicatorRoundedIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                Drag
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.4 }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>
    </Tooltip>
  );
});

const GROUPS: FieldCategory[] = ["Basic", "Choice"];

function FieldPalette() {
  const addField = useBuilderStore((state) => state.addField);

  return (
    <PanelSection
      eyebrow="Palette"
      title="Field types"
      description="Compact field types for quick form building. Click to add or drag into the canvas."
      actions={
        <Chip
          icon={<LayersRoundedIcon />}
          label={`${fieldCatalog.length} types`}
          variant="outlined"
          size="small"
        />
      }
    >
      <Stack spacing={1}>
        <Stack spacing={2}>
          {GROUPS.map((group) => {
            const items = fieldCatalog.filter(
              (item) => item.category === group,
            );

            return (
              <Stack key={group} spacing={0.75}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 0.25 }}
                >
                  <Typography
                    variant="overline"
                    color="text.disabled"
                    sx={{ letterSpacing: "0.1em", lineHeight: 1 }}
                  >
                    {group}
                  </Typography>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
                  <Typography variant="caption" color="text.disabled">
                    {items.length}
                  </Typography>
                </Stack>

                <Stack spacing={0.6}>
                  {items.map((item) => (
                    <PaletteCard
                      key={item.type}
                      type={item.type}
                      title={item.title}
                      description={item.description}
                      onAdd={addField}
                    />
                  ))}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </PanelSection>
  );
}

export default memo(FieldPalette);
