import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { alpha, Box, Chip, Container, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import UxAnalysisPanel from "../components/analysis/UxAnalysisPanel";
import FormCanvas from "../components/builder/BuilderCanvas";
import {
  BUILDER_CANVAS_DROP_ZONE_ID,
  BuilderDragData,
  getDragDataFromEvent,
  isCanvasFieldDragData,
  isPaletteFieldDragData,
  useBuilderDndSensors,
} from "../components/builder/dnd";
import FieldPalette from "../components/builder/FieldPalette";
import InspectorPanel from "../components/inspector/InspectorPanel";
import PreviewPanel from "../components/preview/PreviewPanel";
import AppHeader from "../components/shared/AppHeader";
import { fieldTypeMeta } from "../components/shared/fieldMeta";
import { useBuilderStore } from "../store/builderStore";

function App() {
  const previewMode = useBuilderStore((s) => s.previewMode);
  const form = useBuilderStore((s) => s.form);
  const sensors = useBuilderDndSensors();
  const insertField = useBuilderStore((s) => s.insertField);
  const reorderFields = useBuilderStore((s) => s.reorderFields);
  const [activeDragData, setActiveDragData] = useState<BuilderDragData | null>(
    null,
  );

  const activeField = useMemo(() => {
    if (!isCanvasFieldDragData(activeDragData)) {
      return null;
    }

    return (
      form.fields.find((field) => field.id === activeDragData.fieldId) ?? null
    );
  }, [activeDragData, form.fields]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragData(getDragDataFromEvent(event) ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const dragData = getDragDataFromEvent(event);
    const overId = event.over?.id;

    if (isPaletteFieldDragData(dragData)) {
      if (overId === BUILDER_CANVAS_DROP_ZONE_ID) {
        insertField(dragData.fieldType);
      }

      setActiveDragData(null);
      return;
    }

    if (
      isCanvasFieldDragData(dragData) &&
      typeof overId === "string" &&
      overId !== BUILDER_CANVAS_DROP_ZONE_ID
    ) {
      reorderFields(dragData.fieldId, overId);
    }

    setActiveDragData(null);
  };

  const handleDragCancel = () => {
    setActiveDragData(null);
  };

  const paletteOverlay =
    activeDragData?.type === "palette-field"
      ? fieldTypeMeta[activeDragData.fieldType]
      : null;

  const canvasOverlay = activeField ? fieldTypeMeta[activeField.type] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(180deg, rgba(248,250,252,0.92) 0%, rgba(255,255,255,0.98) 28%, rgba(248,250,252,0.9) 100%)",
          backgroundSize: "24px 24px, 100% 100%",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1640,
            px: { xs: 2, md: 3.25, xl: 4.5 },
            py: { xs: 2.75, md: 3.25 },
          }}
        >
          <Stack spacing={3.25}>
            <AppHeader />

            {!previewMode && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    lg: "260px minmax(0, 1fr) 340px",
                    xl: "280px minmax(0, 1fr) 360px",
                  },
                  gap: 3.25,
                  alignItems: "start",
                }}
              >
                <Box id="field-library">
                  <FieldPalette />
                </Box>

                <FormCanvas />

                <Stack spacing={3.25}>
                  <InspectorPanel />
                  <Box id="ux-analysis-panel">
                    <UxAnalysisPanel />
                  </Box>
                </Stack>
              </Box>
            )}

            <Box
              sx={{
                transition: "opacity 200ms ease, transform 200ms ease",
                opacity: previewMode ? 1 : 0.96,
                transform: previewMode ? "translateY(0)" : "translateY(0)",
              }}
            >
              <PreviewPanel />
            </Box>
          </Stack>
        </Container>
      </Box>

      <DragOverlay
        dropAnimation={{
          duration: 180,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {paletteOverlay ? (
          <Box
            sx={{
              minWidth: 260,
              maxWidth: 320,
              px: 1.5,
              py: 1.25,
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha(paletteOverlay.color, 0.34),
              bgcolor: alpha("#ffffff", 0.96),
              boxShadow: `0 18px 40px ${alpha(paletteOverlay.color, 0.22)}`,
              backdropFilter: "blur(12px)",
              transform: "rotate(-1deg)",
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(paletteOverlay.color, 0.12),
                  color: paletteOverlay.color,
                  flexShrink: 0,
                }}
              >
                {paletteOverlay.icon}
              </Box>

              <Stack spacing={0.35} sx={{ minWidth: 0, flex: 1 }}>
                <Stack
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  useFlexGap
                  flexWrap="wrap"
                >
                  <Chip
                    size="small"
                    icon={<AddCircleOutlineRoundedIcon />}
                    label="New field"
                    sx={{
                      height: 22,
                      fontWeight: 700,
                      bgcolor: alpha(paletteOverlay.color, 0.1),
                      color: paletteOverlay.color,
                    }}
                  />
                  <Chip
                    size="small"
                    icon={<SouthRoundedIcon />}
                    label="Drop into canvas"
                    variant="outlined"
                    sx={{ height: 22, fontWeight: 700 }}
                  />
                </Stack>

                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  color="text.primary"
                >
                  {paletteOverlay.label} field
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: 1.45 }}
                >
                  Release over the canvas to add this field to your form.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ) : canvasOverlay && activeField ? (
          <Box
            sx={{
              minWidth: 280,
              maxWidth: 360,
              px: 1.5,
              py: 1.25,
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha(canvasOverlay.color, 0.28),
              bgcolor: alpha("#ffffff", 0.96),
              boxShadow: `0 18px 40px ${alpha(canvasOverlay.color, 0.18)}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(canvasOverlay.color, 0.12),
                  color: canvasOverlay.color,
                  flexShrink: 0,
                }}
              >
                {canvasOverlay.icon}
              </Box>

              <Stack spacing={0.35} sx={{ minWidth: 0, flex: 1 }}>
                <Stack
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  useFlexGap
                  flexWrap="wrap"
                >
                  <Chip
                    size="small"
                    icon={<DragIndicatorRoundedIcon />}
                    label="Reordering"
                    sx={{
                      height: 22,
                      fontWeight: 700,
                      bgcolor: alpha(canvasOverlay.color, 0.1),
                      color: canvasOverlay.color,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Move within canvas
                  </Typography>
                </Stack>

                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  color="text.primary"
                  noWrap
                >
                  {activeField.label || "Untitled field"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: 1.45 }}
                >
                  Release to place this field in a new position.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
