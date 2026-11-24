"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Heart, PawPrint, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-brown">
      {/* Soft radial glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[32rem] rounded-full bg-baby-blue/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 size-[26rem] rounded-full bg-baby-blue/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <p className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-cream">
            <PawPrint className="size-3.5 text-baby-blue" />
            1,200+ pets found homes through PetNest
          </p>

          <h1 className="mb-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]">
            Every pet deserves a{" "}
            <span className="inline-block rounded-full bg-baby-blue mt-1.5 px-4 py-0.5 text-brown">
              Forever Home
            </span>
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-cream/80">
            Browse loving, vetted pets waiting for a family — and give a rescued
            companion their second chance at a warm, happy life.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 rounded-full bg-baby-blue px-7 py-3.5 text-sm font-semibold text-brown shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
            >
              <Heart className="size-4" />
              Adopt Now
            </Link>
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
            >
              <Search className="size-4 text-baby-blue" />
              Browse Pets
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] border border-cream/15 shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80"
            alt="A happy rescued dog ready for adoption"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}