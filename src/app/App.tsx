import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Box, Container, Stack } from "@mui/material";
import { useMemo, useState } from "react";
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
import PreviewPanel from "../components/preview/PreviewPanel";
import UxAnalysisPanel from "../components/analysis/UxAnalysisPanel";
import InspectorPanel from "../components/inspector/InspectorPanel";
import AppHeader from "../components/shared/AppHeader";
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
    if (activeDragData?.type !== "canvas-field") {
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
    const isCanvasDrop = overId === BUILDER_CANVAS_DROP_ZONE_ID;

    if (isCanvasDrop && isPaletteFieldDragData(dragData)) {
      insertField(dragData.fieldType);
    }

    if (
      overId &&
      typeof overId === "string" &&
      isCanvasFieldDragData(dragData)
    ) {
      reorderFields(dragData.fieldId, overId);
    }

    setActiveDragData(null);
  };

  const handleDragCancel = () => {
    setActiveDragData(null);
  };

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
            "radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1600,
            px: { xs: 2, md: 3, xl: 4 },
            py: { xs: 2.5, md: 3 },
          }}
        >
          <Stack spacing={3}>
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
                  gap: 3,
                  alignItems: "start",
                }}
              >
                <Box id="field-library">
                  <FieldPalette />
                </Box>

                <FormCanvas />

                <Stack spacing={3}>
                  <InspectorPanel />
                  <Box id="ux-analysis-panel">
                    <UxAnalysisPanel />
                  </Box>
                </Stack>
              </Box>
            )}

            <Box
              sx={{
                transition: "opacity 200ms ease",
                opacity: previewMode ? 1 : 0.94,
              }}
            >
              <PreviewPanel />
            </Box>
          </Stack>
        </Container>
      </Box>

      <DragOverlay>
        {activeDragData?.type === "palette-field" ? (
          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "primary.main",
              bgcolor: "background.paper",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.16)",
              typography: "body2",
              fontWeight: 600,
              minWidth: 180,
            }}
          >
            Drop to add {activeDragData.fieldType} field
          </Box>
        ) : activeField ? (
          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.16)",
              typography: "body2",
              fontWeight: 600,
              minWidth: 220,
            }}
          >
            Reordering: {activeField.label || "Untitled field"}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
