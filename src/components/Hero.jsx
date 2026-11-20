"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  PawPrint,
  ArrowUpRight,
  Dog,
  Cat,
  Bird,
  Rabbit,
  MapPin,
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (location.trim()) params.set("location", location.trim());
    router.push(`/pets?${params.toString()}`);
  };

  const categories = [
    { id: "all", label: "All Pets", icon: PawPrint },
    { id: "dog", label: "Dogs", icon: Dog },
    { id: "cat", label: "Cats", icon: Cat },
    { id: "bird", label: "Birds", icon: Bird },
    { id: "rabbit", label: "Rabbits", icon: Rabbit },
  ];

  const featuredPets = [
    {
      name: "Bruno",
      breed: "Golden Retriever • 8 mos",
      type: "Dog",
      cardBg: "bg-[#E8D7C1]",
      badgeClass: "bg-[var(--color-baby-blue)]",
      Icon: Dog,
      tiltClass: "sm:-rotate-2 hover:rotate-0",
    },
    {
      name: "Milo",
      breed: "Tabby Cat • 1 yr",
      type: "Cat",
      cardBg: "bg-[#DCE7F2]",
      badgeClass: "bg-[var(--color-cream)] border border-[var(--color-border)]",
      Icon: Cat,
      tiltClass: "sm:-translate-y-3",
    },
    {
      name: "Snowy",
      breed: "Holland Lop • 6 mos",
      type: "Rabbit",
      cardBg: "bg-[#E6DFD3]",
      badgeClass: "bg-[var(--color-baby-blue)]",
      Icon: Rabbit,
      tiltClass: "sm:rotate-2 hover:rotate-0",
    },
  ];

  return (
    <section className="w-full bg-[var(--color-cream)] text-[var(--color-brown)] px-6 pt-16 pb-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="badge inline-flex items-center gap-2 !px-4 !py-1.5 !mb-6 font-bold">
          <PawPrint className="w-3.5 h-3.5 text-[var(--color-baby-blue-hover)]" />
          <span>Every Pet Deserves a Warm Nest</span>
        </div>

        <h1 className="font-[var(--font-serif)] text-4xl sm:text-6xl font-bold tracking-tight leading-[1.12] max-w-3xl mb-5">
          Bring Home a{" "}
          <span className="underline decoration-[var(--color-baby-blue)] decoration-4 underline-offset-8">
            New Best Friend
          </span>{" "}
          Today
        </h1>

        <p className="text-[var(--color-brown-muted)] text-base sm:text-lg max-w-xl leading-relaxed mb-9">
          Connect directly with trusted shelters and loving foster homes near
          you to adopt or rehome pets safely.
        </p>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl bg-[var(--color-cream-light)] border border-[var(--color-border)] p-2.5 rounded-3xl sm:rounded-full shadow-xs flex flex-col sm:flex-row items-center gap-2 mb-5"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto px-2 py-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-[var(--color-brown)] text-[var(--color-cream)]"
                      : "text-[var(--color-brown)] hover:bg-[var(--color-cream)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block h-6 w-px bg-[var(--color-border)]" />

          <div className="flex items-center gap-2 flex-1 w-full px-3 py-1.5">
            <MapPin className="w-4 h-4 text-[var(--color-brown-muted)] shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or area..."
              className="w-full bg-transparent text-sm text-[var(--color-brown)] placeholder:text-[var(--color-brown-muted)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[var(--color-baby-blue)] hover:bg-[var(--color-baby-blue-hover)] text-[var(--color-brown)] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold active:scale-[0.99] transition-all cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4" />
            Find Pets
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs font-semibold mb-14">
          <span className="text-[var(--color-brown-muted)]">
            Have a pet needing a home?
          </span>
          <Link
            href="/add-pet"
            className="inline-flex items-center gap-1 text-[var(--color-brown)] underline hover:opacity-75"
          >
            Post a listing <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredPets.map((pet) => {
            const PetIcon = pet.Icon;
            return (
              <div
                key={pet.name}
                className={`bg-[var(--color-cream-light)] border border-[var(--color-border)] rounded-3xl p-3.5 shadow-xs transition-transform duration-300 ${pet.tiltClass}`}
              >
                <div
                  className={`${pet.cardBg} rounded-2xl h-56 flex flex-col items-center justify-center gap-2.5 mb-3.5`}
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--color-cream-light)] flex items-center justify-center shadow-2xs">
                    <PetIcon className="w-8 h-8 text-[var(--color-brown)]" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--color-brown-muted)]">
                    Ready for Adoption
                  </span>
                </div>

                <div className="flex items-center justify-between text-left px-1">
                  <div>
                    <p className="text-sm font-bold text-[var(--color-brown)]">
                      {pet.name}
                    </p>
                    <p className="text-xs text-[var(--color-brown-muted)]">
                      {pet.breed}
                    </p>
                  </div>

                  <span
                    className={`${pet.badgeClass} text-[var(--color-brown)] text-xs font-bold px-3 py-1 rounded-full`}
                  >
                    {pet.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
