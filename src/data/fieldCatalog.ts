import { FieldCatalogItem } from "../types/form";

export const fieldCatalog: FieldCatalogItem[] = [
  // ── Basic ──────────────────────────────────
  {
    type: "text",
    title: "Text input",
    description: "Short free-text answer for names, titles or company details.",
    category: "Basic",
  },
  {
    type: "email",
    title: "Email",
    description: "Dedicated email field with format validation hint.",
    category: "Basic",
  },
  {
    type: "phone",
    title: "Phone",
    description: "Contact number field with formatting guidance.",
    category: "Basic",
  },
  {
    type: "password",
    title: "Password",
    description: "Masked input for credentials or secret values.",
    category: "Basic",
  },
  {
    type: "number",
    title: "Number",
    description: "Numeric-only input for quantities, ages or amounts.",
    category: "Basic",
  },
  {
    type: "date",
    title: "Date",
    description: "Calendar date picker for scheduling or date-of-birth.",
    category: "Basic",
  },
  {
    type: "textarea",
    title: "Textarea",
    description: "Long-form response area for notes and explanations.",
    category: "Basic",
  },
  // ── Choice ─────────────────────────────────
  {
    type: "select",
    title: "Select",
    description: "Single selection from a compact dropdown list.",
    category: "Choice",
  },
  {
    type: "radio",
    title: "Radio group",
    description: "Visible single-choice options for quick scanning.",
    category: "Choice",
  },
  {
    type: "checkbox",
    title: "Checkbox",
    description: "Binary agreement or opt-in control.",
    category: "Choice",
  },
];
