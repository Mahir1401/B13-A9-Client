"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, TextArea, Button, Modal } from "@heroui/react";
import { Heart } from "lucide-react";
import { submitAdoptionRequest } from "@/lib/pets/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RequestFormModal({ pet, user, token }) {
  const router = useRouter();
  const isAvailable = pet?.status === "Available";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [request, setRequest] = useState({
    petId: pet?._id || "",
    petName: pet?.name || "",
    petImage: pet?.image || "",
    userName: user?.name || "",
    userEmail: user?.email || "",
    pickupDate: "",
    message: "",
  });

  if (!pet) return null;

  const inputStyle = {
    padding: "0.7rem 1rem",
    backgroundColor: "#F2E8DA",
    color: "#3B2418",
    border: "1px solid rgba(59, 36, 24, 0.2)",
  };

  const labelStyle = {
    color: "#3B2418",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitAdoptionRequest(request, token);
      toast.success("Adoption request submitted!");
      router.push("/requests");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to submit adoption request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button
        type="button"
        isDisabled={!isAvailable}
        style={{
          backgroundColor: isAvailable
            ? "#8EC5FF"
            : "rgba(59, 36, 24, 0.15)",
          color: isAvailable ? "#3B2418" : "rgba(59, 36, 24, 0.45)",
          padding: "0.85rem 1.75rem",
          cursor: isAvailable ? "pointer" : "not-allowed",
        }}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all shadow-xs"
      >
        <Heart className="w-4 h-4" />
        Adopt
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog
            style={{
              maxWidth: "460px",
              width: "100%",
              padding: "2rem",
              backgroundColor: "#F9F4ED",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.15)",
            }}
            className="rounded-3xl shadow-lg"
          >
            <Modal.CloseTrigger />

            <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Modal.Header
                style={{
                  paddingBottom: "1rem",
                  marginBottom: "0.25rem",
                  borderBottom: "1px solid rgba(59, 36, 24, 0.12)",
                }}
                className="flex items-center justify-between gap-3 pr-6"
              >
                <Modal.Heading
                  style={{ color: "#3B2418" }}
                  className="font-[Fraunces] text-xl font-bold tracking-tight"
                >
                  Request to Adopt {pet.name}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="flex flex-col gap-3.5 p-0">
                <TextField
                  name="petName"
                  isReadOnly
                  className="flex flex-col gap-1.5"
                >
                  <Label
                    style={labelStyle}
                    className="text-xs font-semibold uppercase tracking-wider opacity-80"
                  >
                    Pet Name
                  </Label>
                  <Input
                    value={request.petName}
                    readOnly
                    style={inputStyle}
                    className="w-full rounded-xl text-sm font-medium opacity-80 focus:outline-none"
                  />
                </TextField>

                <TextField
                  name="userName"
                  isRequired
                  isReadOnly
                  className="flex flex-col gap-1.5"
                >
                  <Label
                    style={labelStyle}
                    className="text-xs font-semibold uppercase tracking-wider opacity-80"
                  >
                    User Name
                  </Label>
                  <Input
                    value={request.userName}
                    readOnly
                    style={inputStyle}
                    className="w-full rounded-xl text-sm font-medium opacity-80 focus:outline-none"
                  />
                </TextField>

                <TextField
                  name="userEmail"
                  type="email"
                  isRequired
                  isReadOnly
                  className="flex flex-col gap-1.5"
                >
                  <Label
                    style={labelStyle}
                    className="text-xs font-semibold uppercase tracking-wider opacity-80"
                  >
                    User Email
                  </Label>
                  <Input
                    value={request.userEmail}
                    readOnly
                    style={inputStyle}
                    className="w-full rounded-xl text-sm font-medium opacity-80 focus:outline-none"
                  />
                </TextField>

                <TextField
                  name="pickupDate"
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label
                    style={labelStyle}
                    className="text-xs font-semibold uppercase tracking-wider opacity-80"
                  >
                    Pickup Date
                  </Label>
                  <Input
                    type="date"
                    value={request.pickupDate}
                    onChange={(e) =>
                      setRequest({ ...request, pickupDate: e.target.value })
                    }
                    style={inputStyle}
                    className="w-full rounded-xl text-sm font-medium focus:outline-none"
                  />
                </TextField>

                <TextField
                  name="message"
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label
                    style={labelStyle}
                    className="text-xs font-semibold uppercase tracking-wider opacity-80"
                  >
                    Message
                  </Label>
                  <TextArea
                    rows={3}
                    placeholder="Tell the owner why you'd be a great fit..."
                    value={request.message}
                    onChange={(e) =>
                      setRequest({ ...request, message: e.target.value })
                    }
                    style={inputStyle}
                    className="w-full rounded-xl text-sm font-medium focus:outline-none"
                  />
                </TextField>
              </Modal.Body>

              <Modal.Footer style={{ marginTop: "0.75rem" }} className="p-0">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  style={{
                    backgroundColor: "#8EC5FF",
                    color: "#3B2418",
                    padding: "0.8rem 1.25rem",
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                >
                  {isSubmitting ? "Submitting..." : "Adopt"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
