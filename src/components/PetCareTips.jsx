"use client";

import { motion } from "motion/react";
import { Stethoscope, Utensils, Dumbbell, Syringe } from "lucide-react";

const tips = [
  {
    icon: Utensils,
    title: "Balanced Nutrition",
    description:
      "Feed age-appropriate portions on a consistent schedule, and always keep fresh water available.",
  },
  {
    icon: Dumbbell,
    title: "Daily Exercise",
    description:
      "Even a 20-minute walk or play session a day keeps pets physically healthy and mentally stimulated.",
  },
  {
    icon: Syringe,
    title: "Stay on Vaccinations",
    description:
      "Keep boosters and vet checkups on schedule — preventive care is far easier than treating illness later.",
  },
  {
    icon: Stethoscope,
    title: "Watch for Changes",
    description:
      "Sudden shifts in appetite, energy or behavior are often the first sign something needs a vet's attention.",
  },
];

export default function PetCareTips() {
  return (
    <section className="w-full bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 flex max-w-[640px] flex-col items-center text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-surface-foreground">
            <Stethoscope className="size-3.5" />
            Pet Care Tips
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Caring for Your New Companion
          </h2>
          <p className="text-sm leading-relaxed text-foreground/75 sm:text-base">
            A few essentials to help your newly adopted pet settle in happy
            and healthy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-start rounded-2xl border border-border bg-surface p-6"
              >
                <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-baby-blue/15 text-baby-blue">
                  <Icon className="size-5" />
                </span>
                <h3 className="mb-2 font-serif text-lg font-bold text-surface-foreground">
                  {tip.title}
                </h3>
                <p className="text-sm leading-relaxed text-surface-foreground/75">
                  {tip.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}