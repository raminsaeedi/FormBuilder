import { AnalysisResult } from "../types/form";

// ─────────────────────────────────────────────
// Static mock analysis results for UI demo purposes.
// These mirror what `analyzeForm()` would produce for each template,
// but are hardcoded so the UI can be shown without running the engine.
// ─────────────────────────────────────────────

/**
 * Analysis result for Template 1 — "Account signup flow"
 * Clean form: only minor issues, high score.
 */
export const signupAnalysis: AnalysisResult = {
  score: 84,
  issues: [
    {
      id: "mock-signup-w1",
      severity: "warning",
      title: "High required-field load",
      description:
        "Two required fields is acceptable, but adding more will increase drop-off risk.",
      recommendation:
        "Keep required fields to the minimum needed for account creation.",
    },
    {
      id: "mock-signup-i1",
      fieldId: "field-consent",
      severity: "info",
      title: "Label is longer than ideal",
      description:
        "The checkbox label exceeds 28 characters, which can slow scanning.",
      recommendation:
        "Shorten to 'I agree to product updates' and move detail to help text.",
    },
  ],
  warnings: [], // deprecated alias — kept for compatibility
  summary: {
    requiredFields: 2,
    optionalFields: 4,
    longLabels: 1,
    totalFields: 6,
  },
};

/**
 * Analysis result for Template 2 — "Checkout contact step"
 * Medium-quality form: missing help texts, long label, high required load.
 */
export const checkoutAnalysis: AnalysisResult = {
  score: 55,
  issues: [
    {
      id: "mock-checkout-c1",
      fieldId: "checkout-email",
      severity: "critical",
      title: "Missing field label",
      description:
        "The email field relies on placeholder text without a persistent visible label.",
      recommendation:
        "Add a concise label above the input to improve accessibility and comprehension.",
    },
    {
      id: "mock-checkout-w1",
      severity: "warning",
      title: "High required-field load",
      description:
        "All 4 fields are required, which creates friction at the first checkout step.",
      recommendation:
        "Make phone number optional or move it to a later step in the flow.",
    },
    {
      id: "mock-checkout-w2",
      fieldId: "checkout-phone",
      severity: "warning",
      title: "Helpful guidance is missing",
      description:
        "The phone field has no helper text explaining expected format or country code.",
      recommendation:
        "Add a short helper line such as 'Include country code, e.g. +49 123 456789'.",
    },
    {
      id: "mock-checkout-i1",
      fieldId: "checkout-email",
      severity: "info",
      title: "Label is longer than ideal",
      description:
        "'Email address for order confirmations' is 38 characters — too long for a compact form.",
      recommendation: "Shorten to 'Email' or 'Order confirmation email'.",
    },
  ],
  warnings: [], // deprecated alias — kept for compatibility
  summary: {
    requiredFields: 4,
    optionalFields: 0,
    longLabels: 1,
    totalFields: 4,
  },
};

/**
 * Analysis result for Template 3 — "Support ticket form"
 * Stress-test form: multiple critical issues, lowest score.
 */
export const supportAnalysis: AnalysisResult = {
  score: 38,
  issues: [
    {
      id: "mock-support-c1",
      fieldId: "support-subject",
      severity: "critical",
      title: "Missing field label",
      description:
        "The subject field has no visible label — users rely entirely on placeholder text.",
      recommendation:
        "Add a concise label such as 'Subject' above the input field.",
    },
    {
      id: "mock-support-c2",
      fieldId: "support-email",
      severity: "critical",
      title: "Helpful guidance is missing",
      description:
        "The email field has no helper text, which is especially important for support contexts.",
      recommendation:
        "Add helper text such as 'We will reply to this address within 24 hours'.",
    },
    {
      id: "mock-support-w1",
      severity: "warning",
      title: "High required-field load",
      description:
        "6 out of 7 fields are required, creating significant friction before submission.",
      recommendation:
        "Make category and priority optional — they can be inferred from the description.",
    },
    {
      id: "mock-support-w2",
      fieldId: "support-priority",
      severity: "warning",
      title: "Label is longer than ideal",
      description:
        "'How urgent is this issue for your team?' is 39 characters — too long for a form label.",
      recommendation:
        "Shorten to 'Priority' and move the question to help text.",
    },
    {
      id: "mock-support-i1",
      fieldId: "support-name",
      severity: "info",
      title: "Placeholder repeats label",
      description:
        "The placeholder 'Full name' is identical to the label and adds no extra guidance.",
      recommendation:
        "Use an example value such as 'e.g. Maria Müller' or remove the placeholder.",
    },
    {
      id: "mock-support-i2",
      fieldId: "support-email",
      severity: "info",
      title: "Placeholder repeats label",
      description:
        "The placeholder 'Email' is identical to the label and adds no extra guidance.",
      recommendation:
        "Use an example value such as 'name@company.com' or remove the placeholder.",
    },
  ],
  warnings: [], // deprecated alias — kept for compatibility
  summary: {
    requiredFields: 6,
    optionalFields: 1,
    longLabels: 2,
    totalFields: 7,
  },
};

/**
 * Lookup map: template id → static analysis result.
 * Use this to display pre-computed scores without running `analyzeForm()`.
 *
 * @example
 * const result = mockAnalysisByTemplateId["template-checkout"];
 */
export const mockAnalysisByTemplateId: Record<string, AnalysisResult> = {
  "template-signup": signupAnalysis,
  "template-checkout": checkoutAnalysis,
  "template-support": supportAnalysis,
};

/**
 * All three mock results as an ordered array.
 * Useful for rendering a comparison table or score overview.
 */
export const allMockAnalyses: AnalysisResult[] = [
  signupAnalysis,
  checkoutAnalysis,
  supportAnalysis,
];
