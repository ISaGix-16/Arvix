"use client";

import { useWorkspaceEditors } from "@/components/WorkspaceEditorsContext";
import { useUser } from "@clerk/nextjs";
import React, { useMemo, useRef } from "react";
import {
  atom,
  computed,
  createTLCurrentUser,
  createUserId,
  DefaultToolbar,
  DefaultToolbarContent,
  getUserPreferences,
  type Editor,
  type TLComponents,
  type TLEditorSnapshot,
  UserRecordType,
  Tldraw,
} from "tldraw";
import { colorForUser } from "@/lib/utils";
import { useSyncDemo } from "@tldraw/sync";
import { Prisma } from "@/lib/generated/prisma/client";
import { saveCanvasContent } from "@/actions/canvas";
import "tldraw/tldraw.css"

const SAVE_DEBOUNCE_MS = 1000;

const components: TLComponents = {
  StylePanel: null,
  PageMenu: null,
  MainMenu: null,
  Toolbar: () => (
    <DefaultToolbar orientation="vertical">
      {/* TODO: Add table button (ERD step) */}
      <DefaultToolbarContent />
    </DefaultToolbar>
  ),
};

const CanvasEditor = ({
  workspaceId,
  initialSnapshot,
}: {
  workspaceId: string;
  initialSnapshot: TLEditorSnapshot | null;
}) => {
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setCanvasEditor } = useWorkspaceEditors();
  const { user } = useUser();

  const userId = user?.id;
  const userName = user?.fullName ?? user?.username ?? "Anonymous";
  const userImageUrl = user?.imageUrl ?? "";

  const users = useMemo(() => {
    if (!userId) return undefined;
    return {
      currentUser: atom(
        "currentUser",
        UserRecordType.create({
          id: createUserId(userId),
          name: userName,
          color: colorForUser(userId),
          imageUrl: userImageUrl,
        }),
      ),
    };
  }, [userId, userName, userImageUrl]);

  const currentUser = useMemo(() => {
    if (!userId) return undefined;
    return createTLCurrentUser({
      userPreferences: computed("clerkUserPreferences", () => ({
        ...getUserPreferences(),
        id: userId,
        name: userName,
        color: colorForUser(userId),
      })),
    });
  }, [userId, userName]);

  const store = useSyncDemo({ roomId: `arvix-${workspaceId}`, users });

  const handleMount = (editor: Editor) => {
    setCanvasEditor(editor);

    if (initialSnapshot && editor.getCurrentPageShapeIds().size == 0) {
      editor.loadSnapshot(initialSnapshot);
    }

    editor.store.listen(
      () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(() => {
          const plainSnapshot = JSON.parse(
            JSON.stringify(editor.getSnapshot()),
          ) as Prisma.InputJsonValue;

          saveCanvasContent(workspaceId, plainSnapshot);
        }, SAVE_DEBOUNCE_MS);
      },
      { source: "user", scope: "document" },
    );

    return () => setCanvasEditor(null);
  };

  return (
    <div className="isolate h-full [&_.tlui-main-toolbaar--vertical]:top-4!">
      <Tldraw
        store={store}
        user={currentUser}
        onMount={handleMount}
        components={components}
        colorScheme="dark"
      />
    </div>
  );
};

export default CanvasEditor;
