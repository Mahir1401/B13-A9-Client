"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import { usePets } from "@/contexts/PetContext";
import Image from "next/image";
import Link from "next/link";

export default function PetCard({ pet, index = 0 }) {
  // const { setSelectedPet, startAdoption } = usePets();
  const [isHovered, setIsHovered] = useState(false);

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
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        borderRadius: "var(--radius-lg, 16px)",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 12px 24px -8px rgba(0, 0, 0, 0.12)"
          : "0 2px 8px rgba(0, 0, 0, 0.05)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        onClick={() => setSelectedPet(pet)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setSelectedPet(pet)}
        aria-label={`View details for ${pet.name}`}
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "70%",
          overflow: "hidden",
          background: "var(--color-canvas)",
          cursor: "pointer",
        }}
      >
        <Image
          src={pet.image}
          alt={`${pet.name} - ${pet.breed}`}
          loading="lazy"
          width={500}
          height={350}
          onError={(e) => {
            e.currentTarget.src =
              "https://unsplash.com";
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="pet-image"
        />

        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", zIndex: 5 }}>
          <span
            className={`badge ${
              isAvailable
                ? "badge-approved"
                : pet.status === "Pending Adoption"
                ? "badge-pending"
                : "badge-rejected"
            }`}
            style={{
              backdropFilter: "blur(6px)",
              background: "rgba(255, 255, 255, 0.9)",
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            {pet.status}
          </span>
        </div>

        {pet.size && (
          <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 5 }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.2rem 0.55rem",
                borderRadius: "999px",
                background: "rgba(0, 0, 0, 0.55)",
                color: "#fff",
                backdropFilter: "blur(4px)",
              }}
            >
              {pet.size}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "var(--space-lg, 1.25rem)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "0.5rem",
            marginBottom: "0.2rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
            {pet.name} {getSpeciesEmoji(pet.species)}
          </h3>
          <span
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--color-moss)",
              fontFamily: "'Fraunces', serif",
              whiteSpace: "nowrap",
            }}
          >
            ${pet.fee}
          </span>
        </div>

        <div className="caption" style={{ marginBottom: "0.35rem", fontWeight: 500 }}>
          {pet.breed} · {pet.age} · {pet.gender}
        </div>

        {pet.location && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-bark)",
              opacity: 0.75,
              marginBottom: "0.75rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            📍 {pet.location}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.85rem" }}>
          {pet.traits?.slice(0, 3).map((trait, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.72rem",
                padding: "0.2rem 0.55rem",
                background: "var(--color-canvas)",
                borderRadius: "var(--radius-sm, 6px)",
                color: "var(--color-bark)",
                fontWeight: 500,
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        <p
          className="text-bark"
          style={{
            fontSize: "0.875rem",
            margin: "0 0 1rem 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.5,
          }}
        >
          {pet.bio}
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            fontSize: "0.72rem",
            color: "var(--color-bark)",
            opacity: 0.85,
            marginBottom: "1rem",
            paddingTop: "0.65rem",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span>{pet.goodWithKids ? "✅ Kids" : "❌ Kids"}</span>
          <span>{pet.goodWithCats ? "✅ Cats" : "❌ Cats"}</span>
          <span>{pet.goodWithDogs ? "✅ Dogs" : "❌ Dogs"}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem" }}>
          <Link
            href={`/pets/${pet._id}`}
            className="btn btn-secondary"
            style={{ flex: 1, fontSize: "0.875rem", padding: "0.55rem" }}
          >
             Meet {pet.name}
          </Link>
          <button
            type="button"
            onClick={() => isAvailable && startAdoption(pet)}
            disabled={!isAvailable}
            className="btn btn-primary"
            style={{
              flex: 1,
              fontSize: "0.875rem",
              padding: "0.55rem",
              opacity: isAvailable ? 1 : 0.55,
              cursor: isAvailable ? "pointer" : "not-allowed",
            }}
          >
            {isAvailable ? "Adopt" : "Pending"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
