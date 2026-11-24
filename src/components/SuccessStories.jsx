"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

const stories = [
  {
    name: "Rafiq & Luna",
    pet: "Adopted Luna, 2 years ago",
    quote:
      "Luna was shy and scared when we met her. Today she greets us at the door every single day. Best decision we've made as a family.",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Promi & Milo",
    pet: "Adopted Milo, 8 months ago",
    quote:
      "The adoption process was so simple, and the owner was transparent about Milo's health from day one. He's thriving now.",
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tanvir & Bella",
    pet: "Adopted Bella, 1 year ago",
    quote:
      "We weren't looking to adopt a senior cat, but Bella changed our minds. She's calm, affectionate, and exactly what our home needed.",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=300&q=80",
  },
];

export default function SuccessStories() {
  return (
    <section className="w-full bg-surface px-6 py-20 text-surface-foreground">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 flex max-w-[640px] flex-col items-center text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground">
            <Quote className="size-3.5" />
            Success Stories
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Happily Ever After, Every Day
          </h2>
          <p className="text-sm leading-relaxed text-surface-foreground/75 sm:text-base">
            Real families, real pets, real second chances — here's what
            adoption looks like once the paperwork's done.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col rounded-3xl border border-border bg-background p-6"
            >
              <div className="mb-4 flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>

              <Quote className="mb-3 size-6 text-accent" />

              <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/85">
                &ldquo;{story.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-separator pt-4">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{story.name}</p>
                  <p className="text-xs text-muted">{story.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}