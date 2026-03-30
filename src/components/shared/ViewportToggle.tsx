import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useBuilderStore } from "../../store/builderStore";

// ─────────────────────────────────────────────
// ViewportToggle
// ─────────────────────────────────────────────
// Standalone toggle that reads/writes viewportMode in the global store.
// Drop it anywhere — AppHeader, PreviewPanel toolbar, etc.
// ─────────────────────────────────────────────

export interface ViewportToggleProps {
  /** MUI ToggleButtonGroup size. Defaults to "small". */
  size?: "small" | "medium" | "large";
}

function ViewportToggle({ size = "small" }: ViewportToggleProps) {
  const viewportMode = useBuilderStore((s) => s.viewportMode);
  const setViewportMode = useBuilderStore((s) => s.setViewportMode);

  return (
    <ToggleButtonGroup
      value={viewportMode}
      exclusive
      onChange={(_, val: "desktop" | "mobile") => {
        if (val) setViewportMode(val);
      }}
      size={size}
      aria-label="Viewport mode"
    >
      <Tooltip title="Desktop layout (two columns)" arrow>
        {/* Tooltip requires a single child that can hold a ref */}
        <span>
          <ToggleButton value="desktop" aria-label="Desktop">
            <DesktopWindowsRoundedIcon fontSize="small" />
          </ToggleButton>
        </span>
      </Tooltip>

      <Tooltip title="Mobile layout (single column, max 390 px)" arrow>
        <span>
          <ToggleButton value="mobile" aria-label="Mobile">
            <PhoneAndroidRoundedIcon fontSize="small" />
          </ToggleButton>
        </span>
      </Tooltip>
    </ToggleButtonGroup>
  );
}

export default ViewportToggle;
