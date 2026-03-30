import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import PanelSection from "../shared/PanelSection";
import { useBuilderStore } from "../../store/builderStore";
import { FieldType, FormField } from "../../types/form";

const iconByType: Record<FieldType, ReactNode> = {
  text: <ShortTextRoundedIcon fontSize="small" />,
  email: <ShortTextRoundedIcon fontSize="small" />,
  phone: <ShortTextRoundedIcon fontSize="small" />,
  select: <SubjectRoundedIcon fontSize="small" />,
  radio: <RadioButtonCheckedRoundedIcon fontSize="small" />,
  checkbox: <CheckBoxOutlinedIcon fontSize="small" />,
  textarea: <NotesRoundedIcon fontSize="small" />,
};

function FieldPreview({ field }: { field: FormField }) {
  if (field.type === "textarea") {
    return (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2.5,
          minHeight: 92,
          bgcolor: "#fff",
        }}
      />
    );
  }

  if (field.type === "radio" && field.options) {
    return (
      <Stack spacing={1}>
        {field.options.map((option) => (
          <Stack
            key={option.id}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "50%",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {option.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    );
  }

  if (field.type === "checkbox") {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 16,
            height: 16,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {field.label}
        </Typography>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2.5,
        px: 1.5,
        py: 1.25,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="body2" color="text.disabled">
        {field.placeholder || "Input preview"}
      </Typography>
    </Box>
  );
}

function BuilderCanvas() {
  const form = useBuilderStore((state) => state.form);
  const selectedFieldId = useBuilderStore((state) => state.selectedFieldId);
  const selectField = useBuilderStore((state) => state.selectField);
  const deleteField = useBuilderStore((state) => state.deleteField);
  const duplicateField = useBuilderStore((state) => state.duplicateField);
  const moveField = useBuilderStore((state) => state.moveField);

  return (
    <PanelSection
      eyebrow="Builder"
      title="Form canvas"
      description="Arrange fields, inspect details and refine the structure before adding deeper logic."
      actions={
        <Chip
          icon={<DragIndicatorRoundedIcon />}
          label="Click-to-build MVP"
          variant="outlined"
        />
      }
    >
      <Stack spacing={1.5}>
        {form.fields.map((field, index) => {
          const isSelected = selectedFieldId === field.id;
          return (
            <Box
              key={field.id}
              onClick={() => selectField(field.id)}
              sx={{
                p: 2,
                borderRadius: 4,
                border: "1px solid",
                borderColor: isSelected ? "primary.main" : "divider",
                bgcolor: isSelected ? "rgba(37, 99, 235, 0.06)" : "grey.50",
                cursor: "pointer",
                transition: "all 160ms ease",
              }}
            >
              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  alignItems="flex-start"
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: "#fff",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {iconByType[field.type]}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">{field.label}</Typography>
                      <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Chip
                          label={field.type}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={field.width}
                          size="small"
                          variant="outlined"
                        />
                        {field.required ? (
                          <Chip label="required" size="small" color="primary" />
                        ) : null}
                      </Stack>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={0.25}>
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        moveField(field.id, "up");
                      }}
                    >
                      <ArrowUpwardRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        moveField(field.id, "down");
                      }}
                    >
                      <ArrowDownwardRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        duplicateField(field.id);
                      }}
                    >
                      <ContentCopyRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteField(field.id);
                      }}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <FieldPreview field={field} />

                {index < form.fields.length - 1 ? <Divider /> : null}
              </Stack>
            </Box>
          );
        })}

        {!form.fields.length ? (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 4,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              No fields yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Start with a text or email field to shape the first draft of your
              form.
            </Typography>
            <Button variant="contained">Add first field</Button>
          </Box>
        ) : null}
      </Stack>
    </PanelSection>
  );
}

export default BuilderCanvas;
