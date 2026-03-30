import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import BuilderCanvas from "../components/builder/BuilderCanvas";
import FieldLibrary from "../components/builder/FieldLibrary";
import UxAnalysisPanel from "../components/analysis/UxAnalysisPanel";
import InspectorPanel from "../components/inspector/InspectorPanel";
import PreviewPanel from "../components/preview/PreviewPanel";
import { templates } from "../data/mockForm";
import { useBuilderStore } from "../store/builderStore";

function App() {
  const loadTemplate = useBuilderStore((state) => state.loadTemplate);
  const resetToPrimaryTemplate = useBuilderStore(
    (state) => state.resetToPrimaryTemplate,
  );
  const formName = useBuilderStore((state) => state.form.name);
  const fieldCount = useBuilderStore((state) => state.form.fields.length);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
              px: { xs: 2, md: 3 },
              py: 2.5,
              bgcolor: "background.paper",
              boxShadow: "0 24px 80px rgba(15, 23, 42, 0.06)",
            }}
          >
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", lg: "center" }}
            >
              <Stack spacing={1.25}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Chip
                    icon={<AutoAwesomeRoundedIcon />}
                    label="UI MVP"
                    color="primary"
                  />
                  <Chip label="Draft" variant="outlined" />
                  <Chip label={`${fieldCount} fields`} variant="outlined" />
                </Stack>
                <Box>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Smart Form Builder with UX Validation
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Single-page builder dashboard focused on layout, preview and
                    demo UX insights.
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <DashboardCustomizeRoundedIcon
                    color="action"
                    fontSize="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Active form: {formName}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                <Button
                  variant="outlined"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={resetToPrimaryTemplate}
                >
                  Reset demo
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DashboardCustomizeRoundedIcon />}
                  onClick={() => loadTemplate(templates[1])}
                >
                  Load checkout template
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineRoundedIcon />}
                >
                  Preview ready
                </Button>
              </Stack>
            </Stack>
          </Box>

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
            <FieldLibrary />
            <BuilderCanvas />
            <Stack spacing={2}>
              <InspectorPanel />
              <UxAnalysisPanel />
            </Stack>
          </Box>

          <Divider />

          <PreviewPanel />
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
