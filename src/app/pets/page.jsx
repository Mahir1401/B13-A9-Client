import PetCard from "@/components/PetCard";
import { getAllPets } from "@/lib/data";

const Pets = async () => {
  const pets = await getAllPets();
  return (
    <div>
      here is the pets page
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Pets;