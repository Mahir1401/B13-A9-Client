"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-background p-6 text-foreground">
      <article className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-border bg-surface px-10 py-14 text-center text-surface-foreground shadow-sm">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground">
          <PawPrint className="size-3.5" />
          Error 404
        </p>

        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          Page Not Found
        </h1>

        <p className="mb-8 max-w-sm text-sm leading-relaxed text-surface-foreground/75 md:text-base">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It may have
          been moved or removed.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-9 py-3 text-sm font-semibold text-accent-foreground shadow-xs transition-opacity hover:opacity-90"
        >
          Go Home
        </Link>
      </article>
    </section>
  );
}