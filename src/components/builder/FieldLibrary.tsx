import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import { Button, Chip, Stack, Typography } from "@mui/material";
import PanelSection from "../shared/PanelSection";
import { fieldCatalog } from "../../data/fieldCatalog";
import { useBuilderStore } from "../../store/builderStore";

function FieldLibrary() {
  const addField = useBuilderStore((state) => state.addField);

  const groups = ["Basic", "Choice"] as const;

  return (
    <PanelSection
      eyebrow="Library"
      title="Available fields"
      description="Add realistic inputs to the current form using a simple click-first flow."
      actions={
        <Chip
          icon={<LayersRoundedIcon />}
          label={`${fieldCatalog.length} types`}
          variant="outlined"
        />
      }
    >
      <Stack spacing={2}>
        {groups.map((group) => (
          <Stack spacing={1.25} key={group}>
            <Typography variant="subtitle2" color="text.secondary">
              {group}
            </Typography>
            {fieldCatalog
              .filter((item) => item.category === group)
              .map((item) => (
                <Stack
                  key={item.type}
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                  sx={{
                    p: 1.5,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    bgcolor: "grey.50",
                  }}
                >
                  <Stack spacing={0.35} sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => addField(item.type)}
                  >
                    Add
                  </Button>
                </Stack>
              ))}
          </Stack>
        ))}
      </Stack>
    </PanelSection>
  );
}

export default FieldLibrary;
