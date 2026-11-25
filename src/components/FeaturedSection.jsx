import React from 'react';
import Link from 'next/link';
import { ArrowRight, PawPrint } from 'lucide-react';
import PetCard from './PetCard';
import { getAllPets } from '@/lib/pets/data';

const FeaturedPets = async () => {
  const pets = await getAllPets();
  const featuredPets = pets.slice(0, 6);

  return (
    <section className="w-full bg-background px-6 py-[4.5rem] text-foreground transition-colors">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 flex max-w-[640px] flex-col items-center text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-surface-foreground">
            <PawPrint className="size-3.5" />
            Forever Homes
          </p>

          <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Pets Available for{' '}
            <strong className="inline-block rounded-full bg-accent px-4 py-0.5 font-bold text-accent-foreground">
              Adoption
            </strong>
          </h2>

          <p className="text-sm leading-relaxed text-foreground/75 sm:text-base">
            These wonderful pets are waiting for their forever homes. Will you
            be the one to change their lives?
          </p>
        </div>

        {featuredPets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPets.map((pet, index) => (
                <PetCard key={pet._id} pet={pet} index={index} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/pets"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
              >
                View All Pets
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-md rounded-3xl border border-border bg-surface px-6 py-12 text-center">
            <p className="text-sm font-medium text-foreground/75">
              No pets available for adoption right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPets;