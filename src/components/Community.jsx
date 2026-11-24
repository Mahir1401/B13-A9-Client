"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { HandHeart, Gift, Users } from "lucide-react";

const actions = [
  {
    icon: HandHeart,
    title: "Volunteer",
    description: "Help at local shelters with walks, feeding and socializing pets.",
  },
  {
    icon: Gift,
    title: "Donate",
    description: "Fund food, vaccinations and shelter costs for pets awaiting homes.",
  },
  {
    icon: Users,
    title: "Spread the Word",
    description: "Share listings with friends and family — every share finds a pet a lead.",
  },
];

export default function Community() {
  return (
    <section className="relative w-full overflow-hidden bg-surface px-6 py-20 text-surface-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 flex max-w-[640px] flex-col items-center text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground">
            <HandHeart className="size-3.5 text-baby-blue" />
            Join the Community
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Can&apos;t Adopt? You Can Still Help
          </h2>
          <p className="text-sm leading-relaxed text-surface-foreground/75 sm:text-base">
            Not every supporter brings a pet home — there are plenty of ways to
            make a difference for animals still waiting.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-start rounded-2xl border border-border bg-background p-6"
              >
                <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mb-2 font-serif text-lg font-bold text-foreground">
                  {action.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {action.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
          >
            <HandHeart className="size-4" />
            Get Involved Today
          </Link>
        </div>
      </div>
    </section>
  );
}