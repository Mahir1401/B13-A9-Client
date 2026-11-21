"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Check, X, PawPrint, Calendar, Mail, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getPetRequests } from "@/lib/pets/data";
import { updateRequestStatus } from "@/lib/pets/action";
import Loading from "./Loading";

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

  const getStatusBadgeStyle = (status) => {
    if (status === "approved") {
      return {
        backgroundColor: "#8EC5FF",
        color: "#3B2418",
        border: "1px solid rgba(59, 36, 24, 0.2)",
      };
    }
    if (status === "rejected") {
      return {
        backgroundColor: "#FEE2E2",
        color: "#991B1B",
        border: "1px solid rgba(153, 27, 27, 0.25)",
      };
    }
    return {
      backgroundColor: "#F9F4ED",
      color: "#3B2418",
      border: "1px solid rgba(59, 36, 24, 0.22)",
    };
  };

  return (
    <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Backdrop style={{ backgroundColor: "rgba(59, 36, 24, 0.45)", backdropFilter: "blur(4px)" }}>
        <Modal.Container>
          <Modal.Dialog
            style={{
              maxWidth: "480px",
              width: "100%",
              padding: "2rem",
              backgroundColor: "#F9F4ED",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.18)",
            }}
            className="rounded-3xl shadow-xl relative"
          >
            <Modal.CloseTrigger
              style={{
                color: "#3B2418",
                backgroundColor: "#F2E8DA",
                border: "1px solid rgba(59, 36, 24, 0.18)",
              }}
              className="rounded-full p-1.5 hover:opacity-80 transition-opacity cursor-pointer"
            />

            <Modal.Header
              style={{
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(59, 36, 24, 0.12)",
              }}
              className="flex flex-col items-start gap-2"
            >
              <p
                style={{
                  backgroundColor: "#F2E8DA",
                  color: "#3B2418",
                  padding: "0.25rem 0.85rem",
                  border: "1px solid rgba(59, 36, 24, 0.18)",
                }}
                className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold"
              >
                <PawPrint className="w-3.5 h-3.5" style={{ color: "#3B2418" }} />
                Review Applications
              </p>

              <Modal.Heading
                style={{ color: "#3B2418" }}
                className="text-2xl font-bold font-[Fraunces] tracking-tight"
              >
                Adoption Requests
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body
              style={{ marginTop: "1.25rem", maxHeight: "65vh" }}
              className="flex flex-col gap-3.5 overflow-y-auto pr-1"
            >
              {loading ? (
                <Loading />
              ) : requests.length === 0 ? (
                <div
                  style={{
                    padding: "2rem 1rem",
                    backgroundColor: "#F2E8DA",
                    border: "1px solid rgba(59, 36, 24, 0.14)",
                  }}
                  className="rounded-2xl text-center"
                >
                  <p style={{ color: "rgba(59, 36, 24, 0.75)" }} className="text-sm font-medium">
                    No requests yet.
                  </p>
                </div>
              ) : (
                requests.map((req) => (
                  <div
                    key={req._id}
                    style={{
                      padding: "1.15rem 1.25rem",
                      backgroundColor: "#F2E8DA",
                      border: "1px solid rgba(59, 36, 24, 0.16)",
                    }}
                    className="rounded-2xl text-sm flex flex-col gap-2"
                  >
                    <div
                      style={{
                        paddingBottom: "0.6rem",
                        borderBottom: "1px solid rgba(59, 36, 24, 0.1)",
                      }}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 shrink-0" style={{ color: "#3B2418" }} />
                        <p style={{ color: "#3B2418" }} className="font-bold text-base m-0">
                          {req.userName}
                        </p>
                      </div>

                      <p
                        style={{
                          ...getStatusBadgeStyle(req.status),
                          padding: "0.2rem 0.75rem",
                        }}
                        className="rounded-full text-xs font-semibold capitalize m-0"
                      >
                        {req.status}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs" style={{ color: "rgba(59, 36, 24, 0.85)" }}>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: "#3B2418" }} />
                        <p className="m-0">{req.userEmail}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: "#3B2418" }} />
                        <p className="m-0">
                          <strong>Pickup Date:</strong> {req.pickupDate}
                        </p>
                      </div>
                    </div>

                    {req.status === "pending" && (
                      <div style={{ marginTop: "0.5rem" }} className="flex gap-2.5">
                        <Button
                          size="sm"
                          onPress={() => handleStatus(req._id, "approved")}
                          style={{
                            backgroundColor: "#8EC5FF",
                            color: "#3B2418",
                            padding: "0.55rem 1.15rem",
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          onPress={() => handleStatus(req._id, "rejected")}
                          style={{
                            backgroundColor: "#F9F4ED",
                            color: "#3B2418",
                            padding: "0.55rem 1.15rem",
                            border: "1px solid rgba(59, 36, 24, 0.25)",
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-semibold hover:opacity-80 active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
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
