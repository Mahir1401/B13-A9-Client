"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import RequestFormModal from "./RequestFormModal";

const speciesEmoji = {
  dog: "🐶",
  cat: "🐱",
  rabbit: "🐰",
  bird: "🦜",
};

function getSpeciesEmoji(species = "") {
  return speciesEmoji[species.toLowerCase()] || "🐾";
}

function getStatusClasses(status) {
  if (status === "Available") {
    return "bg-accent text-accent-foreground";
  }
  if (status === "Pending Adoption") {
    return "bg-warning text-warning-foreground";
  }
  return "bg-default text-default-foreground";
}

export default function PetCard({ pet, index = 0, onSelectPet }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const isAvailable = pet.status === "Available";
  const isOwner = Boolean(user?.email && pet.ownerEmail === user.email);

  const handleAdoptNowClick = () => {
    router.push(`/login?callbackUrl=${encodeURIComponent(pathname || "/pets")}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-surface-foreground shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <div
        onClick={() => onSelectPet?.(pet)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onSelectPet?.(pet)}
        aria-label={`View details for ${pet.name}`}
        className={`relative aspect-[10/7] w-full overflow-hidden bg-default ${
          onSelectPet ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <Image
          src={pet.image}
          alt={`${pet.name} - ${pet.breed}`}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <span
          className={`absolute left-3 top-3 z-[5] rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusClasses(
            pet.status
          )}`}
        >
          {pet.status}
        </span>

        {pet.healthStatus && (
          <span className="absolute right-3 top-3 z-[5] rounded-full bg-brown/70 px-2.5 py-1 text-[0.7rem] font-semibold capitalize text-cream backdrop-blur-sm">
            {pet.healthStatus}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {pet.name} {getSpeciesEmoji(pet.species)}
          </h3>
          <span className="whitespace-nowrap font-serif text-lg font-bold text-foreground">
            ${pet.fee}
          </span>
        </div>

        <p className="mb-1.5 text-xs font-medium text-muted">
          {pet.breed} · {pet.age} · {pet.gender}
        </p>

        {pet.location && (
          <p className="mb-3 truncate text-xs text-muted">📍 {pet.location}</p>
        )}

        <p className="mb-4 line-clamp-2 text-sm leading-normal text-foreground/80">
          {pet.bio}
        </p>

        <div className="mb-4 flex items-center justify-between gap-2 border-t border-separator pt-2.5 text-[0.72rem] text-muted">
          <span>
            {pet.vaccinationStatus === "up-to-date"
              ? "✅ Vaccinated"
              : `💉 ${pet.vaccinationStatus || "Vaccination N/A"}`}
          </span>
          {pet.postedDate && <span>Listed {pet.postedDate}</span>}
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            href={`/pets/${pet._id}`}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-center text-xs font-semibold text-foreground transition-all hover:opacity-90 active:scale-[0.99]"
          >
            Meet {pet.name}
          </Link>

          {isOwner ? (
            <span className="flex flex-1 items-center justify-center rounded-full bg-default px-4 py-2.5 text-center text-xs font-semibold text-default-foreground">
              Your Listing
            </span>
          ) : user ? (
            <RequestFormModal pet={pet} user={user} size="sm" />
          ) : (
            <button
              type="button"
              onClick={handleAdoptNowClick}
              disabled={!isAvailable}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold shadow-xs transition-all ${
                isAvailable
                  ? "cursor-pointer bg-accent text-accent-foreground hover:opacity-90 active:scale-[0.99]"
                  : "cursor-not-allowed bg-default text-muted"
              }`}
            >
              <Heart className="size-3.5" />
              {isAvailable ? "Adopt Now" : pet.status}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}