import { clerkClient } from "@clerk/nextjs/server";
import { FREE_MONTHLY_PROMPTS } from "./plan-limits";
import { prisma } from "./prisma";

const PROMPT_FEATURES = [
  { feature: "agent_prompts_2000", perMember: 2000 },
  { feature: "agent_prompts_500", perMember: 500 },
];

// everything is scoped to an "owner": a clerk org id for org workspace, or a Clerk user id for personal ones. Clerk prefixes its ids, so they can't colide.
export const workspaceOwnerSelect = {
  clerkOrgId: true,
  creator: { select: { clerkId: true } },
} as const;

export function workspaceOwnerId(workspace: {
  clerkOrgId: string | null;
  creator: { clerkId: string };
}) {
  return workspace.clerkOrgId ?? workspace.creator.clerkId;
}

export async function getWorkspaceOwnerId(workspaceId: string) {
  const workspace = await prisma.workspace.findUniqueOrThrow({
    where: { id: workspaceId },
    select: workspaceOwnerSelect,
  });
  return workspaceOwnerId(workspace);
}

// The owner's plan features, looked up from Clerk on the server. This works for any owner, not just the org selected in the viewer's switcher, and even for signed-out viewers (shared links).
export async function getEntitlements(ownerId: string) {
  const clerk = await clerkClient();
  const isOrg = ownerId.startsWith("org_");
  const features = new Set<string>();

  try {
    const subscription = isOrg
      ? await clerk.billing.getOrganizationBillingSubscription(ownerId)
      : await clerk.billing.getUserBillingSubscription(ownerId);

    for (const item of subscription.subscriptionItems) {
      if (item.status === "active" || item.status === "past_due") {
        item.plan?.features.forEach((feature) => features.add(feature.slug));
      }
    }
  } catch {}

  const paid = PROMPT_FEATURES.find(({ feature }) => features.has(feature));
  let promptLimit = FREE_MONTHLY_PROMPTS;
  if (paid) {
    const members = isOrg
      ? ((
          await clerk.organizations.getOrganization({
            organizationId: ownerId,
            includeMembersCount: true,
          })
        ).membersCount ?? 1)
      : 1;

    promptLimit = paid.perMember * members;
  }

  return {
    isPaid: !!paid,
    promptLimit,
    unlimitedWorkspaces: features.has("unlimited_workspaces"),
    publicSharing: features.has("public_sharing"),
    pdfExport: features.has("pdf_export"),
  };
}
