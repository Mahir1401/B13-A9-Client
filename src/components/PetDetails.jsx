"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Calendar, MapPin, DollarSign, ShieldCheck, Syringe, PawPrint, Tag } from "lucide-react";
import RequestFormModal from "./RequestFormModal";

export default function PetDetails({ pet, user, token }) {
  if (!pet) return null;

  const isAvailable = pet.status === "Available";
  const isOwner = user?.email && pet.ownerEmail === user.email;

  const attributes = [
    { label: "Species", value: pet.species, icon: PawPrint },
    { label: "Breed", value: pet.breed, icon: Tag },
    { label: "Age", value: `${pet.age} years`, icon: Calendar },
    { label: "Gender", value: pet.gender, icon: User },
    { label: "Location", value: pet.location || "N/A", icon: MapPin },
    { label: "Adoption Fee", value: `$${pet.fee}`, icon: DollarSign },
    {
      label: "Health Status",
      value: pet.healthStatus || "Excellent",
      icon: ShieldCheck,
    },
    {
      label: "Vaccinated",
      value:
        pet.vaccinationStatus?.toLowerCase() === "up-to-date"
          ? "Yes"
          : pet.vaccinationStatus || "Yes",
      icon: Syringe,
    },
  ];

  return (
    <section className="min-h-screen w-full bg-background px-6 pb-16 pt-10 text-foreground">
      <div className="mx-auto max-w-[720px]">
        <div className="mb-6">
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-[1.15rem] py-2 text-xs font-semibold text-surface-foreground transition-opacity hover:opacity-85"
          >
            <ArrowLeft className="size-3.5" />
            Back to All Pets
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-7 rounded-3xl border border-border bg-surface p-8 shadow-sm"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border bg-background">
            <Image
              src={pet.image}
              alt={`${pet.name} - ${pet.breed}`}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
            <p
              className={`absolute right-4 top-4 z-10 rounded-full border border-border px-4 py-1.5 text-xs font-semibold shadow-sm ${
                isAvailable
                  ? "bg-accent text-accent-foreground"
                  : "bg-default text-default-foreground"
              }`}
            >
              {pet.status}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {pet.name}
                </h1>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  {pet.species && (
                    <p className="rounded-full bg-accent px-3.5 py-1 text-xs font-semibold capitalize text-accent-foreground">
                      {pet.species}
                    </p>
                  )}
                  {pet.breed && (
                    <p className="rounded-full border border-border bg-background px-3.5 py-1 text-xs font-medium text-foreground">
                      {pet.breed}
                    </p>
                  )}
                  {pet.gender && (
                    <p className="rounded-full border border-border bg-background px-3.5 py-1 text-xs font-medium capitalize text-foreground">
                      {pet.gender}
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs font-medium text-muted">Adoption Fee</p>
                <p className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  ${pet.fee}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {attributes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col justify-center rounded-2xl border border-border bg-background px-4 py-3.5"
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted">
                      <Icon className="size-3.5 text-foreground" />
                      <p>{item.label}</p>
                    </div>
                    <p className="text-sm font-semibold capitalize text-foreground">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {pet.bio && (
              <div className="border-t border-separator pt-4">
                <h2 className="mb-1.5 font-serif text-base font-bold text-foreground">
                  About {pet.name}
                </h2>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {pet.bio}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {isOwner ? (
                <p className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground">
                  You listed this pet
                </p>
              ) : !isAvailable ? (
                <p className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-muted">
                  Already Adopted
                </p>
              ) : (
                <RequestFormModal pet={pet} user={user} token={token} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}