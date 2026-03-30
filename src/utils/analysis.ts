import {
  AnalysisResult,
  FormDefinition,
  FormField,
  UxWarning,
} from "../types/form";

const createWarning = (warning: UxWarning): UxWarning => warning;

const hasSparseHelpText = (field: FormField) =>
  (field.type === "phone" ||
    field.type === "email" ||
    field.type === "select") &&
  !field.helpText.trim();

export const analyzeForm = (form: FormDefinition): AnalysisResult => {
  const warnings: UxWarning[] = [];
  const requiredFields = form.fields.filter((field) => field.required).length;
  const optionalFields = form.fields.length - requiredFields;
  const longLabels = form.fields.filter(
    (field) => field.label.trim().length > 28,
  ).length;

  if (requiredFields >= 4) {
    warnings.push(
      createWarning({
        id: "required-load",
        severity: "warning",
        title: "High required-field load",
        description:
          "This form already asks for many mandatory inputs for a first interaction.",
        recommendation:
          "Reduce required fields or move lower-priority questions later in the flow.",
      }),
    );
  }

  form.fields.forEach((field) => {
    if (!field.label.trim()) {
      warnings.push(
        createWarning({
          id: `missing-label-${field.id}`,
          fieldId: field.id,
          severity: "critical",
          title: "Missing field label",
          description:
            "The field relies on placeholder text without a clear persistent label.",
          recommendation:
            "Add a concise visible label to improve comprehension and accessibility.",
        }),
      );
    }

    if (field.label.trim().length > 28) {
      warnings.push(
        createWarning({
          id: `long-label-${field.id}`,
          fieldId: field.id,
          severity: "info",
          title: "Label is longer than ideal",
          description:
            "Long labels increase scan time and can make form rows feel visually heavy.",
          recommendation:
            "Shorten the label and move supporting detail into helper text.",
        }),
      );
    }

    if (
      field.placeholder.trim() &&
      field.placeholder.trim() === field.label.trim()
    ) {
      warnings.push(
        createWarning({
          id: `placeholder-repeats-${field.id}`,
          fieldId: field.id,
          severity: "info",
          title: "Placeholder repeats label",
          description:
            "The placeholder does not add extra guidance beyond the visible label.",
          recommendation:
            "Use example content or remove the placeholder to reduce noise.",
        }),
      );
    }

    if (hasSparseHelpText(field)) {
      warnings.push(
        createWarning({
          id: `missing-help-${field.id}`,
          fieldId: field.id,
          severity: "warning",
          title: "Helpful guidance is missing",
          description:
            "Users may benefit from extra context for this field type.",
          recommendation:
            "Add a short helper line to explain format, purpose or expectations.",
        }),
      );
    }

    if (
      (field.type === "select" || field.type === "radio") &&
      (!field.options || field.options.length < 2)
    ) {
      warnings.push(
        createWarning({
          id: `insufficient-options-${field.id}`,
          fieldId: field.id,
          severity: "critical",
          title: "Choice field has too few options",
          description:
            "The current configuration is not sufficient for a meaningful user decision.",
          recommendation: "Add at least two options with clear labels.",
        }),
      );
    }
  });

  const criticalCount = warnings.filter(
    (warning) => warning.severity === "critical",
  ).length;
  const warningCount = warnings.filter(
    (warning) => warning.severity === "warning",
  ).length;
  const infoCount = warnings.filter(
    (warning) => warning.severity === "info",
  ).length;

  const score = Math.max(
    38,
    100 - criticalCount * 18 - warningCount * 9 - infoCount * 4,
  );

  return {
    score,
    issues: warnings,
    warnings,
    summary: {
      requiredFields,
      optionalFields,
      longLabels,
      totalFields: form.fields.length,
    },
  };
};
