"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Button,
  Modal,
} from "@heroui/react";
import { Heart, PawPrint, Send } from "lucide-react";
import { submitAdoptionRequest } from "@/lib/pets/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RequestFormModal({ pet, user, token }) {
  const router = useRouter();
  const isAvailable = pet?.status === "Available";
  const [isOpen, setIsOpen] = useState(false);
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
    border: "1px solid rgba(59, 36, 24, 0.22)",
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
      setIsOpen(false);
      router.push("/requests");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to submit adoption request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        isDisabled={!isAvailable}
        onPress={() => isAvailable && setIsOpen(true)}
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
        {isAvailable ? `Adopt ${pet.name}` : pet.status}
      </Button>

      <Modal.Backdrop
        style={{
          backgroundColor: "rgba(59, 36, 24, 0.45)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Modal.Container>
          <Modal.Dialog
            style={{
              maxWidth: "460px",
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

            <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Modal.Header
                style={{
                  paddingBottom: "1rem",
                  marginBottom: "0.25rem",
                  borderBottom: "1px solid rgba(59, 36, 24, 0.12)",
                }}
                className="flex flex-col items-start gap-2 pr-8"
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
                  <PawPrint
                    className="w-3.5 h-3.5"
                    style={{ color: "#3B2418" }}
                  />
                  Adoption Application
                </p>

                <Modal.Heading
                  style={{ color: "#3B2418" }}
                  className="font-[Fraunces] text-2xl font-bold tracking-tight"
                >
                  Adopt {pet.name}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body
                style={{ maxHeight: "65vh" }}
                className="flex flex-col gap-3.5 p-0 overflow-y-auto pr-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      className="w-full rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
                    />
                  </TextField>
                </div>

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
                    Your Name
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
                    Your Email
                  </Label>
                  <Input
                    value={request.userEmail}
                    readOnly
                    style={inputStyle}
                    className="w-full rounded-xl text-sm font-medium opacity-80 focus:outline-none"
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
                    Message to Owner
                  </Label>
                  <TextArea
                    rows={3}
                    placeholder="Tell the owner about your home and why you'd be a great fit..."
                    value={request.message}
                    onChange={(e) =>
                      setRequest({ ...request, message: e.target.value })
                    }
                    style={inputStyle}
                    className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
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
                    padding: "0.85rem 1.5rem",
                    opacity: isSubmitting ? 0.65 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Adoption Request"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
