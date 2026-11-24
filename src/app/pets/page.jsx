import AllPets from "@/components/AllPets";
import PetCard from "@/components/PetCard";
import { getAllPets } from "@/lib/pets/data";

const Pets = async ({ searchParams }) => {
  const params = (await searchParams) || {};
  const search = params.search || "";
  const species = params.species || "";
  const sort = params.sort || "";

  const pets = await getAllPets({ search, species, sort });

  return (
    <section className="min-h-screen w-full bg-background px-6 pb-16 pt-10 text-foreground">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            All Pets
          </h1>
          <p className="text-sm text-foreground/75">
            Search and filter to find your new best friend.
          </p>
        </div>

        <AllPets />

        {pets.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-10 text-center">
            <p className="text-sm text-surface-foreground/85">
              No pets matched your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet, index) => (
              <PetCard key={pet._id} pet={pet} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pets;