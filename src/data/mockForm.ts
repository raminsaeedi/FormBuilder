import { FormDefinition } from "../types/form";

export const templates: FormDefinition[] = [
  {
    id: "template-signup",
    name: "Account signup flow",
    description: "A compact onboarding form for SaaS account creation.",
    fields: [
      {
        id: "field-full-name",
        type: "text",
        label: "Full name",
        placeholder: "Enter your full name",
        helpText: "Use the name shown on your team account.",
        required: true,
        width: "half",
      },
      {
        id: "field-work-email",
        type: "email",
        label: "Work email",
        placeholder: "name@company.com",
        helpText: "We will send your setup instructions here.",
        required: true,
        width: "half",
      },
      {
        id: "field-company-size",
        type: "select",
        label: "Company size",
        placeholder: "Select company size",
        helpText: "Helps us personalize the first-run experience.",
        required: false,
        width: "half",
        options: [
          { id: "size-1", label: "1-10", value: "1-10" },
          { id: "size-2", label: "11-50", value: "11-50" },
          { id: "size-3", label: "51-200", value: "51-200" },
        ],
      },
      {
        id: "field-use-case",
        type: "textarea",
        label: "Primary use case",
        placeholder: "Describe what you want to achieve",
        helpText: "Optional, but useful for faster onboarding.",
        required: false,
        width: "full",
      },
      {
        id: "field-consent",
        type: "checkbox",
        label: "I agree to product updates",
        placeholder: "",
        helpText: "You can opt out at any time.",
        required: false,
        width: "full",
      },
    ],
  },
  {
    id: "template-checkout",
    name: "Checkout contact step",
    description:
      "A lean commerce checkout form with a few realistic pain points.",
    fields: [
      {
        id: "checkout-email",
        type: "email",
        label: "Email address for order confirmations",
        placeholder: "Email address",
        helpText: "",
        required: true,
        width: "half",
      },
      {
        id: "checkout-phone",
        type: "phone",
        label: "Phone number",
        placeholder: "Add phone number",
        helpText: "",
        required: true,
        width: "half",
      },
      {
        id: "checkout-country",
        type: "select",
        label: "Country",
        placeholder: "Select country",
        helpText: "",
        required: true,
        width: "half",
        options: [
          { id: "country-1", label: "Germany", value: "de" },
          { id: "country-2", label: "Austria", value: "at" },
          { id: "country-3", label: "Switzerland", value: "ch" },
        ],
      },
      {
        id: "checkout-delivery",
        type: "radio",
        label: "Delivery method",
        placeholder: "",
        helpText: "Choose a preferred shipping speed.",
        required: true,
        width: "full",
        options: [
          { id: "delivery-1", label: "Standard", value: "standard" },
          { id: "delivery-2", label: "Express", value: "express" },
        ],
      },
    ],
  },
];

export const primaryTemplate = templates[0];
