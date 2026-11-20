import React from 'react';
import Link from 'next/link';
import { ArrowRight, PawPrint } from 'lucide-react';
import PetCard from './PetCard';
import { getAllPets } from '@/lib/pets/data';

const FeaturedPets = async () => {
  const pets = await getAllPets();
  const featuredPets = pets.slice(0, 6);

  return (
    <section
      style={{ padding: '4.5rem 1.5rem' }}
      className="w-full bg-[#F2E8DA] dark:bg-[#23150E] text-[#3B2418] dark:text-[#F2E8DA] transition-colors"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{ maxWidth: '640px', margin: '0 auto 3rem' }}
          className="text-center flex flex-col items-center"
        >
          <p
            style={{
              backgroundColor: '#F9F4ED',
              color: '#3B2418',
              padding: '0.35rem 1rem',
              marginBottom: '1rem',
              border: '1px solid rgba(59, 36, 24, 0.18)',
            }}
            className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold"
          >
            <PawPrint className="w-3.5 h-3.5" style={{ color: '#3B2418' }} />
            Forever Homes
          </p>

          <h2
            style={{ marginBottom: '1rem', color: '#3B2418' }}
            className="font-[Fraunces] text-3xl sm:text-5xl font-bold tracking-tight leading-tight dark:!text-[#F2E8DA]"
          >
            Pets Available for{' '}
            <strong
              style={{
                backgroundColor: '#8EC5FF',
                color: '#3B2418',
                padding: '0.1rem 1.1rem',
              }}
              className="inline-block font-bold rounded-full"
            >
              Adoption
            </strong>
          </h2>

          <p
            style={{ color: 'rgba(59, 36, 24, 0.78)' }}
            className="text-sm sm:text-base dark:!text-[#F2E8DA]/75 leading-relaxed"
          >
            These wonderful pets are waiting for their forever homes. Will you
            be the one to change their lives?
          </p>
        </div>

        {featuredPets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPets.map((pet, index) => (
                <PetCard key={pet._id || pet.id} pet={pet} index={index} />
              ))}
            </div>

            <div style={{ marginTop: '3rem' }} className="text-center">
              <Link
                href="/pets"
                style={{
                  backgroundColor: '#8EC5FF',
                  color: '#3B2418',
                  padding: '0.85rem 2rem',
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold rounded-full hover:opacity-90 active:scale-[0.99] transition-all shadow-xs"
              >
                View All Pets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div
            style={{
              padding: '3rem 1.5rem',
              border: '1px solid rgba(59, 36, 24, 0.15)',
            }}
            className="bg-[#F9F4ED] dark:bg-[#2B1A11] rounded-3xl text-center max-w-md mx-auto"
          >
            <p
              style={{ color: 'rgba(59, 36, 24, 0.78)' }}
              className="text-sm font-medium dark:!text-[#F2E8DA]/75"
            >
              No pets available for adoption right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPets;
