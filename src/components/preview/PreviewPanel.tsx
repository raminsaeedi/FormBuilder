import SendRoundedIcon from "@mui/icons-material/SendRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { alpha, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useBuilderStore } from "../../store/builderStore";
import FieldRenderer from "../shared/FieldRenderer";
import PanelSection from "../shared/PanelSection";
import ViewportToggle from "../shared/ViewportToggle";

function EmptyPreview() {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: "16px",
        bgcolor: alpha("#f8fafc", 0.9),
      }}
    >
      <VisibilityRoundedIcon
        sx={{ fontSize: 34, color: "text.disabled", mb: 1.25 }}
      />
      <Typography variant="subtitle2" fontWeight={700}>
        Preview will appear here
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Add fields in the builder to review spacing, hierarchy, and form flow in
        a realistic layout.
      </Typography>
    </Box>
  );
}

function PreviewPanel() {
  const form = useBuilderStore((s) => s.form);
  const viewportMode = useBuilderStore((s) => s.viewportMode);

  const isMobile = viewportMode === "mobile";
  const requiredCount = form.fields.filter((field) => field.required).length;

  return (
    <PanelSection
      eyebrow="Preview"
      title="Rendered form preview"
      description="Review the current form in a production-style frame to validate rhythm, readability, and mobile behavior."
      actions={
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          {requiredCount > 0 && (
            <Chip
              label={`${requiredCount} required`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          <Chip
            icon={<VisibilityRoundedIcon />}
            label="Read-only"
            size="small"
            variant="outlined"
          />
        </Stack>
      }
    >
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {form.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.35 }}
            >
              {form.description ||
                "A live rendering of the current form structure with production-oriented spacing and controls."}
            </Typography>
          </Box>

          <ViewportToggle />
        </Stack>

        <Box
          sx={{
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: alpha("#f8fafc", 0.92),
            p: { xs: 1.25, sm: 1.5 },
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1.25,
              py: 1,
              borderRadius: "14px 14px 0 0",
              border: "1px solid",
              borderColor: alpha("#cbd5e1", 0.8),
              borderBottom: "none",
              bgcolor: alpha("#e2e8f0", 0.45),
            }}
          >
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#f87171",
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#fbbf24",
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#34d399",
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {isMobile ? "Mobile viewport" : "Desktop viewport"}
              </Typography>
            </Stack>

            <Chip
              size="small"
              label={isMobile ? "390 px" : "Responsive grid"}
              variant="outlined"
            />
          </Box>

          <Box
            sx={{
              mx: "auto",
              width: "100%",
              maxWidth: isMobile ? 390 : "100%",
              minHeight: 320,
              transition: "max-width 220ms ease",
            }}
          >
            <Box
              sx={{
                border: "1px solid",
                borderColor: alpha("#cbd5e1", 0.8),
                borderRadius: isMobile ? "0 0 18px 18px" : "0 0 20px 20px",
                bgcolor: "background.paper",
                px: { xs: 1.25, sm: 2.25, md: 2.5 },
                py: { xs: 1.5, sm: 2, md: 2.25 },
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              }}
            >
              {form.fields.length === 0 ? (
                <EmptyPreview />
              ) : (
                <Stack spacing={2.25}>
                  <Box
                    sx={{
                      pb: 1.25,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 0.5 }}>
                      {form.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {form.description ||
                        "Complete the fields below to continue. This preview reflects the current builder configuration."}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : "repeat(2, minmax(0, 1fr))",
                      gap: 2,
                      transition: "grid-template-columns 220ms ease",
                    }}
                  >
                    {form.fields.map((field) => (
                      <FieldRenderer key={field.id} field={field} readOnly />
                    ))}
                  </Box>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    sx={{ pt: 0.5 }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<SendRoundedIcon />}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Submit form
                    </Button>
                    <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>

        {requiredCount > 0 && (
          <Typography variant="caption" color="text.secondary">
            <Box component="span" sx={{ color: "error.main", fontWeight: 700 }}>
              *
            </Box>{" "}
            Required fields must be completed before the form can be submitted.
          </Typography>
        )}
      </Stack>
    </PanelSection>
  );
}

export default PreviewPanel;
