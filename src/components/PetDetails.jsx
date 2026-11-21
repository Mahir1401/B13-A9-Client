"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  DollarSign,
  ShieldCheck,
  Syringe,
  PawPrint,
  Tag,
} from "lucide-react";
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
    <section
      style={{
        padding: "2.5rem 1.5rem 4rem",
        backgroundColor: "#F2E8DA",
        color: "#3B2418",
      }}
      className="min-h-screen w-full"
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            href="/pets"
            style={{
              backgroundColor: "#F9F4ED",
              color: "#3B2418",
              padding: "0.5rem 1.15rem",
              border: "1px solid rgba(59, 36, 24, 0.18)",
            }}
            className="inline-flex items-center gap-2 rounded-full text-xs font-semibold hover:opacity-85 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: "#3B2418" }} />
            Back to All Pets
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: "2rem",
            backgroundColor: "#F9F4ED",
            border: "1px solid rgba(59, 36, 24, 0.15)",
          }}
          className="rounded-3xl shadow-sm flex flex-col gap-7"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 11",
              overflow: "hidden",
              backgroundColor: "#F2E8DA",
              border: "1px solid rgba(59, 36, 24, 0.12)",
            }}
            className="rounded-2xl"
          >
            <Image
              src={pet.image}
              alt={`${pet.name} - ${pet.breed}`}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              style={{ objectFit: "cover" }}
            />
            <p
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                backgroundColor: isAvailable ? "#8EC5FF" : "#F2E8DA",
                color: "#3B2418",
                padding: "0.35rem 0.95rem",
                border: "1px solid rgba(59, 36, 24, 0.15)",
              }}
              className="rounded-full text-xs font-semibold shadow-sm"
            >
              {pet.status}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1
                  style={{ color: "#3B2418" }}
                  className="font-[Fraunces] text-3xl md:text-4xl font-bold tracking-tight"
                >
                  {pet.name}
                </h1>

                <div
                  style={{ marginTop: "0.6rem" }}
                  className="flex flex-wrap items-center gap-2"
                >
                  {pet.species && (
                    <p
                      style={{
                        backgroundColor: "#8EC5FF",
                        color: "#3B2418",
                        padding: "0.25rem 0.85rem",
                      }}
                      className="rounded-full text-xs font-semibold capitalize"
                    >
                      {pet.species}
                    </p>
                  )}
                  {pet.breed && (
                    <p
                      style={{
                        backgroundColor: "#F2E8DA",
                        color: "#3B2418",
                        padding: "0.25rem 0.85rem",
                        border: "1px solid rgba(59, 36, 24, 0.18)",
                      }}
                      className="rounded-full text-xs font-medium"
                    >
                      {pet.breed}
                    </p>
                  )}
                  {pet.gender && (
                    <p
                      style={{
                        backgroundColor: "#F2E8DA",
                        color: "#3B2418",
                        padding: "0.25rem 0.85rem",
                        border: "1px solid rgba(59, 36, 24, 0.18)",
                      }}
                      className="rounded-full text-xs font-medium capitalize"
                    >
                      {pet.gender}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <p
                  style={{ color: "rgba(59, 36, 24, 0.65)" }}
                  className="text-xs font-medium"
                >
                  Adoption Fee
                </p>
                <p
                  style={{ color: "#3B2418" }}
                  className="font-[Fraunces] text-2xl md:text-3xl font-bold"
                >
                  ${pet.fee}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {attributes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    style={{
                      backgroundColor: "#F2E8DA",
                      border: "1px solid rgba(59, 36, 24, 0.14)",
                      padding: "0.85rem 1rem",
                    }}
                    className="rounded-2xl flex flex-col justify-center"
                  >
                    <div
                      style={{
                        color: "rgba(59, 36, 24, 0.68)",
                        marginBottom: "0.25rem",
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium"
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: "#3B2418" }} />
                      <p className="m-0">{item.label}</p>
                    </div>
                    <p
                      style={{ color: "#3B2418" }}
                      className="text-sm font-semibold capitalize m-0"
                    >
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {pet.bio && (
              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(59, 36, 24, 0.12)",
                }}
              >
                <h2
                  style={{ color: "#3B2418", marginBottom: "0.4rem" }}
                  className="font-[Fraunces] text-base font-bold"
                >
                  About {pet.name}
                </h2>
                <p
                  style={{ color: "rgba(59, 36, 24, 0.8)" }}
                  className="text-sm leading-relaxed"
                >
                  {pet.bio}
                </p>
              </div>
            )}

            <div
              style={{ paddingTop: "0.5rem" }}
              className="flex flex-wrap gap-3"
            >
              {isOwner ? (
                <p
                  style={{
                    backgroundColor: "#F2E8DA",
                    color: "#3B2418",
                    padding: "0.75rem 1.5rem",
                    border: "1px solid rgba(59, 36, 24, 0.2)",
                  }}
                  className="rounded-full text-sm font-semibold m-0"
                >
                  You listed this pet
                </p>
              ) : !isAvailable ? (
                <p
                  style={{
                    backgroundColor: "#F2E8DA",
                    color: "rgba(59, 36, 24, 0.6)",
                    padding: "0.75rem 1.5rem",
                    border: "1px solid rgba(59, 36, 24, 0.15)",
                  }}
                  className="rounded-full text-sm font-semibold m-0"
                >
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
