import { create } from "zustand";
import { primaryTemplate, templates } from "../data/mockForm";
import { mockAnalysisByTemplateId } from "../data/mockAnalysis";
import { analyzeForm } from "../utils/analysis";
import {
  AnalysisResult,
  FieldType,
  FormDefinition,
  FormField,
  PreviewFieldState,
  PreviewFieldValue,
} from "../types/form";

// ─────────────────────────────────────────────
// State shape
// ─────────────────────────────────────────────

interface BuilderState {
  // ── Core data ───────────────────────────────
  /** The currently active form definition. */
  form: FormDefinition;

  /** ID of the field currently selected in the canvas, or null. */
  selectedFieldId: string | null;

  /** Store-backed values for the interactive preview/demo form. */
  previewFieldValues: PreviewFieldState;

  // ── UI mode ─────────────────────────────────
  /**
   * When true, the preview panel is the primary focus.
   * The builder canvas and inspector are visually de-emphasised.
   */
  previewMode: boolean;

  /**
   * The viewport simulation mode used in the preview panel.
   * "desktop" renders a two-column grid; "mobile" constrains to 390 px single-column.
   */
  viewportMode: "desktop" | "mobile";

  // ── Analysis ────────────────────────────────
  /**
   * The latest UX analysis result for the current form.
   * Re-computed automatically after every mutation.
   */
  analysisResult: AnalysisResult;

  // ── Actions: form-level ─────────────────────
  /** Replace the entire form with a new definition and re-run analysis. */
  setForm: (form: FormDefinition) => void;

  /** Load a template by reference and select its first field. */
  loadTemplate: (template: FormDefinition) => void;

  /** Reset to the primary demo template. */
  resetToPrimaryTemplate: () => void;

  // ── Actions: field selection ────────────────
  /** Set the active field in the canvas inspector. */
  selectField: (fieldId: string | null) => void;

  // ── Actions: field mutations ────────────────
  /** Append a new field of the given type to the end of the field list. */
  addField: (type: FieldType) => void;

  /** Insert a new field of the given type at a specific index. */
  insertField: (type: FieldType, index?: number) => void;

  /** Apply a partial patch to a specific field by ID. */
  updateField: (fieldId: string, patch: Partial<FormField>) => void;

  /** Remove a field by ID. Selects the next available field automatically. */
  deleteField: (fieldId: string) => void;

  /** Insert a copy of a field directly after the original. */
  duplicateField: (fieldId: string) => void;

  /** Swap a field one position up or down in the list. */
  moveField: (fieldId: string, direction: "up" | "down") => void;

  /** Reorder a field from one index to another. */
  reorderFields: (activeFieldId: string, overFieldId: string) => void;

  // ── Actions: preview values ─────────────────
  /** Set a single preview field value by field ID. */
  setPreviewFieldValue: (fieldId: string, value: PreviewFieldValue) => void;

  /** Reset all preview field values to defaults derived from the current form. */
  resetPreviewFieldValues: () => void;

  // ── Actions: UI mode ────────────────────────
  /** Toggle between builder mode and preview mode. */
  togglePreviewMode: () => void;

  /** Explicitly set preview mode on or off. */
  setPreviewMode: (active: boolean) => void;

  /** Set the viewport simulation mode for the preview panel. */
  setViewportMode: (mode: "desktop" | "mobile") => void;
}

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

const cloneTemplate = (template: FormDefinition): FormDefinition => ({
  ...template,
  fields: template.fields.map((field) => ({
    ...field,
    options: field.options?.map((option) => ({ ...option })),
  })),
});

const createId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const getDefaultPreviewValue = (field: FormField): PreviewFieldValue => {
  if (field.type === "checkbox") {
    return false;
  }

  if (field.type === "number") {
    return "";
  }

  return "";
};

const buildPreviewFieldValues = (form: FormDefinition): PreviewFieldState =>
  form.fields.reduce<PreviewFieldState>((acc, field) => {
    acc[field.id] = getDefaultPreviewValue(field);
    return acc;
  }, {});

const syncPreviewFieldValues = (
  form: FormDefinition,
  currentValues: PreviewFieldState,
): PreviewFieldState =>
  form.fields.reduce<PreviewFieldState>((acc, field) => {
    acc[field.id] =
      field.id in currentValues
        ? currentValues[field.id]
        : getDefaultPreviewValue(field);
    return acc;
  }, {});

const buildStateFromForm = (
  form: FormDefinition,
  overrides?: Partial<
    Pick<BuilderState, "selectedFieldId" | "previewMode" | "previewFieldValues">
  >,
) => ({
  form,
  selectedFieldId: overrides?.selectedFieldId ?? form.fields[0]?.id ?? null,
  previewMode: overrides?.previewMode ?? false,
  previewFieldValues:
    overrides?.previewFieldValues ?? buildPreviewFieldValues(form),
  analysisResult: resolveAnalysis(form),
});

/**
 * Return the best available analysis for a form:
 * 1. Use the static mock result if the template id is known (instant, no computation).
 * 2. Fall back to the live `analyzeForm()` engine for user-modified forms.
 */
const resolveAnalysis = (form: FormDefinition): AnalysisResult => {
  const mock = mockAnalysisByTemplateId[form.id];
  if (mock) return mock;
  return analyzeForm(form);
};

const fieldFactory = (type: FieldType): FormField => {
  const labelMap: Record<FieldType, string> = {
    text: "Text field",
    email: "Email address",
    phone: "Phone number",
    password: "Password",
    number: "Number",
    date: "Date",
    textarea: "Additional details",
    select: "Select option",
    radio: "Preferred option",
    checkbox: "I agree to the terms",
  };

  const placeholderMap: Record<FieldType, string> = {
    text: "Enter a value",
    email: "name@company.com",
    phone: "+49 123 456789",
    password: "••••••••",
    number: "0",
    date: "",
    textarea: "Enter additional context",
    select: "",
    radio: "",
    checkbox: "",
  };

  const helpTextMap: Record<FieldType, string> = {
    text: "Short helper text for this field.",
    email: "We will only use this to contact you.",
    phone: "Include country code when relevant.",
    password: "Minimum 8 characters recommended.",
    number: "Enter a numeric value.",
    date: "Use the format DD.MM.YYYY.",
    textarea: "Short helper text for this field.",
    select: "Choose the option that best applies.",
    radio: "Select one of the available options.",
    checkbox: "Optional acknowledgement control.",
  };

  const base: FormField = {
    id: createId("field"),
    type,
    label: labelMap[type],
    placeholder: placeholderMap[type],
    helpText: helpTextMap[type],
    required: type !== "checkbox",
    width:
      type === "textarea" || type === "checkbox" || type === "radio"
        ? "full"
        : "half",
  };

  if (type === "select") {
    return {
      ...base,
      options: [
        { id: createId("opt"), label: "Option one", value: "option-one" },
        { id: createId("opt"), label: "Option two", value: "option-two" },
      ],
    };
  }

  if (type === "radio") {
    return {
      ...base,
      options: [
        { id: createId("opt"), label: "Choice A", value: "choice-a" },
        { id: createId("opt"), label: "Choice B", value: "choice-b" },
      ],
    };
  }

  return base;
};

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

const initialForm = cloneTemplate(primaryTemplate);

export const useBuilderStore = create<BuilderState>((set) => ({
  // ── Initial state ───────────────────────────
  form: initialForm,
  selectedFieldId: initialForm.fields[0]?.id ?? null,
  previewFieldValues: buildPreviewFieldValues(initialForm),
  previewMode: false,
  viewportMode: "desktop",
  analysisResult: resolveAnalysis(initialForm),

  // ── Form-level actions ──────────────────────

  setForm: (form) => set(buildStateFromForm(form, { previewMode: false })),

  loadTemplate: (template) => {
    const form = cloneTemplate(template);
    set(buildStateFromForm(form));
  },

  resetToPrimaryTemplate: () => {
    const form = cloneTemplate(templates[0]);
    set(buildStateFromForm(form));
  },

  // ── Field selection ─────────────────────────

  selectField: (fieldId) => set({ selectedFieldId: fieldId }),

  // ── Field mutations ─────────────────────────

  addField: (type) =>
    set((state) => {
      const newField = fieldFactory(type);
      const form: FormDefinition = {
        ...state.form,
        fields: [...state.form.fields, newField],
      };
      return {
        form,
        selectedFieldId: newField.id,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  insertField: (type, index) =>
    set((state) => {
      const newField = fieldFactory(type);
      const nextIndex =
        typeof index === "number"
          ? Math.max(0, Math.min(index, state.form.fields.length))
          : state.form.fields.length;
      const fields = [...state.form.fields];
      fields.splice(nextIndex, 0, newField);

      const form: FormDefinition = {
        ...state.form,
        fields,
      };

      return {
        form,
        selectedFieldId: newField.id,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  updateField: (fieldId, patch) =>
    set((state) => {
      const form: FormDefinition = {
        ...state.form,
        fields: state.form.fields.map((field) =>
          field.id === fieldId ? { ...field, ...patch } : field,
        ),
      };
      return {
        form,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  deleteField: (fieldId) =>
    set((state) => {
      const deletedIndex = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (deletedIndex < 0) {
        return state;
      }

      const nextFields = state.form.fields.filter(
        (field) => field.id !== fieldId,
      );
      const form: FormDefinition = { ...state.form, fields: nextFields };

      const nextSelectedFieldId =
        state.selectedFieldId !== fieldId
          ? state.selectedFieldId
          : (nextFields[deletedIndex]?.id ??
            nextFields[deletedIndex - 1]?.id ??
            nextFields[0]?.id ??
            null);

      return {
        form,
        selectedFieldId: nextSelectedFieldId,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  duplicateField: (fieldId) =>
    set((state) => {
      const index = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (index < 0) return state;

      const source = state.form.fields[index];
      const duplicate: FormField = {
        ...source,
        id: createId("field"),
        label: `${source.label} copy`,
        options: source.options?.map((option) => ({
          ...option,
          id: createId("opt"),
        })),
      };

      const fields = [...state.form.fields];
      fields.splice(index + 1, 0, duplicate);

      const form: FormDefinition = { ...state.form, fields };
      return {
        form,
        selectedFieldId: duplicate.id,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  moveField: (fieldId, direction) =>
    set((state) => {
      const index = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (index < 0) return state;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.form.fields.length) {
        return state;
      }

      const fields = [...state.form.fields];
      const [item] = fields.splice(index, 1);
      fields.splice(targetIndex, 0, item);

      const form: FormDefinition = { ...state.form, fields };
      return {
        form,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  reorderFields: (activeFieldId, overFieldId) =>
    set((state) => {
      if (activeFieldId === overFieldId) {
        return state;
      }

      const activeIndex = state.form.fields.findIndex(
        (field) => field.id === activeFieldId,
      );
      const overIndex = state.form.fields.findIndex(
        (field) => field.id === overFieldId,
      );

      if (activeIndex < 0 || overIndex < 0) {
        return state;
      }

      const fields = [...state.form.fields];
      const [movedField] = fields.splice(activeIndex, 1);
      fields.splice(overIndex, 0, movedField);

      const form: FormDefinition = { ...state.form, fields };
      return {
        form,
        previewFieldValues: syncPreviewFieldValues(
          form,
          state.previewFieldValues,
        ),
        analysisResult: analyzeForm(form),
      };
    }),

  // ── Preview value actions ───────────────────

  setPreviewFieldValue: (fieldId, value) =>
    set((state) => ({
      previewFieldValues: {
        ...state.previewFieldValues,
        [fieldId]: value,
      },
    })),

  resetPreviewFieldValues: () =>
    set((state) => ({
      previewFieldValues: buildPreviewFieldValues(state.form),
    })),

  // ── UI mode actions ─────────────────────────

  togglePreviewMode: () =>
    set((state) => ({ previewMode: !state.previewMode })),

  setPreviewMode: (active) => set({ previewMode: active }),

  setViewportMode: (mode: "desktop" | "mobile") => set({ viewportMode: mode }),
}));
