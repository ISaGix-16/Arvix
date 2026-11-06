"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { canAccessWorkspace } from "@/lib/workspace-access";

export async function saveCanvasContent(
  workspaceId: string,
  content: Prisma.InputJsonValue,
) {
  if (!(await canAccessWorkspace(workspaceId)))
    throw new Error("Workspace not found");

  await prisma.canvas.update({
    where: { workspaceId },
    data: { content },
  });
}
