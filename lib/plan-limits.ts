// Free-plan limits and upgrade messages shared by server checks and client UI.
// Paid-plan limits come from Clerk plan features (see lib/billing.ts).

export const FREE_WORKSPACE_LIMIT = 3;
export const FREE_MONTHLY_PROMPTS = 20;

// Returned by /api/agent when the owner's monthly prompt allowance is exhausted.
export const PROMPT_LIMIT_ERROR = "prompt_limit_reached";

export const UPGRADE_REASONS = {
  prompts: {
    title: "You've used all your AI prompts",
    description:
      "You've reached your monthly AI prompt limit on your current plan. Upgrade to keep bringing your ideas to life with Arvix.",
  },
  workspaces: {
    title: "You've reached your workspace limit",
    description: `Your current plan includes ${FREE_WORKSPACE_LIMIT} workspaces. Upgrade to create more and keep your ideas organized.`,
  },
  sharing: {
    title: "Share your ideas with anyone",
    description:
      "Upgrade your plan to share a read-only link to your workspace with anyone.",
  },
  pdfExport: {
    title: "Take your work beyond Arvix",
    description:
      "Upgrade your plan to export your canvas and documents as PDF files.",
  },
};

export type LimitError = keyof typeof UPGRADE_REASONS;
