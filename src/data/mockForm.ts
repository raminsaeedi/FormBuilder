import { FormDefinition } from "../types/form";

// ─────────────────────────────────────────────
// Template 1 — Account Signup (clean, MVP-ready)
// UX score: ~84  |  Issues: 0 critical, 1 warning, 1 info
// ─────────────────────────────────────────────
const signupTemplate: FormDefinition = {
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
        { id: "size-1", label: "1–10 employees", value: "1-10" },
        { id: "size-2", label: "11–50 employees", value: "11-50" },
        { id: "size-3", label: "51–200 employees", value: "51-200" },
        { id: "size-4", label: "200+ employees", value: "200+" },
      ],
    },
    {
      id: "field-role",
      type: "radio",
      label: "Your role",
      placeholder: "",
      helpText: "Helps us show the most relevant features first.",
      required: false,
      width: "half",
      options: [
        { id: "role-1", label: "Developer", value: "developer" },
        { id: "role-2", label: "Designer", value: "designer" },
        { id: "role-3", label: "Product manager", value: "pm" },
        { id: "role-4", label: "Other", value: "other" },
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
      label: "I agree to receive product updates and tips",
      placeholder: "",
      helpText: "You can opt out at any time from your account settings.",
      required: false,
      width: "full",
    },
  ],
};

// ─────────────────────────────────────────────
// Template 2 — Checkout Contact Step
// UX score: ~55  |  Issues: 1 critical, 2 warnings, 1 info
// Intentional UX problems:
//   • Long label on email field (>28 chars)
//   • Missing helpText on email, phone, country
//   • 4 required fields (high required-field load)
// ─────────────────────────────────────────────
const checkoutTemplate: FormDefinition = {
  id: "template-checkout",
  name: "Checkout contact step",
  description:
    "A lean commerce checkout form with a few realistic pain points.",
  fields: [
    {
      id: "checkout-email",
      type: "email",
      // ⚠ intentional: label > 28 chars → "Label is longer than ideal"
      label: "Email address for order confirmations",
      placeholder: "Email address",
      // ⚠ intentional: missing helpText on email → "Helpful guidance is missing"
      helpText: "",
      required: true,
      width: "half",
    },
    {
      id: "checkout-phone",
      type: "phone",
      label: "Phone number",
      placeholder: "Add phone number",
      // ⚠ intentional: missing helpText on phone → "Helpful guidance is missing"
      helpText: "",
      required: true,
      width: "half",
    },
    {
      id: "checkout-country",
      type: "select",
      label: "Country",
      placeholder: "Select country",
      // ⚠ intentional: missing helpText on select → "Helpful guidance is missing"
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
        { id: "delivery-1", label: "Standard (3–5 days)", value: "standard" },
        { id: "delivery-2", label: "Express (1–2 days)", value: "express" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Template 3 — Support Ticket Form (UX stress test)
// UX score: ~38  |  Issues: 2 critical, 2 warnings, 2 info
// Intentional UX problems:
//   • Missing label on one field → critical
//   • Placeholder repeats label on two fields → info
//   • 5 required fields → warning (high load)
//   • Long label on priority field → info
//   • Missing helpText on email → warning
// ─────────────────────────────────────────────
const supportTemplate: FormDefinition = {
  id: "template-support",
  name: "Support ticket form",
  description:
    "A realistic support request form — intentionally contains UX issues for demo purposes.",
  fields: [
    {
      id: "support-name",
      type: "text",
      label: "Full name",
      placeholder: "Full name",
      // ⚠ intentional: placeholder === label → "Placeholder repeats label"
      helpText: "So our team knows who to contact.",
      required: true,
      width: "half",
    },
    {
      id: "support-email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      // ⚠ intentional: placeholder === label → "Placeholder repeats label"
      // ⚠ intentional: missing helpText on email → "Helpful guidance is missing"
      helpText: "",
      required: true,
      width: "half",
    },
    {
      id: "support-subject",
      type: "text",
      // ⚠ intentional: empty label → "Missing field label" (critical)
      label: "",
      placeholder: "Subject line of your request",
      helpText: "",
      required: true,
      width: "full",
    },
    {
      id: "support-priority",
      type: "select",
      // ⚠ intentional: label > 28 chars → "Label is longer than ideal"
      label: "How urgent is this issue for your team?",
      placeholder: "Select priority level",
      helpText: "We use this to route your ticket to the right queue.",
      required: true,
      width: "half",
      options: [
        { id: "prio-1", label: "Low — can wait a few days", value: "low" },
        { id: "prio-2", label: "Medium — affects my work", value: "medium" },
        { id: "prio-3", label: "High — blocking me now", value: "high" },
      ],
    },
    {
      id: "support-category",
      type: "radio",
      label: "Issue category",
      placeholder: "",
      helpText: "Pick the area that best describes your problem.",
      required: true,
      width: "half",
      options: [
        { id: "cat-1", label: "Billing", value: "billing" },
        { id: "cat-2", label: "Technical", value: "technical" },
        { id: "cat-3", label: "Account access", value: "account" },
      ],
    },
    {
      id: "support-description",
      type: "textarea",
      label: "Describe the issue",
      placeholder: "Include steps to reproduce, screenshots or error messages",
      helpText: "The more detail you provide, the faster we can help.",
      required: true,
      width: "full",
    },
    {
      id: "support-consent",
      type: "checkbox",
      label: "Allow our team to access my account for diagnostics",
      placeholder: "",
      helpText: "Access is read-only and limited to 48 hours.",
      required: false,
      width: "full",
    },
  ],
};

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export const templates: FormDefinition[] = [
  signupTemplate,
  checkoutTemplate,
  supportTemplate,
];

export const primaryTemplate = templates[0];
