"use client";

import dynamic from "next/dynamic";

export const DocEditor = dynamic(
  () => import("@/components/DocEditor").then((m) => m.DocEditor),
  {
    ssr: false,
  },
);
