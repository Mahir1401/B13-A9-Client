"use client";

import { Spinner } from "@heroui/react";

export default function Loading({ fullScreen = true }) {
  return (
    <div
      className={`flex items-center justify-center bg-background ${
        fullScreen ? "min-h-screen" : "py-10"
      }`}
    >
      <Spinner size="lg" color="accent" />
    </div>
  );
}