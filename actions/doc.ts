"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { canAccessWorkspace } from "@/lib/workspace-access";
import * as Y from "yjs";

export async function saveDocContent(
  workspaceId: string,
  yjsState: string,
  content: Prisma.InputJsonValue,
) {
  if (!(await canAccessWorkspace(workspaceId)))
    throw new Error("Workspace not found");

  const incoming = Buffer.from(yjsState, "base64");

  await prisma.$transaction(async (tx) => {
    const [row] = await tx.$queryRaw<{ yjsState: Uint8Array | null }[]>`
    SELECT "yjsState" FROM "Doc" WHERE "workspaceId = ${workspaceId} for UPDATE`;

    const merged = row?.yjsState
      ? Y.mergeUpdates([row.yjsState, incoming])
      : incoming;

    await tx.doc.update({
      where: { workspaceId },
      data: { yjsState: Uint8Array.from(merged), content },
    });
  });
}
