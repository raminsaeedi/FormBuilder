import { FieldCatalogItem } from "../types/form";

export const fieldCatalog: FieldCatalogItem[] = [
  {
    type: "text",
    title: "Text input",
    description: "Short free-text answer for names, titles or company details.",
    category: "Basic",
  },
  {
    type: "email",
    title: "Email",
    description: "Dedicated email field with familiar expectations.",
    category: "Basic",
  },
  {
    type: "phone",
    title: "Phone",
    description: "Contact number field with formatting guidance.",
    category: "Basic",
  },
  {
    type: "textarea",
    title: "Textarea",
    description: "Long-form response area for notes and explanations.",
    category: "Basic",
  },
  {
    type: "select",
    title: "Select",
    description: "Single selection from a compact list of options.",
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
