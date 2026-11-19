import PetDetails from '@/components/PetDetails';
import { auth } from '@/lib/auth';
import { getPetById } from '@/lib/pets/data';
import { headers } from 'next/headers';
import React from 'react';

const PetDetailPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
      headers: await headers()
    });
  const pet = await getPetById(id,token);
  return (
    <div>
      <PetDetails key={pet._id} pet={pet} />
    </div>
  );
};

export default PetDetailPage;