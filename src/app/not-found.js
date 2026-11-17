"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F2E8DA] dark:bg-[#23150E] p-6">
      <article
        style={{ padding: "3.5rem 2.5rem" }}
        className="max-w-lg w-full bg-[#F9F4ED] dark:bg-[#2B1A11] border border-[#3B2418]/15 dark:border-[#F2E8DA]/15 rounded-3xl shadow-sm flex flex-col items-center text-center"
      >
        <p
          style={{
            backgroundColor: "#F2E8DA",
            color: "#3B2418",
            padding: "0.35rem 1rem",
            marginBottom: "1.5rem",
          }}
          className="inline-flex items-center gap-2 rounded-full text-xs font-semibold border border-[#3B2418]/20"
        >
          <PawPrint className="w-3.5 h-3.5 text-[#3B2418]" />
          Error 404
        </p>

        <h1
          style={{ color: "#3B2418", marginBottom: "1rem" }}
          className="text-4xl md:text-5xl font-bold font-[Fraunces] dark:!text-[#F2E8DA] tracking-tight"
        >
          Page Not Found
        </h1>

        <p
          style={{ marginBottom: "2rem" }}
          className="max-w-sm text-sm md:text-base text-[#3B2418]/75 dark:text-[#F2E8DA]/75 leading-relaxed"
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist. It may have been moved or removed.
        </p>

        <Link
          href="/"
          style={{
            backgroundColor: "#8EC5FF",
            color: "#3B2418",
            padding: "0.75rem 2.25rem",
          }}
          className="inline-flex items-center justify-center font-semibold text-sm rounded-full hover:opacity-90 transition-opacity shadow-xs"
        >
          Go Home
        </Link>
      </article>
    </section>
  );
}
