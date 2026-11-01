"use client";

import { useAuth } from "@clerk/nextjs";
import { SubscriptionDetailsButton } from "@clerk/nextjs/experimental";
import { useUpgradeDialog } from "./UpgradeDialog";
import { __experimental_useSubscription } from "@clerk/shared/react/index";

const PlanButton = () => {
  const { orgId, has } = useAuth();
  const payerType = orgId ? "organization" : "user";

  const { data: subscription } = __experimental_useSubscription({
    for: payerType,
  });

  const openUpgrade = useUpgradeDialog();

  const paidPlan = subscription?.subscriptionItems.find(
    (item) => item.status === "active" && !item.plan.isDefault,
  )?.plan;

  const isPaid = Boolean(paidPlan);

  const planButton = (
    <button
      type="button"
      onClick={isPaid ? undefined : () => openUpgrade()}
      className="flex h-full items-center px-3 font-medium text-foreground transition-colors hover:bg-brand/10 hover:text-brand">
      {paidPlan?.name ?? "Free"}
    </button>
  );

  const canManage =
    isPaid && (!orgId || has?.({ permission: "org:sys_billing:manage" }));

  return (
    <div className="flex h-9 items-center overflow-hidden rounded-full border border-border bg-muted/50 text-xs shadow-sm">
      {canManage ? (
        <SubscriptionDetailsButton for={payerType}>
          {planButton}
        </SubscriptionDetailsButton>
      ) : (
        planButton
      )}

      {!isPaid && (
        <button
          type="button"
          onClick={() => openUpgrade()}
          className="h-full border-l border-border px-3 font-medium text-brand transition-colors hover:bg-brand/10 hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
          Upgrade
        </button>
      )}
    </div>
  );
};

export default PlanButton;
