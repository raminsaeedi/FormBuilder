import { Box, Container, Divider, Stack } from "@mui/material";
import AppHeader from "../components/shared/AppHeader";
import FormCanvas from "../components/builder/BuilderCanvas";
import FieldPalette from "../components/builder/FieldPalette";
import UxAnalysisPanel from "../components/analysis/UxAnalysisPanel";
import InspectorPanel from "../components/inspector/InspectorPanel";
import PreviewPanel from "../components/preview/PreviewPanel";
import { useBuilderStore } from "../store/builderStore";

function App() {
  const previewMode = useBuilderStore((s) => s.previewMode);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        <Stack spacing={3}>
          {/* ── Header ── */}
          <AppHeader />

          {/* ── Builder grid (hidden in preview mode) ── */}
          {!previewMode && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  xl: "280px minmax(0, 1fr) 360px",
                },
                gap: 2,
                alignItems: "start",
              }}
            >
              {/* Left: field palette */}
              <Box id="field-library">
                <FieldPalette />
              </Box>

              {/* Centre: canvas */}
              <FormCanvas />

              {/* Right: inspector + analysis */}
              <Stack spacing={2}>
                <InspectorPanel />
                <Box id="ux-analysis-panel">
                  <UxAnalysisPanel />
                </Box>
              </Stack>
            </Box>
          )}

          <Divider />

          {/* ── Preview (always visible, prominent in preview mode) ── */}
          <Box
            sx={{
              transition: "opacity 200ms ease",
              opacity: previewMode ? 1 : 0.92,
            }}
          >
            <PreviewPanel />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
