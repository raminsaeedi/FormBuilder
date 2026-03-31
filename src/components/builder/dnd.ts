import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FieldType } from "../../types/form";

export const BUILDER_CANVAS_DROP_ZONE_ID = "builder-canvas-drop-zone";
export const BUILDER_REMOVE_DROP_ZONE_ID = "builder-remove-drop-zone";

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
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
}

export function getDragDataFromEvent(
  event: DragStartEvent | DragOverEvent | DragEndEvent,
) {
  return event.active.data.current as BuilderDragData | undefined;
}

export function isCanvasFieldId(id: string, fieldIds: string[]) {
  return fieldIds.includes(id);
}

export function getInsertionIndex(overId: string, fieldIds: string[]) {
  if (overId === BUILDER_CANVAS_DROP_ZONE_ID) {
    return fieldIds.length;
  }

  const overIndex = fieldIds.indexOf(overId);
  return overIndex >= 0 ? overIndex : fieldIds.length;
}
