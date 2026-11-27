"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, TextArea, Button, Modal } from "@heroui/react";
import { Heart, PawPrint, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { submitAdoptionRequest } from "@/lib/pets/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-xl border border-border bg-field px-4 py-2.5 text-sm font-medium text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus";

const readOnlyInputClass = `${inputClass} opacity-80`;

const labelClass =
  "text-xs font-semibold uppercase tracking-wider text-foreground/80";

const sizeClasses = {
  lg: "px-7 py-3.5 text-sm",
  sm: "px-4 py-2.5 text-xs",
};

export default function RequestFormModal({ pet, user, size = "lg" }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: tokenData } = await authClient.token();
      await submitAdoptionRequest(request, tokenData?.token);
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

  const triggerClassName = `inline-flex flex-1 items-center justify-center gap-2 rounded-full font-semibold shadow-xs transition-all ${
    sizeClasses[size] || sizeClasses.lg
  } ${
    isAvailable
      ? "cursor-pointer bg-accent text-accent-foreground hover:opacity-90 active:scale-[0.99]"
      : "cursor-not-allowed bg-default text-muted"
  }`;

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        isDisabled={!isAvailable}
        onPress={() => isAvailable && setIsOpen(true)}
        className={triggerClassName}
      >
        <Heart className="size-4" />
        {isAvailable ? `Adopt ${pet.name}` : pet.status}
      </Button>

      <Modal.Backdrop className="bg-brown/45 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="relative w-full max-w-[460px] rounded-3xl border border-border bg-overlay p-8 text-overlay-foreground shadow-xl">
            <Modal.CloseTrigger className="cursor-pointer rounded-full border border-border bg-background p-1.5 text-foreground transition-opacity hover:opacity-80" />

            <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Modal.Header className="mb-1 flex flex-col items-start gap-2 border-b border-separator pb-4 pr-8">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-semibold text-foreground">
                  <PawPrint className="size-3.5" />
                  Adoption Application
                </p>

                <Modal.Heading className="font-serif text-2xl font-bold tracking-tight text-foreground">
                  Adopt {pet.name}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="flex max-h-[65vh] flex-col gap-3.5 overflow-y-auto p-0 pr-1">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <TextField name="petName" isReadOnly className="flex flex-col gap-1.5">
                    <Label className={labelClass}>Pet Name</Label>
                    <Input value={request.petName} readOnly className={readOnlyInputClass} />
                  </TextField>

                  <TextField name="pickupDate" isRequired className="flex flex-col gap-1.5">
                    <Label className={labelClass}>Pickup Date</Label>
                    <Input
                      type="date"
                      value={request.pickupDate}
                      onChange={(e) =>
                        setRequest({ ...request, pickupDate: e.target.value })
                      }
                      className={inputClass}
                    />
                  </TextField>
                </div>

                <TextField name="userName" isRequired isReadOnly className="flex flex-col gap-1.5">
                  <Label className={labelClass}>Your Name</Label>
                  <Input value={request.userName} readOnly className={readOnlyInputClass} />
                </TextField>

                <TextField
                  name="userEmail"
                  type="email"
                  isRequired
                  isReadOnly
                  className="flex flex-col gap-1.5"
                >
                  <Label className={labelClass}>Your Email</Label>
                  <Input value={request.userEmail} readOnly className={readOnlyInputClass} />
                </TextField>

                <TextField name="message" isRequired className="flex flex-col gap-1.5">
                  <Label className={labelClass}>Message to Owner</Label>
                  <TextArea
                    rows={3}
                    placeholder="Tell the owner about your home and why you'd be a great fit..."
                    value={request.message}
                    onChange={(e) =>
                      setRequest({ ...request, message: e.target.value })
                    }
                    className={inputClass}
                  />
                </TextField>
              </Modal.Body>

              <Modal.Footer className="mt-3 p-0">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99] ${
                    isSubmitting ? "cursor-not-allowed opacity-65" : "cursor-pointer"
                  }`}
                >
                  <Send className="size-4" />
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