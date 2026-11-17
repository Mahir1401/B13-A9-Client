"use client";

import Link from "next/link";
import { PawPrint, Heart, Mail, MapPin, Clock, ChevronRight } from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "All Pets", href: "/pets" },
  { label: "Sign In", href: "/login" },
  { label: "Create an Account", href: "/signup" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#3B2418",
        color: "#F2E8DA",
        borderTop: "1px solid rgba(242, 232, 218, 0.15)",
      }}
      className="w-full"
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2.5rem",
        }}
        className="grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        <div className="md:col-span-2 flex flex-col items-start">
          <Link
          href="/"
          className="flex items-center group"
          style={{ gap: '0.65rem' }}
        >
          <PawPrint
            className="text-[#8EC5FF] border-2 border-[#8EC5FF] rounded-full transition-transform group-hover:scale-105"
            style={{ width: '2rem', height: '2rem', padding: '0.25rem' }}
          />
          <span className="font-[Fraunces] text-[1.35rem] font-bold text-[#F2E8DA] tracking-[-0.02em]">
            PetNest
          </span>
        </Link>

          <p
            style={{
              color: "rgba(242, 232, 218, 0.78)",
              maxWidth: "360px",
              marginBottom: "1.5rem",
            }}
            className="text-sm leading-relaxed"
          >
            Connecting loving homes with rescued companions. Every adoption gives a pet a second chance at a warm, happy life.
          </p>

          <Link
            href="/pets"
            style={{
              backgroundColor: "#8EC5FF",
              color: "#3B2418",
              padding: "0.65rem 1.5rem",
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            <Heart className="w-3.5 h-3.5" />
            Adopt a Pet Today
          </Link>
        </div>

        <div className="flex flex-col">
          <p
            style={{ color: "#8EC5FF", marginBottom: "1rem" }}
            className="text-xs font-semibold uppercase tracking-wider"
          >
            Explore
          </p>
          <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-[#F2E8DA]/80 transition-all duration-300 hover:translate-x-1 hover:text-[#8EC5FF]"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#8EC5FF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

        </div>

        <div className="flex flex-col">
          <p
            style={{ color: "#8EC5FF", marginBottom: "1rem" }}
            className="text-xs font-semibold uppercase tracking-wider"
          >
            Contact
          </p>
          <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(242, 232, 218, 0.85)" }}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8EC5FF]/15">
                  <Mail className="h-4 w-4 text-[#8EC5FF]" />
                </span>
                <p>hello@petnest.org</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8EC5FF]/15">
                  <MapPin className="h-4 w-4 text-[#8EC5FF]" />
                </span>
                <p>124 Meadow Lane, Suite 200</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8EC5FF]/15">
                  <Clock className="h-4 w-4 text-[#8EC5FF]" />
                </span>
                <p>Mon - Sat, 9:00 AM - 6:00 PM</p>
              </div>
            </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(242, 232, 218, 0.15)",
          padding: "1.25rem 1.5rem",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", color: "rgba(242, 232, 218, 0.65)" }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
        >
          <p>© {new Date().getFullYear()} PetNest. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" style={{ color: "rgba(242, 232, 218, 0.65)" }} className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "rgba(242, 232, 218, 0.65)" }} className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
