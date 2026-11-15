import PetCard from '@/components/PetCard';
import PetDetails from '@/components/PetDetails';
import { getPetById } from '@/lib/data';
import React from 'react';

const PetDetailPage = async ({ params }) => {
  const { id } = await params;
  const pet = await getPetById(id);
  return (
    <div>
      <PetDetails key={pet._id} pet={pet} />
    </div>
  );
};

export default PetDetailPage;