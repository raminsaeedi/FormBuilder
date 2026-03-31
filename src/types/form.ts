// ─────────────────────────────────────────────
// Primitive Enumerations
// ─────────────────────────────────────────────

/** All supported input field types in the builder. */
export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "password"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea";

/** Column width of a field inside the form grid. */
export type FieldWidth = "full" | "half";

/** Severity level of a UX issue — drives color coding in the UI. */
export type IssueSeverity = "info" | "warning" | "critical";

/**
 * @deprecated Use `IssueSeverity` instead.
 * Kept for backwards compatibility with existing store and analysis code.
 */
export type WarningSeverity = IssueSeverity;

// ─────────────────────────────────────────────
// Field-level Models
// ─────────────────────────────────────────────

/** A single selectable option inside a `select` or `radio` field. */
export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

/** A single form field with all editable properties. */
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  helpText: string;
  required: boolean;
  width: FieldWidth;
  /** Only present for `select` and `radio` field types. */
  options?: FieldOption[];
}

export type PreviewScalarFieldType = Exclude<FieldType, "checkbox">;
export type PreviewFieldValue = string | number | boolean;
export type PreviewFieldState = Record<string, PreviewFieldValue>;

// ─────────────────────────────────────────────
// Section Model (optional grouping layer)
// ─────────────────────────────────────────────

/**
 * An optional grouping of fields within a form.
 * Useful for multi-step or visually separated form regions.
 * Not required for MVP — include when the form has more than ~6 fields.
 */
export interface FormSection {
  id: string;
  title: string;
  /** Short description shown above the section in the preview. */
  description?: string;
  fields: FormField[];
}

// ─────────────────────────────────────────────
// Form Definition
// ─────────────────────────────────────────────

/**
 * The top-level form document.
 * For MVP: uses a flat `fields` array.
 * For future: swap `fields` for `sections: FormSection[]`.
 */
export interface FormDefinition {
  id: string;
  name: string;
  description: string;
  /** Flat field list — the primary structure for the MVP builder. */
  fields: FormField[];
  /**
   * Optional section grouping for more complex forms.
   * When present, `fields` should be treated as a flattened view.
   */
  sections?: FormSection[];
}

// ─────────────────────────────────────────────
// UX Analysis Models
// ─────────────────────────────────────────────

/**
 * A single UX issue detected by the heuristic analysis engine.
 * Replaces the previous `UxWarning` name for clarity.
 */
export interface UxIssue {
  id: string;
  /** Links the issue to a specific field, or `undefined` for form-level issues. */
  fieldId?: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
}

/**
 * @deprecated Use `UxIssue` instead.
 * Kept for backwards compatibility with existing store and analysis code.
 */
export type UxWarning = UxIssue;

/**
 * Aggregated statistics about the current form structure.
 * Displayed as summary chips in the UX Analysis panel.
 */
export interface ScoreSummary {
  /** Total number of fields marked as required. */
  requiredFields: number;
  /** Total number of fields not marked as required. */
  optionalFields: number;
  /** Number of field labels exceeding the recommended character length. */
  longLabels: number;
  /** Total number of fields in the form. */
  totalFields: number;
}

/**
 * The full result returned by `analyzeForm()`.
 * Drives the UX Analysis panel display.
 */
export interface AnalysisResult {
  /** Clarity score from 0–100. Higher is better. */
  score: number;
  /** List of detected UX issues, ordered by severity. */
  issues: UxIssue[];
  /** Aggregated field statistics. */
  summary: ScoreSummary;
  /**
   * @deprecated Use `issues` instead.
   * Kept for backwards compatibility with existing analysis and panel code.
   */
  warnings: UxIssue[];
}

// ─────────────────────────────────────────────
// Field Catalog (Library sidebar)
// ─────────────────────────────────────────────

/** Category grouping for the field library sidebar. */
export type FieldCategory = "Basic" | "Choice";

/** A single entry in the field type catalog shown in the FieldLibrary panel. */
export interface FieldCatalogItem {
  type: FieldType;
  title: string;
  description: string;
  category: FieldCategory;
}
