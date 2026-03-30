export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea";

export type FieldWidth = "full" | "half";

export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  helpText: string;
  required: boolean;
  width: FieldWidth;
  options?: FieldOption[];
}

export interface FormDefinition {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
}

export type WarningSeverity = "info" | "warning" | "critical";

export interface UxWarning {
  id: string;
  fieldId?: string;
  severity: WarningSeverity;
  title: string;
  description: string;
  recommendation: string;
}

export interface AnalysisResult {
  score: number;
  warnings: UxWarning[];
  summary: {
    requiredFields: number;
    optionalFields: number;
    longLabels: number;
  };
}

export interface FieldCatalogItem {
  type: FieldType;
  title: string;
  description: string;
  category: "Basic" | "Choice";
}
