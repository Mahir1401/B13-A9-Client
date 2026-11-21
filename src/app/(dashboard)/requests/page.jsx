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
    <section
      style={{
        padding: "2.5rem 1.5rem 4rem",
        backgroundColor: "#F2E8DA",
        color: "#3B2418",
      }}
      className="min-h-screen w-full"
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 className="font-[Fraunces] text-3xl font-bold mb-6">
          My Requests
        </h1>

        {loading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#F9F4ED] border border-[#3B2418]/15 text-center">
            <p className="text-sm mb-4">You haven&apos;t submitted any adoption requests yet.</p>
            <Link
              href="/pets"
              className="inline-block px-5 py-2.5 rounded-full bg-[#8EC5FF] text-[#3B2418] text-sm font-semibold"
            >
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="p-5 rounded-3xl bg-[#F9F4ED] border border-[#3B2418]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1 text-sm">
                  <h2 className="font-[Fraunces] text-lg font-bold">
                    {req.petName}
                  </h2>
                  <p>
                    <strong>Request Date:</strong> {req.requestDate}
                  </p>
                  <p>
                    <strong>Pickup Date:</strong> {req.pickupDate}
                  </p>
                  <p className="capitalize">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        req.status === "approved"
                          ? "bg-[#8EC5FF] text-[#3B2418]"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-[#F2E8DA] text-[#3B2418]"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href={`/pets/${req.petId}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2E8DA] border border-[#3B2418]/20 text-xs font-semibold hover:opacity-85"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>

                  <Button
                    size="sm"
                    onPress={() => handleCancel(req._id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-100 text-red-800 text-xs font-semibold cursor-pointer hover:opacity-85"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
