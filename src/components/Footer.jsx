"use client";

import Link from "next/link";
import { PawPrint, Heart, Mail, MapPin, Clock, ChevronRight } from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "All Pets", href: "/pets" },
  { label: "Sign In", href: "/login" },
  { label: "Create an Account", href: "/register" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const contactItems = [
  { icon: Mail, text: "hello@petnest.org" },
  { icon: MapPin, text: "124 Meadow Lane, Suite 200" },
  { icon: Clock, text: "Mon - Sat, 9:00 AM - 6:00 PM" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-cream/15 bg-brown text-cream">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 pb-10 pt-14 md:grid-cols-5">
        <div className="flex flex-col items-start md:col-span-2">
          <Link href="/" className="group mb-4 flex items-center gap-2.5">
            <PawPrint className="size-8 rounded-full border-2 border-baby-blue p-1 text-baby-blue transition-transform group-hover:scale-105" />
            <span className="font-serif text-[1.35rem] font-bold tracking-[-0.02em] text-cream">
              PetNest
            </span>
          </Link>

          <p className="mb-6 max-w-[360px] text-sm leading-relaxed text-cream/80">
            Connecting loving homes with rescued companions. Every adoption
            gives a pet a second chance at a warm, happy life.
          </p>

          <Link
            href="/pets"
            className="inline-flex items-center gap-2 rounded-full bg-baby-blue px-6 py-2.5 text-xs font-semibold text-brown transition-opacity hover:opacity-90"
          >
            <Heart className="size-3.5" />
            Adopt a Pet Today
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-baby-blue">
            Social
          </p>
          <ul className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-cream/80 transition-all duration-300 hover:translate-x-1 hover:text-baby-blue"
                >
                  <ChevronRight className="size-3.5 text-baby-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-baby-blue">
            Explore
          </p>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1 text-sm text-cream/80 transition-all duration-300 hover:translate-x-1 hover:text-baby-blue"
                >
                  <ChevronRight className="size-3.5 text-baby-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-baby-blue">
            Contact
          </p>
          <div className="flex flex-col gap-3 text-sm text-cream/85">
            {contactItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-baby-blue/15">
                  <Icon className="size-4 text-baby-blue" />
                </span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/15 px-6 py-5">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-xs text-cream/65 sm:flex-row">
          <p>© {new Date().getFullYear()} PetNest. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
