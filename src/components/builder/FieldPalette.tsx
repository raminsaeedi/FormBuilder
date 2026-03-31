import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import { alpha, Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
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

function PaletteCard({ type, title, description, onAdd }: PaletteCardProps) {
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
    <Tooltip
      title={`Add a ${title} field to the canvas`}
      placement="right"
      arrow
    >
      <Box
        ref={setNodeRef}
        onClick={() => onAdd(type)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onAdd(type);
          }
        }}
        {...listeners}
        {...attributes}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.25,
          p: 1.25,
          borderRadius: "10px",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          cursor: isDragging ? "grabbing" : "grab",
          transition: "all 160ms ease",
          outline: "none",
          opacity: isDragging ? 0.55 : 1,
          transform: CSS.Translate.toString(transform),
          "&:hover": {
            borderColor: alpha(color, 0.5),
            bgcolor: alpha(color, 0.05),
            boxShadow: `0 2px 12px ${alpha(color, 0.14)}`,
            transform: isDragging
              ? CSS.Translate.toString(transform)
              : "translateY(-1px)",
          },
          "&:focus-visible": {
            borderColor: color,
            boxShadow: `0 0 0 3px ${alpha(color, 0.22)}`,
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
            borderRadius: "8px",
            bgcolor: alpha(color, 0.1),
            color,
          }}
        >
          {icon}
        </Box>

        <Stack spacing={0.2} sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{ lineHeight: 1.3, color: "text.primary" }}
          >
            {title}
          </Typography>
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
}

const GROUPS: FieldCategory[] = ["Basic", "Choice"];

function FieldPalette() {
  const addField = useBuilderStore((s) => s.addField);

  return (
    <PanelSection
      eyebrow="Palette"
      title="Field types"
      description="Click any type to add it to the canvas."
      actions={
        <Chip
          icon={<LayersRoundedIcon />}
          label={`${fieldCatalog.length} types`}
          variant="outlined"
          size="small"
        />
      }
    >
      <Stack spacing={2.5}>
        {GROUPS.map((group) => {
          const items = fieldCatalog.filter((item) => item.category === group);
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
    </PanelSection>
  );
}

export default FieldPalette;
