"use client";

import { motion } from "motion/react";
import { HeartHandshake, ShieldCheck, PawPrint, Home } from "lucide-react";

const reasons = [
  {
    icon: HeartHandshake,
    title: "You Save a Life",
    description:
      "Every adoption frees up space and resources for shelters to rescue another pet in need.",
  },
  {
    icon: ShieldCheck,
    title: "Health-Checked & Vaccinated",
    description:
      "Every listed pet comes with a vaccination record and health status, so you know exactly what you're bringing home.",
  },
  {
    icon: Home,
    title: "A Second Chance",
    description:
      "Many of our pets were surrendered through no fault of their own — adoption gives them the stable home they deserve.",
  },
  {
    icon: PawPrint,
    title: "Lifelong Companionship",
    description:
      "Rescued pets are known for their loyalty. You're not just adopting a pet — you're gaining a devoted friend.",
  },
];

export default function WhyAdopt() {
  return (
    <section className="w-full bg-surface px-6 py-20 text-surface-foreground">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 flex max-w-[640px] flex-col items-center text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground">
            <HeartHandshake className="size-3.5" />
            Why Adopt
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            More Than a Pet — A Promise Kept
          </h2>
          <p className="text-sm leading-relaxed text-surface-foreground/75 sm:text-base">
            Choosing adoption means choosing compassion. Here's why thousands of
            families start their search with us.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
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
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}