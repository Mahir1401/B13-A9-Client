"use client";

import { motion } from "motion/react";
import { Search, ClipboardCheck, Home } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Pet",
    description:
      "Search and filter by species, location or budget to find a pet that fits your home and lifestyle.",
  },
  {
    icon: ClipboardCheck,
    title: "Submit a Request",
    description:
      "Fill out a short adoption request with your pickup date and a message to the pet's current owner.",
  },
  {
    icon: Home,
    title: "Welcome Them Home",
    description:
      "Once approved, coordinate pickup and bring your new companion home to start your life together.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-14 flex max-w-[640px] flex-col items-center text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-surface-foreground">
            <ClipboardCheck className="size-3.5" />
            How It Works
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Three Simple Steps to Adoption
          </h2>
          <p className="text-sm leading-relaxed text-foreground/75 sm:text-base">
            No complicated paperwork — just a simple process designed to get
            pets into loving homes faster.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-separator md:block"
          />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <span className="relative z-10 mb-5 flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground shadow-xs">
                  <Icon className="size-5" />
                </span>
                <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}