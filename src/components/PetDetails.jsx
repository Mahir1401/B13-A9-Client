"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Heart } from "lucide-react";

export default function PetDetails({ pet }) {
  if (!pet) return null;

  const isAvailable = pet.status === "Available";

  const getSpeciesEmoji = (sp = "") => {
    switch (sp.toLowerCase()) {
      case "dog":
        return "🐶";
      case "cat":
        return "🐱";
      case "rabbit":
        return "🐰";
      case "bird":
        return "🦜";
      default:
        return "🐾";
    }
  };

  return (
    <section
      style={{ padding: "2.5rem 1.5rem 4rem" }}
      className="min-h-screen w-full bg-[#F2E8DA] dark:bg-[#23150E] text-[#3B2418] dark:text-[#F2E8DA]"
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            href="/pets"
            style={{
              backgroundColor: "#F9F4ED",
              color: "#3B2418",
              padding: "0.5rem 1.1rem",
              border: "1px solid rgba(59, 36, 24, 0.18)",
            }}
            className="inline-flex items-center gap-2 rounded-full text-xs font-semibold hover:opacity-85 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Pets
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ padding: "2rem" }}
          className="bg-[#F9F4ED] dark:bg-[#2B1A11] border border-[#3B2418]/15 dark:border-[#F2E8DA]/15 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 4",
              overflow: "hidden",
              backgroundColor: "#F2E8DA",
            }}
            className="rounded-2xl border border-[#3B2418]/10"
          >
            <Image
              src={pet.image}
              alt={`${pet.name} - ${pet.breed}`}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-pet.png";
              }}
              style={{ objectFit: "cover" }}
            />

            <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 10 }}>
              <p
                style={{
                  backgroundColor: isAvailable
                    ? "#8EC5FF"
                    : pet.status === "Pending Adoption"
                    ? "#F2E8DA"
                    : "#3B2418",
                  color: isAvailable || pet.status === "Pending Adoption" ? "#3B2418" : "#F2E8DA",
                  padding: "0.35rem 0.95rem",
                  border: "1px solid rgba(59, 36, 24, 0.15)",
                }}
                className="inline-flex items-center rounded-full text-xs font-semibold shadow-sm"
              >
                {pet.status}
              </p>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div
              style={{ marginBottom: "0.5rem" }}
              className="flex flex-wrap items-center gap-2"
            >
              {pet.size && (
                <p
                  style={{
                    backgroundColor: "#F2E8DA",
                    color: "#3B2418",
                    padding: "0.25rem 0.8rem",
                    border: "1px solid rgba(59, 36, 24, 0.18)",
                  }}
                  className="text-xs font-semibold rounded-full"
                >
                  {pet.size}
                </p>
              )}
              <p
                style={{
                  backgroundColor: "#F2E8DA",
                  color: "#3B2418",
                  padding: "0.25rem 0.8rem",
                  border: "1px solid rgba(59, 36, 24, 0.18)",
                }}
                className="text-xs font-semibold rounded-full"
              >
                {pet.gender} · {pet.age}
              </p>
            </div>

            <div
              style={{ marginBottom: "0.35rem" }}
              className="flex items-baseline justify-between gap-4"
            >
              <h1
                style={{ color: "#3B2418" }}
                className="text-3xl md:text-4xl font-bold font-[Fraunces] dark:!text-[#F2E8DA] tracking-tight"
              >
                {pet.name} {getSpeciesEmoji(pet.species)}
              </h1>
              <p
                style={{ color: "#3B2418" }}
                className="text-2xl md:text-3xl font-bold font-[Fraunces] dark:!text-[#8EC5FF]"
              >
                ${pet.fee}
              </p>
            </div>

            <p
              style={{ marginBottom: "0.75rem" }}
              className="text-sm font-semibold text-[#3B2418]/75 dark:text-[#F2E8DA]/75"
            >
              {pet.breed}
            </p>

            {pet.location && (
              <div
                style={{ marginBottom: "1.25rem" }}
                className="flex items-center gap-1.5 text-xs font-medium text-[#3B2418]/70 dark:text-[#F2E8DA]/70"
              >
                <MapPin className="w-3.5 h-3.5" />
                <p>{pet.location}</p>
              </div>
            )}

            <p
              style={{ marginBottom: "1.5rem" }}
              className="text-sm md:text-base text-[#3B2418]/85 dark:text-[#F2E8DA]/85 leading-relaxed"
            >
              {pet.bio}
            </p>

            {pet.traits?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{ marginBottom: "0.5rem" }}
                  className="text-xs font-semibold uppercase tracking-wider text-[#3B2418]/65 dark:text-[#F2E8DA]/65"
                >
                  Personality
                </p>
                <div className="flex flex-wrap gap-2">
                  {pet.traits.map((trait, i) => (
                    <p
                      key={i}
                      style={{
                        backgroundColor: "#F2E8DA",
                        color: "#3B2418",
                        padding: "0.35rem 0.9rem",
                        border: "1px solid rgba(59, 36, 24, 0.18)",
                      }}
                      className="text-xs rounded-full font-medium"
                    >
                      {trait}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                padding: "1rem 1.25rem",
                marginBottom: "1.75rem",
                backgroundColor: "#F2E8DA",
                border: "1px solid rgba(59, 36, 24, 0.15)",
              }}
              className="rounded-2xl"
            >
              <p
                style={{ marginBottom: "0.5rem", color: "#3B2418" }}
                className="text-xs font-semibold uppercase tracking-wider opacity-75"
              >
                Home Compatibility
              </p>
              <div
                style={{ color: "#3B2418" }}
                className="grid grid-cols-3 gap-2 text-xs font-semibold"
              >
                <p>{pet.goodWithKids ? "✅ Good with Kids" : "❌ No Kids"}</p>
                <p>{pet.goodWithCats ? "✅ Good with Cats" : "❌ No Cats"}</p>
                <p>{pet.goodWithDogs ? "✅ Good with Dogs" : "❌ No Dogs"}</p>
              </div>
            </div>

            <div style={{ marginTop: "auto" }} className="flex gap-3">
              <button
                type="button"
                disabled={!isAvailable}
                onClick={() => typeof startAdoption === "function" && startAdoption(pet)}
                style={{
                  backgroundColor: isAvailable ? "#8EC5FF" : "rgba(59, 36, 24, 0.15)",
                  color: isAvailable ? "#3B2418" : "rgba(59, 36, 24, 0.45)",
                  padding: "0.9rem 1.75rem",
                  cursor: isAvailable ? "pointer" : "not-allowed",
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all shadow-xs"
              >
                <Heart className="w-4 h-4" />
                {isAvailable ? `Adopt ${pet.name}` : pet.status}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
