import { create } from "zustand";
import { primaryTemplate, templates } from "../data/mockForm";
import { FieldType, FormDefinition, FormField } from "../types/form";

interface BuilderState {
  form: FormDefinition;
  selectedFieldId: string | null;
  loadTemplate: (template: FormDefinition) => void;
  resetToPrimaryTemplate: () => void;
  selectField: (fieldId: string | null) => void;
  addField: (type: FieldType) => void;
  updateField: (fieldId: string, patch: Partial<FormField>) => void;
  deleteField: (fieldId: string) => void;
  duplicateField: (fieldId: string) => void;
  moveField: (fieldId: string, direction: "up" | "down") => void;
}

const cloneTemplate = (template: FormDefinition): FormDefinition => ({
  ...template,
  fields: template.fields.map((field) => ({
    ...field,
    options: field.options?.map((option) => ({ ...option })),
  })),
});

const createId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const fieldFactory = (type: FieldType): FormField => {
  const base: FormField = {
    id: createId("field"),
    type,
    label:
      type === "textarea"
        ? "Additional details"
        : type === "email"
          ? "Email address"
          : type === "phone"
            ? "Phone number"
            : type === "checkbox"
              ? "I agree to the terms"
              : type === "radio"
                ? "Preferred option"
                : type === "select"
                  ? "Select option"
                  : "Text field",
    placeholder:
      type === "email"
        ? "name@company.com"
        : type === "phone"
          ? "+49 123 456789"
          : type === "textarea"
            ? "Enter additional context"
            : type === "checkbox" || type === "radio"
              ? ""
              : "Enter a value",
    helpText:
      type === "phone"
        ? "Include country code when relevant."
        : type === "checkbox"
          ? "Optional acknowledgement control."
          : "Short helper text for this field.",
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

export const useBuilderStore = create<BuilderState>((set) => ({
  form: cloneTemplate(primaryTemplate),
  selectedFieldId: primaryTemplate.fields[0]?.id ?? null,
  loadTemplate: (template) =>
    set({
      form: cloneTemplate(template),
      selectedFieldId: template.fields[0]?.id ?? null,
    }),
  resetToPrimaryTemplate: () =>
    set({
      form: cloneTemplate(templates[0]),
      selectedFieldId: templates[0].fields[0]?.id ?? null,
    }),
  selectField: (fieldId) => set({ selectedFieldId: fieldId }),
  addField: (type) =>
    set((state) => {
      const newField = fieldFactory(type);
      return {
        form: {
          ...state.form,
          fields: [...state.form.fields, newField],
        },
        selectedFieldId: newField.id,
      };
    }),
  updateField: (fieldId, patch) =>
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                ...patch,
              }
            : field,
        ),
      },
    })),
  deleteField: (fieldId) =>
    set((state) => {
      const nextFields = state.form.fields.filter(
        (field) => field.id !== fieldId,
      );
      return {
        form: { ...state.form, fields: nextFields },
        selectedFieldId: nextFields[0]?.id ?? null,
      };
    }),
  duplicateField: (fieldId) =>
    set((state) => {
      const index = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (index < 0) {
        return state;
      }

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

      return {
        form: { ...state.form, fields },
        selectedFieldId: duplicate.id,
      };
    }),
  moveField: (fieldId, direction) =>
    set((state) => {
      const index = state.form.fields.findIndex(
        (field) => field.id === fieldId,
      );
      if (index < 0) {
        return state;
      }

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.form.fields.length) {
        return state;
      }

      const fields = [...state.form.fields];
      const [item] = fields.splice(index, 1);
      fields.splice(targetIndex, 0, item);

      return {
        form: { ...state.form, fields },
      };
    }),
}));
