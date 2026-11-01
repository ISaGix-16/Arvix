"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useUpgradeDialog } from "./UpgradeDialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { createWorkspace } from "@/actions/workspace";
import { UPGRADE_REASONS } from "@/lib/plan-limits";
import { toast } from "sonner";

const WorkspaceDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
        </DialogHeader>
        <WorkspaceForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

function WorkspaceForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const openUpgrade = useUpgradeDialog();

  const { fn: createWorkspaceFn, loading } = useFetch(createWorkspace);

  const handleSubmit = async () => {
    const result = await createWorkspaceFn(name, description);

    if (!result) return;
    onDone();

    if ("limit" in result) return openUpgrade(UPGRADE_REASONS[result.limit]);
    toast.success("Workspace created")
    router.push(`/workspace/${result.workspace.id}`);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="workspace-name">Name</Label>
        <Input
          id="workspace-name"
          placeholder="Q1 Marketing Launch"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workspace-description">
          Description <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="workspace-description"
          placeholder="What's this workspace for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading || !name.trim()}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </div>
    </>
  );
}

export default WorkspaceDialog;
