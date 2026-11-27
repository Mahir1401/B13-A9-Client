"use client";

import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner size="lg" color="accent" />
    </div>
  );
}