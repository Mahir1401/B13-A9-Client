"use client";

import React, { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { PawPrint, Plus, RotateCcw } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { createPet } from "@/lib/pets/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const speciesOptions = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
  { id: "bird", label: "Bird" },
  { id: "rabbit", label: "Rabbit" },
  { id: "other", label: "Other" },
];

const genderOptions = [
  { id: "Male", label: "Male" },
  { id: "Female", label: "Female" },
];

const vaccinationOptions = [
  { id: "up-to-date", label: "Up to Date" },
  { id: "partial", label: "Partially Vaccinated" },
  { id: "none", label: "Not Vaccinated" },
];

const healthOptions = [
  { id: "healthy", label: "Healthy" },
  { id: "special-needs", label: "Special Needs" },
  { id: "recovering", label: "Recovering" },
];

const inputClass =
  "w-full rounded-xl border border-border bg-field px-4 py-2.5 text-sm text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus";

const labelClass =
  "text-xs font-semibold uppercase tracking-wider text-foreground/80";

const errorClass = "text-xs text-danger";

// One dropdown field (label + trigger + options), used for every select below.
function SelectField({ name, label, placeholder, options }) {
  return (
    <Select
      isRequired
      name={name}
      placeholder={placeholder}
      className="flex flex-col gap-1.5"
    >
      <Label className={labelClass}>{label}</Label>

      <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-border bg-field px-4 py-2.5 text-sm text-field-foreground">
        <Select.Value className="text-field-foreground" />
        <Select.Indicator className="static inline-flex translate-none items-center text-field-foreground" />
      </Select.Trigger>

      <Select.Popover className="rounded-xl border border-border bg-overlay p-1 shadow-md">
        <ListBox>
          {options.map((item) => (
            <ListBox.Item
              key={item.id}
              id={item.id}
              textValue={item.label}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-overlay-foreground hover:bg-default"
            >
              {item.label}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>

      <FieldError className={errorClass} />
    </Select>
  );
}

export default function AddPetListingSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const rawData = Object.fromEntries(new FormData(e.currentTarget));
      const { data: tokenData } = await authClient.token();

      const petPayload = {
        name: rawData.petName,
        species: rawData.species,
        breed: rawData.breed,
        age: Number(rawData.age) || 0,
        gender: rawData.gender,
        image: rawData.imageUrl,
        healthStatus: rawData.healthStatus,
        vaccinationStatus: rawData.vaccinationStatus,
        location: rawData.location,
        fee: Number(rawData.adoptionFee) || 0,
        bio: rawData.description,
        ownerEmail: session?.user?.email || rawData.ownerEmail,
      };

      await createPet(petPayload, tokenData?.token);
      toast.success("Pet listing added successfully!");
      router.push("/listings");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to add pet listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-background px-6 pb-[4.5rem] pt-12 text-foreground">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-8">
          <p className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-surface-foreground">
            <Plus className="size-3.5" />
            List a Pet
          </p>

          <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Add a{" "}
            <strong className="inline-block rounded-full bg-accent px-4 py-0.5 font-bold text-accent-foreground">
              Pet Listing
            </strong>
          </h1>

          <p className="text-sm text-foreground/75">
            Help a pet find their forever home by creating a detailed listing.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface px-8 py-9 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5 border-b border-separator pb-4">
            <PawPrint className="size-5 text-foreground" />
            <h2 className="font-serif text-xl font-bold text-foreground">
              Pet Information
            </h2>
          </div>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              <TextField isRequired name="petName" className="flex flex-col gap-1.5">
                <Label className={labelClass}>Pet Name</Label>
                <Input placeholder="e.g. Buddy" className={inputClass} />
                <FieldError className={errorClass} />
              </TextField>

              <SelectField
                name="species"
                label="Species"
                placeholder="Select species"
                options={speciesOptions}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              <TextField isRequired name="breed" className="flex flex-col gap-1.5">
                <Label className={labelClass}>Breed</Label>
                <Input placeholder="e.g. Labrador Retriever" className={inputClass} />
                <FieldError className={errorClass} />
              </TextField>

              <TextField isRequired name="age" type="number" className="flex flex-col gap-1.5">
                <Label className={labelClass}>Age (years)</Label>
                <Input min={0} step="0.5" placeholder="e.g. 2" className={inputClass} />
                <FieldError className={errorClass} />
              </TextField>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              <SelectField
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
              />

              <SelectField
                name="vaccinationStatus"
                label="Vaccination Status"
                placeholder="Select status"
                options={vaccinationOptions}
              />
            </div>

            <TextField isRequired name="imageUrl" type="url" className="flex flex-col gap-1.5">
              <Label className={labelClass}>
                Pet Image URL (upload to imgbb.com first)
              </Label>
              <Input placeholder="https://ibb.co..." className={inputClass} />
              <FieldError className={errorClass} />
            </TextField>

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              <SelectField
                name="healthStatus"
                label="Health Status"
                placeholder="Select health status"
                options={healthOptions}
              />

              <TextField isRequired name="location" className="flex flex-col gap-1.5">
                <Label className={labelClass}>Location</Label>
                <Input placeholder="e.g. New York, NY" className={inputClass} />
                <FieldError className={errorClass} />
              </TextField>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              <TextField
                name="adoptionFee"
                type="number"
                defaultValue="0"
                className="flex flex-col gap-1.5"
              >
                <Label className={labelClass}>Adoption Fee ($) — 0 for free</Label>
                <Input min={0} className={inputClass} />
              </TextField>

              <TextField
                name="ownerEmail"
                type="email"
                isReadOnly
                value={session?.user?.email || ""}
                className="flex flex-col gap-1.5"
              >
                <Label className={labelClass}>Owner Email</Label>
                <Input readOnly className={`${inputClass} opacity-80`} />
              </TextField>
            </div>

            <TextField isRequired name="description" className="flex flex-col gap-1.5">
              <Label className={labelClass}>Description</Label>
              <TextArea
                rows={3}
                placeholder="Describe the pet's personality, habits, needs and anything adopters should know..."
                className={inputClass}
              />
              <FieldError className={errorClass} />
            </TextField>

            <div className="mt-3 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2">
              <Button
                type="reset"
                variant="secondary"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-85"
              >
                <RotateCcw className="size-4" />
                Reset Form
              </Button>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                {isSubmitting ? "Publishing..." : "Publish Listing"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}