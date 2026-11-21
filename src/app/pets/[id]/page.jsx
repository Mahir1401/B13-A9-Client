"use client";

import PetDetails from "@/components/PetDetails";
import { authClient, useSession } from "@/lib/auth-client";
import { getPetById } from "@/lib/pets/data";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [pet, setPet] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push(`/login?callbackUrl=/pets/${id}`);
      return;
    }

    const loadPet = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const jwt = tokenData?.token;
        setToken(jwt);
        const data = await getPetById(id, jwt);
        if (!data?._id) {
          router.push("/not-found");
          return;
        }
        setPet(data);
      } catch {
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id, session, isPending, router]);

  if (loading || isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F2E8DA] text-[#3B2418]">
        <p className="text-sm font-semibold">Loading pet details...</p>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="flex">
      <PetDetails key={pet._id} pet={pet} user={session?.user} token={token} />
    </div>
  );
}
