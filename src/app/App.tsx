import { Box, Container, Stack } from "@mui/material";
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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        // Subtle dot-grid texture for depth
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
          {/* ── Header ── */}
          <AppHeader />

          {/* ── Builder grid (hidden in preview mode) ── */}
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
              {/* Left: field palette */}
              <Box id="field-library">
                <FieldPalette />
              </Box>

              {/* Centre: canvas */}
              <FormCanvas />

              {/* Right: inspector + analysis */}
              <Stack spacing={3}>
                <InspectorPanel />
                <Box id="ux-analysis-panel">
                  <UxAnalysisPanel />
                </Box>
              </Stack>
            </Box>
          )}

          {/* ── Preview ── */}
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
  );
}

export default App;
