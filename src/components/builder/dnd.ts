import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FieldType } from "../../types/form";

export const BUILDER_CANVAS_DROP_ZONE_ID = "builder-canvas-drop-zone";

export const DND_ITEM_TYPE = {
  paletteField: "palette-field",
  canvasField: "canvas-field",
} as const;

export type DndItemType = (typeof DND_ITEM_TYPE)[keyof typeof DND_ITEM_TYPE];

export interface PaletteFieldDragData {
  type: typeof DND_ITEM_TYPE.paletteField;
  fieldType: FieldType;
}

export interface CanvasFieldDragData {
  type: typeof DND_ITEM_TYPE.canvasField;
  fieldId: string;
}

export type BuilderDragData = PaletteFieldDragData | CanvasFieldDragData;

export function isPaletteFieldDragData(
  data: BuilderDragData | null | undefined,
): data is PaletteFieldDragData {
  return data?.type === DND_ITEM_TYPE.paletteField;
}

export function isCanvasFieldDragData(
  data: BuilderDragData | null | undefined,
): data is CanvasFieldDragData {
  return data?.type === DND_ITEM_TYPE.canvasField;
}

export function useBuilderDndSensors() {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );
}

export function getDragDataFromEvent(event: DragStartEvent | DragEndEvent) {
  return event.active.data.current as BuilderDragData | undefined;
}
