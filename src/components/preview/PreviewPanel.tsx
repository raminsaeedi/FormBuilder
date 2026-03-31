import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
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
        py: { xs: 5, md: 6 },
        px: { xs: 2, md: 2.5 },
        textAlign: "center",
        border: "1px dashed",
        borderColor: alpha("#0f172a", 0.12),
        borderRadius: "18px",
        bgcolor: alpha("#f8fafc", 0.82),
      }}
    >
      <VisibilityRoundedIcon
        sx={{ fontSize: 34, color: "text.disabled", mb: 1.25 }}
      />
      <Typography variant="subtitle2" fontWeight={700}>
        Preview will appear here
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.6, maxWidth: 420, mx: "auto", lineHeight: 1.7 }}
      >
        Add fields in the builder to review spacing, hierarchy and form flow in
        a more realistic production-style layout.
      </Typography>
    </Box>
  );
}

function PreviewPanel() {
  const form = useBuilderStore((s) => s.form);
  const viewportMode = useBuilderStore((s) => s.viewportMode);
  const previewFieldValues = useBuilderStore((s) => s.previewFieldValues);
  const setPreviewFieldValue = useBuilderStore((s) => s.setPreviewFieldValue);
  const resetPreviewFieldValues = useBuilderStore(
    (s) => s.resetPreviewFieldValues,
  );

  const isMobile = viewportMode === "mobile";
  const requiredCount = form.fields.filter((field) => field.required).length;

  return (
    <PanelSection
      eyebrow="Preview"
      title="Rendered form preview"
      description="Review the current form in a balanced production-style frame to validate rhythm, readability and responsive behaviour."
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
            label="Interactive demo"
            size="small"
            variant="outlined"
          />
          <Button
            size="small"
            variant="text"
            startIcon={<RestartAltRoundedIcon />}
            onClick={resetPreviewFieldValues}
          >
            Reset values
          </Button>
        </Stack>
      }
    >
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={1.5}
        >
          <Stack spacing={0.45} sx={{ minWidth: 0, maxWidth: 760 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              {form.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {form.description ||
                "A live rendering of the current form structure with production-oriented spacing and restrained visual treatment."}
            </Typography>
          </Stack>

          <ViewportToggle />
        </Stack>

        <Box
          sx={{
            borderRadius: "24px",
            border: "1px solid",
            borderColor: alpha("#0f172a", 0.08),
            bgcolor: alpha("#f8fafc", 0.72),
            p: { xs: 1.25, sm: 1.5, md: 1.75 },
          }}
        >
          <Box
            sx={{
              borderRadius: "18px",
              border: "1px solid",
              borderColor: alpha("#cbd5e1", 0.9),
              bgcolor: alpha("#ffffff", 0.88),
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 1.25, sm: 1.5 },
                py: 1,
                borderBottom: "1px solid",
                borderColor: alpha("#cbd5e1", 0.75),
                bgcolor: alpha("#f8fafc", 0.92),
              }}
            >
              <Stack direction="row" spacing={0.9} alignItems="center">
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
                maxWidth: isMobile ? 390 : 1120,
                minHeight: 340,
                transition: "max-width 220ms ease",
                px: { xs: 1, sm: 1.5, md: 2 },
                py: { xs: 1.25, sm: 1.5, md: 1.75 },
              }}
            >
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: alpha("#cbd5e1", 0.8),
                  borderRadius: isMobile ? "18px" : "20px",
                  bgcolor: "background.paper",
                  px: { xs: 1.25, sm: 2.25, md: 2.75 },
                  py: { xs: 1.5, sm: 2.25, md: 2.5 },
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                }}
              >
                {form.fields.length === 0 ? (
                  <EmptyPreview />
                ) : (
                  <Stack spacing={2.5}>
                    <Box
                      sx={{
                        pb: 1.5,
                        borderBottom: "1px solid",
                        borderColor: alpha("#0f172a", 0.08),
                      }}
                    >
                      <Typography variant="h5" sx={{ mb: 0.6 }}>
                        {form.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
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
                        gap: { xs: 1.75, sm: 2, md: 2.25 },
                        transition: "grid-template-columns 220ms ease",
                      }}
                    >
                      {form.fields.map((field) => (
                        <FieldRenderer
                          key={field.id}
                          field={field}
                          readOnly={false}
                          value={previewFieldValues[field.id]}
                          onChange={(value) =>
                            setPreviewFieldValue(field.id, value)
                          }
                        />
                      ))}
                    </Box>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.25}
                      sx={{ pt: 0.75 }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<SendRoundedIcon />}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        Submit form
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ alignSelf: "flex-start" }}
                        onClick={resetPreviewFieldValues}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {requiredCount > 0 && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
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
