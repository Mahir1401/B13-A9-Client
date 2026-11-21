import PetDetails from '@/components/PetDetails';
import { auth } from '@/lib/auth';
import { getPetById } from '@/lib/pets/data';
import { headers } from 'next/headers';
import React from 'react';

const PetDetailPage = async ({ params }) => {
  const { id } = await params;
  const reqHeaders = await headers();

  const [sessionData, { token }] = await Promise.all([
    auth.api.getSession({ headers: reqHeaders }),
    auth.api.getToken({ headers: reqHeaders }),
  ]);

  const pet = await getPetById(id, token);

  return (
    <div className='flex'>
      <PetDetails key={pet._id} pet={pet} user={sessionData?.user} />
    </div>
  );
};

export default PetDetailPage;
