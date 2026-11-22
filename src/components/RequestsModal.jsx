"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Check, X, PawPrint, Calendar, Mail, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getPetRequests } from "@/lib/pets/data";
import { updateRequestStatus } from "@/lib/pets/action";
import Loading from "./Loading";

function getStatusClasses(status) {
  if (status === "approved") {
    return "bg-accent text-accent-foreground border-border";
  }
  if (status === "rejected") {
    return "bg-danger/15 text-danger border-danger/30";
  }
  return "bg-surface text-surface-foreground border-border";
}

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
      <Modal.Backdrop className="bg-brown/45 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="relative w-full max-w-[480px] rounded-3xl border border-border bg-overlay p-8 text-overlay-foreground shadow-xl">
            <Modal.CloseTrigger className="cursor-pointer rounded-full border border-border bg-background p-1.5 text-foreground transition-opacity hover:opacity-80" />

            <Modal.Header className="flex flex-col items-start gap-2 border-b border-separator pb-4">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-semibold text-foreground">
                <PawPrint className="size-3.5" />
                Review Applications
              </p>

              <Modal.Heading className="font-serif text-2xl font-bold tracking-tight text-foreground">
                Adoption Requests
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="mt-5 flex max-h-[65vh] flex-col gap-3.5 overflow-y-auto pr-1">
              {loading ? (
                <Loading fullScreen={false} />
              ) : requests.length === 0 ? (
                <div className="rounded-2xl border border-border bg-background px-4 py-8 text-center">
                  <p className="text-sm font-medium text-foreground/75">
                    No requests yet.
                  </p>
                </div>
              ) : (
                requests.map((req) => (
                  <div
                    key={req._id}
                    className="flex flex-col gap-2 rounded-2xl border border-border bg-background px-5 py-4 text-sm"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-separator pb-2.5">
                      <div className="flex items-center gap-2">
                        <User className="size-4 shrink-0 text-foreground" />
                        <p className="text-base font-bold text-foreground">
                          {req.userName}
                        </p>
                      </div>

                      <p
                        className={`rounded-full border px-3 py-0.5 text-xs font-semibold capitalize ${getStatusClasses(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-foreground/85">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3.5 shrink-0 text-foreground" />
                        <p>{req.userEmail}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 shrink-0 text-foreground" />
                        <p>
                          <strong>Pickup Date:</strong> {req.pickupDate}
                        </p>
                      </div>
                    </div>

                    {req.status === "pending" && (
                      <div className="mt-2 flex gap-2.5">
                        <Button
                          size="sm"
                          onPress={() => handleStatus(req._id, "approved")}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-accent px-[1.15rem] py-2 text-xs font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
                        >
                          <Check className="size-3.5" />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          onPress={() => handleStatus(req._id, "rejected")}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-[1.15rem] py-2 text-xs font-semibold text-surface-foreground transition-all hover:opacity-80 active:scale-[0.99]"
                        >
                          <X className="size-3.5" />
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