"use client";

import { PricingTable, useAuth } from "@clerk/nextjs";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Sparkles } from "lucide-react";

type UpgradeReason = { title: string; description: string };

const DEFAULT_REASON: UpgradeReason = {
  title: "Upgrade your plan",
  description:
    "Get more agent prompts, unlimited workspaces, share links and PDF export.",
};

const UpgradeDialogContext = createContext<(reason?: UpgradeReason) => void>(
  () => {},
);

export const UpgradeDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [reason, setReason] = useState<UpgradeReason | null>(null);
  const { orgId } = useAuth();
  const close = () => setReason(null);

  return (
    <UpgradeDialogContext.Provider
      value={(next) => setReason(next ?? DEFAULT_REASON)}>
      {children}

      <Dialog
        modal={false}
        open={reason !== null}
        onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto border-border bg-background text-foreground shadow-2xl sm:max-w-5xl">
          <DialogHeader className="items-center space-y-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10">
              <Sparkles className="size-6 text-brand" aria-hidden="true" />
            </div>

            <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {reason?.title}
            </DialogTitle>

            {reason?.description && (
              <DialogDescription className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {reason.description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="mt-4">
            <PricingTable for={orgId ? "organization" : "user"} />
          </div>
        </DialogContent>
      </Dialog>
    </UpgradeDialogContext.Provider>
  );
};

export function useUpgradeDialog() {
  return useContext(UpgradeDialogContext);
}
