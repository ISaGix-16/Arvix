import EditableWorkspaceName from "@/components/EditableWorkspaceName";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceEditorsProvider } from "@/components/WorkspaceEditorsContext";
import { prisma } from "@/lib/prisma";
import { canAccessWorkspace } from "@/lib/workspace-access";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import CanvasEditor from "./_components/CanvasEditor";
import { TLEditorSnapshot } from "tldraw";
import { Block } from "@blocknote/core";
import { DocEditor } from "../../../../components/DocEditorLoader";

type ViewMode = "doc" | "canvas" | "both";

function parseViewMode(value: string | string[] | undefined): ViewMode {
  return value === "doc" || value === "canvas" ? value : "both";
}

const WorkspacePage = async ({
  params,
  searchParams,
}: PageProps<"/workspace/[id]">) => {
  const { id } = await params;
  const { view: viewParam } = await searchParams;
  const view = parseViewMode(viewParam);

  if (!(await canAccessWorkspace(id))) notFound();

  const workspace = await prisma.workspace.findUnique({
    where: { id },
    select: {
      name: true,
      doc: { select: { content: true } },
      canvas: { select: { content: true } },
    },
  });

  if (!workspace) notFound();

  const showDoc = view === "doc" || view === "both";
  const showCanvas = view === "canvas" || view === "both";

  return (
    <WorkspaceEditorsProvider>
      <div className="flex h-dvh flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center border-b border-white/6 bg-background px-4">
          <div className="flex flex-1 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex size-8 items-center justify-center rounded-md transition-opacity hover:opacity-80">
              <Image
                src="/logos/arvix-mark.png"
                alt="Back to dashboard"
                width={24}
                height={24}
                className="size-6"
              />
            </Link>
            <EditableWorkspaceName
              workspaceId={id}
              initialName={workspace.name}
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/3 p-1">
            {(["doc", "both", "canvas"] as const).map((mode) => (
              <Button
                key={mode}
                asChild
                variant={view === mode ? "secondary" : "ghost"}
                size="sm"
                className="capitalize">
                <Link
                  href={
                    mode === "both"
                      ? `/workspace/${id}`
                      : `/workspace/${id}?view=${mode}`
                  }>
                  {mode === "doc" ? "Document" : mode}
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            {/* TODO: ShareDialog, AgentToggleButton */}
          </div>
        </header>
        <ResizablePanelGroup
          key={view}
          orientation="horizontal"
          className="flex-1">
          {showDoc && (
            <ResizablePanel defaultSize={25} minSize={20}>
              <DocEditor
                key={id}
                workspaceId={id}
                initialContent={workspace.doc?.content as Block[] | null}
              />
            </ResizablePanel>
          )}

          {showDoc && showCanvas && <ResizableHandle withHandle />}

          {showCanvas && (
            <ResizablePanel defaultSize={75} minSize={20}>
              <CanvasEditor
                workspaceId={id}
                initialSnapshot={
                  workspace.canvas?.content as TLEditorSnapshot | null
                }
              />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </WorkspaceEditorsProvider>
  );
};

export default WorkspacePage;
