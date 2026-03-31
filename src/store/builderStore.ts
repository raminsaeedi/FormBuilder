import { create } from "zustand";
import { primaryTemplate, templates } from "../data/mockForm";
import { mockAnalysisByTemplateId } from "../data/mockAnalysis";
import {
  AnalysisResult,
  CheckboxFormField,
  FieldOption,
  FieldType,
  FormDefinition,
  FormField,
  PreviewFieldState,
  PreviewFieldValue,
  RadioFormField,
  SelectFormField,
  TextLikeFormField,
} from "../types/form";
import { analyzeForm } from "../utils/analysis";

export type FieldPatch = Partial<
  Pick<
    FormField,
    "label" | "placeholder" | "helpText" | "required" | "width"
  > & {
    options: FieldOption[];
  }
>;

interface BuilderState {
  form: FormDefinition;
  selectedFieldId: string | null;
  previewFieldValues: PreviewFieldState;
  previewMode: boolean;
  viewportMode: "desktop" | "mobile";
  analysisResult: AnalysisResult;
  setForm: (form: FormDefinition) => void;
  loadTemplate: (template: FormDefinition) => void;
  resetToPrimaryTemplate: () => void;
  selectField: (fieldId: string | null) => void;
  addField: (type: FieldType, index?: number) => void;
  moveField: (fieldId: string, toIndex: number) => void;
  removeField: (fieldId: string) => void;
  updateField: (fieldId: string, patch: FieldPatch) => void;
  duplicateField: (fieldId: string) => void;
  setPreviewFieldValue: (fieldId: string, value: PreviewFieldValue) => void;
  resetPreviewFieldValues: () => void;
  togglePreviewMode: () => void;
  setPreviewMode: (active: boolean) => void;
  setViewportMode: (mode: "desktop" | "mobile") => void;
}

const cloneFieldOptions = (options: FieldOption[]): FieldOption[] =>
  options.map((option) => ({ ...option }));

const isOptionField = (
  field: FormField,
): field is SelectFormField | RadioFormField =>
  field.type === "select" || field.type === "radio";

const cloneField = (field: FormField): FormField => {
  if (isOptionField(field)) {
    return {
      ...field,
      options: cloneFieldOptions(field.options),
    };
  }

  return { ...field };
};

const cloneTemplate = (template: FormDefinition): FormDefinition => ({
  ...template,
  fields: template.fields.map(cloneField),
});

const createId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const getDefaultPreviewValue = (field: FormField): PreviewFieldValue =>
  field.type === "checkbox" ? false : "";

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

const resolveAnalysis = (form: FormDefinition): AnalysisResult => {
  const mock = mockAnalysisByTemplateId[form.id];
  if (mock) return mock;
  return analyzeForm(form);
};

const buildStateFromForm = (
  form: FormDefinition,
  overrides?: Partial<
    Pick<
      BuilderState,
      "selectedFieldId" | "previewMode" | "previewFieldValues" | "viewportMode"
    >
  >,
) => ({
  form,
  selectedFieldId: overrides?.selectedFieldId ?? form.fields[0]?.id ?? null,
  previewMode: overrides?.previewMode ?? false,
  viewportMode: overrides?.viewportMode ?? "desktop",
  previewFieldValues:
    overrides?.previewFieldValues ?? buildPreviewFieldValues(form),
  analysisResult: resolveAnalysis(form),
});

const createFieldBase = (type: FieldType) => {
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

  return {
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
  } as const;
};

const fieldFactory = (type: FieldType): FormField => {
  const base = createFieldBase(type);

  if (type === "select") {
    const field: SelectFormField = {
      ...base,
      type,
      options: [
        { id: createId("opt"), label: "Option one", value: "option-one" },
        { id: createId("opt"), label: "Option two", value: "option-two" },
      ],
    };

    return field;
  }

  if (type === "radio") {
    const field: RadioFormField = {
      ...base,
      type,
      options: [
        { id: createId("opt"), label: "Choice A", value: "choice-a" },
        { id: createId("opt"), label: "Choice B", value: "choice-b" },
      ],
    };

    return field;
  }

  if (type === "checkbox") {
    const field: CheckboxFormField = {
      ...base,
      type,
    };

    return field;
  }

  const field: TextLikeFormField = {
    ...base,
    type,
  };

  return field;
};

const duplicateFieldDefinition = (field: FormField): FormField => {
  const duplicatedId = createId("field");

  if (isOptionField(field)) {
    return {
      ...field,
      id: duplicatedId,
      label: `${field.label} copy`,
      options: field.options.map((option) => ({
        ...option,
        id: createId("opt"),
      })),
    };
  }

  return {
    ...field,
    id: duplicatedId,
    label: `${field.label} copy`,
  };
};

const applyFieldPatch = (field: FormField, patch: FieldPatch): FormField => {
  if (isOptionField(field)) {
    const nextField: SelectFormField | RadioFormField = {
      ...field,
      ...patch,
      options: patch.options
        ? cloneFieldOptions(patch.options)
        : cloneFieldOptions(field.options),
    };

    return nextField;
  }

  return {
    ...field,
    ...patch,
  } as TextLikeFormField | CheckboxFormField;
};

const moveArrayItem = <T>(items: T[], fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const buildMutationResult = (
  state: BuilderState,
  form: FormDefinition,
  overrides?: Partial<
    Pick<BuilderState, "selectedFieldId" | "previewFieldValues">
  >,
) => ({
  form,
  selectedFieldId: overrides?.selectedFieldId ?? state.selectedFieldId,
  previewFieldValues:
    overrides?.previewFieldValues ??
    syncPreviewFieldValues(form, state.previewFieldValues),
  analysisResult: analyzeForm(form),
});

const clampIndex = (index: number, maxIndex: number) =>
  Math.max(0, Math.min(index, maxIndex));

const createFormWithInsertedField = (
  form: FormDefinition,
  field: FormField,
  index?: number,
): FormDefinition => {
  const nextFields = [...form.fields];
  const insertionIndex =
    typeof index === "number"
      ? clampIndex(index, nextFields.length)
      : nextFields.length;

  nextFields.splice(insertionIndex, 0, field);

  return {
    ...form,
    fields: nextFields,
  };
};

const getNextSelectedFieldIdAfterRemoval = (
  fields: FormField[],
  removedIndex: number,
  currentSelectedFieldId: string | null,
  removedFieldId: string,
) => {
  if (currentSelectedFieldId !== removedFieldId) {
    return currentSelectedFieldId;
  }

  return (
    fields[removedIndex]?.id ??
    fields[removedIndex - 1]?.id ??
    fields[0]?.id ??
    null
  );
};

const initialForm = cloneTemplate(primaryTemplate);

export const useBuilderStore = create<BuilderState>((set) => ({
  form: initialForm,
  selectedFieldId: initialForm.fields[0]?.id ?? null,
  previewFieldValues: buildPreviewFieldValues(initialForm),
  previewMode: false,
  viewportMode: "desktop",
  analysisResult: resolveAnalysis(initialForm),

  setForm: (form) =>
    set(
      buildStateFromForm(form, {
        previewMode: false,
      }),
    ),

  loadTemplate: (template) => {
    const form = cloneTemplate(template);
    set(buildStateFromForm(form));
  },

  resetToPrimaryTemplate: () => {
    const form = cloneTemplate(templates[0]);
    set(buildStateFromForm(form));
  },

  selectField: (fieldId) => set({ selectedFieldId: fieldId }),

  addField: (type, index) =>
    set((state) => {
      const newField = fieldFactory(type);
      const form = createFormWithInsertedField(state.form, newField, index);

      return buildMutationResult(state, form, {
        selectedFieldId: newField.id,
      });
    }),

  moveField: (fieldId, toIndex) =>
    set((state) => {
      const fromIndex = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (fromIndex < 0) {
        return state;
      }

      const nextIndex = clampIndex(toIndex, state.form.fields.length - 1);
      if (fromIndex === nextIndex) {
        return state;
      }

      const form: FormDefinition = {
        ...state.form,
        fields: moveArrayItem(state.form.fields, fromIndex, nextIndex),
      };

      return buildMutationResult(state, form, {
        selectedFieldId: fieldId,
      });
    }),

  removeField: (fieldId) =>
    set((state) => {
      const removedIndex = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (removedIndex < 0) {
        return state;
      }

      const nextFields = state.form.fields.filter(
        (field) => field.id !== fieldId,
      );
      const form: FormDefinition = {
        ...state.form,
        fields: nextFields,
      };

      return buildMutationResult(state, form, {
        selectedFieldId: getNextSelectedFieldIdAfterRemoval(
          nextFields,
          removedIndex,
          state.selectedFieldId,
          fieldId,
        ),
      });
    }),

  updateField: (fieldId, patch) =>
    set((state) => {
      const form: FormDefinition = {
        ...state.form,
        fields: state.form.fields.map((field) =>
          field.id === fieldId ? applyFieldPatch(field, patch) : field,
        ),
      };

      return buildMutationResult(state, form);
    }),

  duplicateField: (fieldId) =>
    set((state) => {
      const index = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (index < 0) {
        return state;
      }

      const duplicate = duplicateFieldDefinition(state.form.fields[index]);
      const form = createFormWithInsertedField(
        state.form,
        duplicate,
        index + 1,
      );

      return buildMutationResult(state, form, {
        selectedFieldId: duplicate.id,
      });
    }),

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

  togglePreviewMode: () =>
    set((state) => ({ previewMode: !state.previewMode })),

  setPreviewMode: (active) => set({ previewMode: active }),

  setViewportMode: (mode) => set({ viewportMode: mode }),
}));
