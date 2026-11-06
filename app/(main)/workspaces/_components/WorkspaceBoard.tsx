"use client";

import {
  WorkspaceCard,
  WorkspaceCardData,
} from "@/components/WorkspaceCardData";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { WORKSPACES_STATUES } from "@/lib/workspace-status";
import { WorkspaceStatus } from "@/lib/generated/prisma/enums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFetch } from "@/hooks/use-fetch";
import {
  deleteWorkspace,
  moveWorkspace,
  updateWorkspace,
} from "@/actions/workspace";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type BoardWorkspace = WorkspaceCardData & { position: number };

function columnItems(workspaces: BoardWorkspace[], status: WorkspaceStatus) {
  return workspaces
    .filter((w) => w.status === status)
    .sort((a, b) => a.position - b.position);
}

function positionBetween(before?: BoardWorkspace, after?: BoardWorkspace) {
  if (before && after) return (before.position + after.position) / 2;
  if (before) return before.position + 1;
  if (after) return after.position - 1;
  return 0;
}

const WorkspaceBoard = ({ workspaces }: { workspaces: BoardWorkspace[] }) => {
  const [items, setItems] = useState(workspaces);
  const [preWorkspaces, setPreWorkspaces] = useState(workspaces);

  if (workspaces !== preWorkspaces) {
    setPreWorkspaces(workspaces);
    setItems(workspaces);
  }

  const [selected, setSelected] = useState<BoardWorkspace | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<BoardWorkspace | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { fn: deleteWorkspaceFn, loading: isDeleting } =
    useFetch(deleteWorkspace);
  const { fn: updateWorkspaceFn, loading: isUpdating } =
    useFetch(updateWorkspace);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selected) return;
    await deleteWorkspaceFn(selected.id);
    setDeleteOpen(false);
  };

  const handleDragEnd = async ({
    draggableId,
    source,
    destination,
  }: DropResult) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const status = destination.droppableId as WorkspaceStatus;
    const target = columnItems(items, status).filter(
      (w) => w.id !== draggableId,
    );

    const position = positionBetween(
      target[destination.index - 1],
      target[destination.index],
    );

    const previous = items;
    setItems(
      items.map((w) => (w.id === draggableId ? { ...w, status, position } : w)),
    );

    try {
      await moveWorkspace(draggableId, status, position);
    } catch {
      setItems(previous);
      toast.error("Couldn;t move workspace");
    }
  };

  const confirmDelete = (workspace: BoardWorkspace) => {
    setSelected(workspace);
    setDeleteOpen(true);
  };

  const openEdit = (workspace: BoardWorkspace) => {
    setEditing(workspace);
    setEditName(workspace.name);
    setEditDescription(workspace.description ?? "");
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;

    const result = await updateWorkspaceFn(
      editing.id,
      editName,
      editDescription,
    );
    if (!result) return;

    setItems((current) =>
      current.map((workspace) =>
        workspace.id === editing.id
          ? {
              ...workspace,
              name: editName.trim(),
              description: editDescription.trim() || null,
            }
          : workspace,
      ),
    );
    setEditing(null);
    toast.success("Workspace updated");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {WORKSPACES_STATUES.map((column) => {
          const columnWorkspaces = columnItems(items, column.status);

          return (
            <div
              key={column.status}
              className="flex flex-col rounded-lg bg-white/3">
              <div className="flex items-center gap-2 px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {column.title}
                <span className="font-normal">{columnWorkspaces.length}</span>
              </div>

              <Droppable droppableId={column.status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex min-h-40 flex-1 flex-col gap-1.5 rounded-b-lg p-2 transition-colors ${
                      snapshot.isDraggingOver ? "bg-primary/5" : ""
                    }`}>
                    {columnWorkspaces.map((workspace, index) => (
                      <Draggable
                        key={workspace.id}
                        draggableId={workspace.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <WorkspaceCard
                              workspace={workspace}
                              highlighted={snapshot.isDragging}
                              actions={
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      aria-label="Workspace options"
                                      className="absolute top-2 right-2 size-7 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100">
                                      <MoreHorizontal className="size-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                      <DropdownMenuItem
                                        onSelect={() => openEdit(workspace)}>
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        variant="destructive"
                                        onSelect={() =>
                                          confirmDelete(workspace)
                                        }>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{selected?.name}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the workspacem, including its doc and
              cavas. It can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={!!isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open && !isUpdating) setEditing(null);
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit workspace</DialogTitle>
            <DialogDescription>
              Update the workspace name and description.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-workspace-name">Name</Label>
              <Input
                id="edit-workspace-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-workspace-description">
                Description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="edit-workspace-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
                disabled={!!isUpdating}>
                Cancel
              </Button>
              <Button type="submit" disabled={!!isUpdating || !editName.trim()}>
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DragDropContext>
  );
};

export default WorkspaceBoard;
