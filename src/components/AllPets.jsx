"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

export default function AllPets() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedSpecies, setSelectedSpecies] = useState(() => {
    const raw = searchParams.get("species");
    return raw ? raw.split(",") : [];
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const updateUrl = useCallback(
    (next) => {
      const params = new URLSearchParams();
      if (next.search) params.set("search", next.search);
      if (next.species.length > 0) params.set("species", next.species.join(","));
      if (next.sort) params.set("sort", next.sort);

      const queryString = params.toString();
      startTransition(() => {
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });
      });
    },
    [router, pathname]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      updateUrl({ search, species: selectedSpecies, sort });
    }, 350);
    return () => clearTimeout(delay);
  }, [search, selectedSpecies, sort, updateUrl]);

  const handleSpeciesToggle = (species) => {
    setSelectedSpecies((prev) =>
      prev.includes(species)
        ? prev.filter((item) => item !== species)
        : [...prev, species]
    );
  };

  const handleReset = () => {
    setSearch("");
    setSelectedSpecies([]);
    setSort("");
  };

  const hasActiveFilters = Boolean(search || selectedSpecies.length > 0 || sort);

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-foreground/80">
            Search Pets
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, breed, species, or location..."
              className="w-full rounded-xl border border-border bg-field py-2.5 pl-10 pr-4 text-sm text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-foreground/80">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-border bg-field px-4 py-2.5 text-sm text-field-foreground focus:outline-none focus:ring-2 focus:ring-focus"
          >
            <option value="">Newest First</option>
            <option value="fee_asc">Adoption Fee: Low to High</option>
            <option value="fee_desc">Adoption Fee: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-separator pt-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-surface-foreground/80">
            Species:
          </span>
          {SPECIES_OPTIONS.map((species) => {
            const isSelected = selectedSpecies.includes(species);
            return (
              <button
                key={species}
                type="button"
                onClick={() => handleSpeciesToggle(species)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "bg-default text-default-foreground hover:opacity-80"
                }`}
              >
                {species}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-danger hover:underline"
          >
            <X className="size-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {isPending && <p className="text-xs text-muted">Updating results…</p>}
    </div>
  );
}