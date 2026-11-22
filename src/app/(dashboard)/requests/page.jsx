"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { getMyRequests } from "@/lib/pets/data";
import { cancelAdoptionRequest } from "@/lib/pets/action";
import Loading from "@/components/Loading";

function getStatusClasses(status) {
  if (status === "approved") return "bg-accent text-accent-foreground";
  if (status === "rejected") return "bg-danger/15 text-danger";
  return "bg-surface text-surface-foreground";
}

export default function RequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;

    const loadRequests = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const data = await getMyRequests(email, tokenData?.token);
        setRequests(data);
      } catch (err) {
        toast.error(err.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [session?.user?.email]);

  const handleCancel = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      await cancelAdoptionRequest(id, tokenData?.token);
      setRequests((prev) => prev.filter((item) => item._id !== id));
      toast.success("Request cancelled");
    } catch (err) {
      toast.error(err.message || "Failed to cancel request");
    }
  };

  return (
    <section className="min-h-screen w-full bg-background px-6 pb-16 pt-10 text-foreground">
      <div className="mx-auto max-w-[900px]">
        <h1 className="mb-6 font-serif text-3xl font-bold">My Requests</h1>

        {loading ? (
          <Loading fullScreen={false} />
        ) : requests.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-8 text-center">
            <p className="mb-4 text-sm text-surface-foreground/85">
              You haven&apos;t submitted any adoption requests yet.
            </p>
            <Link
              href="/pets"
              className="inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-surface p-5 sm:flex-row sm:items-center"
              >
                <div className="flex flex-col gap-1 text-sm text-surface-foreground">
                  <h2 className="font-serif text-lg font-bold">{req.petName}</h2>
                  <p>
                    <strong>Request Date:</strong> {req.requestDate}
                  </p>
                  <p>
                    <strong>Pickup Date:</strong> {req.pickupDate}
                  </p>
                  <p className="capitalize">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClasses(
                        req.status
                      )}`}
                    >
                      {req.status}
                    </span>
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  <Link
                    href={`/pets/${req.petId}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:opacity-85"
                  >
                    <Eye className="size-3.5" />
                    View
                  </Link>

                  <Button
                    size="sm"
                    onPress={() => handleCancel(req._id)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-danger/15 px-4 py-2 text-xs font-semibold text-danger hover:opacity-85"
                  >
                    <Trash2 className="size-3.5" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}