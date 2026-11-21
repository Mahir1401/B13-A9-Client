"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getPetRequests } from "@/lib/pets/data";
import { updateRequestStatus } from "@/lib/pets/action";

export default function RequestsModal({ petId, open, onClose, onApproved }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open || !petId) return;

    const loadRequests = async () => {
      setLoading(true);
      try {
        const { data: tokenData } = await authClient.token();
        const data = await getPetRequests(petId, tokenData?.token);
        setRequests(data);
      } catch (err) {
        toast.error(err.message || "Could not load requests");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [petId, open]);

  const handleStatus = async (requestId, status) => {
    try {
      const { data: tokenData } = await authClient.token();
      await updateRequestStatus(requestId, status, tokenData?.token);
      toast.success(`Request ${status}`);

      if (status === "approved") {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === requestId
              ? { ...r, status: "approved" }
              : r.status === "pending"
              ? { ...r, status: "rejected" }
              : r
          )
        );
        onApproved?.(petId);
      } else {
        setRequests((prev) =>
          prev.map((r) => (r._id === requestId ? { ...r, status } : r))
        );
      }
    } catch (err) {
      toast.error(err.message || "Could not update request");
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md w-full p-6 rounded-3xl bg-[#F9F4ED] text-[#3B2418]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-xl font-bold font-[Fraunces]">
                Adoption Requests
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-3 mt-3">
              {loading ? (
                <p className="text-sm">Loading...</p>
              ) : requests.length === 0 ? (
                <p className="text-sm">No requests yet.</p>
              ) : (
                requests.map((req) => (
                  <div
                    key={req._id}
                    className="p-4 rounded-2xl bg-[#F2E8DA] border border-[#3B2418]/15 text-sm flex flex-col gap-1"
                  >
                    <p><strong>Name:</strong> {req.userName}</p>
                    <p><strong>Email:</strong> {req.userEmail}</p>
                    <p><strong>Pickup Date:</strong> {req.pickupDate}</p>
                    <p className="capitalize"><strong>Status:</strong> {req.status}</p>

                    {req.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          onPress={() => handleStatus(req._id, "approved")}
                          className="rounded-full bg-[#8EC5FF] text-[#3B2418] font-semibold cursor-pointer"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          onPress={() => handleStatus(req._id, "rejected")}
                          className="rounded-full bg-red-100 text-red-800 font-semibold cursor-pointer"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
