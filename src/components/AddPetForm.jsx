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

  const fieldInputStyle = {
    padding: "0.7rem 1rem",
    backgroundColor: "#F2E8DA",
    color: "#3B2418",
    border: "1px solid rgba(59, 36, 24, 0.25)",
  };

  const labelStyle = {
    color: "#3B2418",
  };

  return (
    <section
      style={{
        padding: "3rem 1.5rem 4.5rem",
        backgroundColor: "#F2E8DA",
        color: "#3B2418",
      }}
      className="min-h-screen w-full"
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              padding: "0.35rem 1rem",
              marginBottom: "0.85rem",
              border: "1px solid rgba(59, 36, 24, 0.18)",
            }}
            className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" style={{ color: "#3B2418" }} />
            List a Pet
          </p>

          <h1
            style={{ color: "#3B2418", marginBottom: "0.5rem" }}
            className="font-[Fraunces] text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Add a{" "}
            <strong
              style={{
                backgroundColor: "#8EC5FF",
                color: "#3B2418",
                padding: "0.1rem 1rem",
              }}
              className="inline-block font-bold rounded-full"
            >
              Pet Listing
            </strong>
          </h1>

          <p
            style={{ color: "rgba(59, 36, 24, 0.78)" }}
            className="text-sm"
          >
            Help a pet find their forever home by creating a detailed listing.
          </p>
        </div>

        <div
          style={{
            padding: "2.25rem 2rem",
            backgroundColor: "#F2E8DA",
            border: "1px solid rgba(59, 36, 24, 0.15)",
          }}
          className="rounded-3xl shadow-sm"
        >
          <div
            style={{
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid rgba(59, 36, 24, 0.12)",
            }}
            className="flex items-center gap-2.5"
          >
            <PawPrint className="w-5 h-5" style={{ color: "#3B2418" }} />
            <h2
              style={{ color: "#3B2418" }}
              className="font-[Fraunces] font-bold text-xl"
            >
              Pet Information
            </h2>
          </div>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <TextField isRequired name="petName" className="flex flex-col gap-1.5">
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Pet Name
                </Label>
                <Input
                  placeholder="e.g. Buddy"
                  style={fieldInputStyle}
                  className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>

              <Select
                isRequired
                name="species"
                placeholder="Select species"
                className="flex flex-col gap-1.5"
              >
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Species
                </Label>
                <Select.Trigger
                  style={fieldInputStyle}
                  className="w-full rounded-xl flex items-center justify-between text-sm"
                >
                  <Select.Value style={{ color: "#3B2418" }} />
                  <Select.Indicator
                    style={{
                      color: "#3B2418",
                      position: "static",
                      display: "inline-flex",
                      alignItems: "center",
                      transform: "none",
                    }}
                  />
                </Select.Trigger>

                <Select.Popover
                  style={{
                    backgroundColor: "#F2E8DA",
                    border: "1px solid rgba(59, 36, 24, 0.2)",
                  }}
                  className="rounded-xl shadow-md p-1"
                >
                  <ListBox>
                    {speciesOptions.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                        style={{ color: "#3B2418", padding: "0.5rem 0.75rem" }}
                        className="rounded-lg text-sm cursor-pointer hover:bg-[#F2E8DA]"
                      >
                        {item.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-red-600" />
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <TextField isRequired name="breed" className="flex flex-col gap-1.5">
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Breed
                </Label>
                <Input
                  placeholder="e.g. Labrador Retriever"
                  style={fieldInputStyle}
                  className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>

              <TextField isRequired name="age" type="number" className="flex flex-col gap-1.5">
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Age (years)
                </Label>
                <Input
                  min={0}
                  step="0.5"
                  placeholder="e.g. 2"
                  style={fieldInputStyle}
                  className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <Select
                isRequired
                name="gender"
                placeholder="Select gender"
                className="flex flex-col gap-1.5"
              >
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Gender
                </Label>                        
                <Select.Trigger
                  style={fieldInputStyle}
                  className="w-full rounded-xl flex items-center justify-between text-sm"
                >
                  <Select.Value style={{ color: "#3B2418" }} />
                  <Select.Indicator
                    style={{
                      color: "#3B2418",
                      position: "static",
                      display: "inline-flex",
                      alignItems: "center",
                      transform: "none",
                    }}
                  />
                </Select.Trigger>

                <Select.Popover
                  style={{
                    backgroundColor: "#F2E8DA",
                    border: "1px solid rgba(59, 36, 24, 0.2)",
                  }}
                  className="rounded-xl shadow-md p-1"
                >
                  <ListBox>
                    {genderOptions.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                        style={{ color: "#3B2418", padding: "0.5rem 0.75rem" }}
                        className="rounded-lg text-sm cursor-pointer hover:bg-[#F2E8DA]"
                      >
                        {item.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-red-600" />
              </Select>

              <Select
                isRequired
                name="vaccinationStatus"
                placeholder="Select status"
                className="flex flex-col gap-1.5"
              >
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Vaccination Status
                </Label>
                <Select.Trigger
                  style={fieldInputStyle}
                  className="w-full rounded-xl flex items-center justify-between text-sm"
                >
                  <Select.Value style={{ color: "#3B2418" }} />
                  <Select.Indicator
                    style={{
                      color: "#3B2418",
                      position: "static",
                      display: "inline-flex",
                      alignItems: "center",
                      transform: "none",
                    }}
                  />
                </Select.Trigger>

                <Select.Popover
                  style={{
                    backgroundColor: "#F2E8DA",
                    border: "1px solid rgba(59, 36, 24, 0.2)",
                  }}
                  className="rounded-xl shadow-md p-1"
                >
                  <ListBox>
                    {vaccinationOptions.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                        style={{ color: "#3B2418", padding: "0.5rem 0.75rem" }}
                        className="rounded-lg text-sm cursor-pointer hover:bg-[#F2E8DA]"
                      >
                        {item.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-red-600" />
              </Select>
            </div>

            <TextField isRequired name="imageUrl" type="url" className="flex flex-col gap-1.5">
              <Label
                style={labelStyle}
                className="text-xs font-semibold uppercase tracking-wider opacity-80"
              >
                Pet Image URL (upload to imgbb.com first)
              </Label>
              <Input
                placeholder="https://ibb.co..."
                style={fieldInputStyle}
                className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
              />
              <FieldError className="text-xs text-red-600" />
            </TextField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <Select
                isRequired
                name="healthStatus"
                placeholder="Select health status"
                className="flex flex-col gap-1.5"
              >
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Health Status
                </Label>
                <Select.Trigger
                  style={fieldInputStyle}
                  className="w-full rounded-xl flex items-center justify-between text-sm"
                >
                  <Select.Value style={{ color: "#3B2418" }} />
                  <Select.Indicator
                    style={{
                      color: "#3B2418",
                      position: "static",
                      display: "inline-flex",
                      alignItems: "center",
                      transform: "none",
                    }}
                  />
                </Select.Trigger>

                <Select.Popover
                  style={{
                    backgroundColor: "#F2E8DA",
                    border: "1px solid rgba(59, 36, 24, 0.2)",
                  }}
                  className="rounded-xl shadow-md p-1"
                >
                  <ListBox>
                    {healthOptions.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                        style={{ color: "#3B2418", padding: "0.5rem 0.75rem" }}
                        className="rounded-lg text-sm cursor-pointer hover:bg-[#F2E8DA]"
                      >
                        {item.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-red-600" />
              </Select>

              <TextField isRequired name="location" className="flex flex-col gap-1.5">
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Location
                </Label>
                <Input
                  placeholder="e.g. New York, NY"
                  style={fieldInputStyle}
                  className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <TextField
                name="adoptionFee"
                type="number"
                defaultValue="0"
                className="flex flex-col gap-1.5"
              >
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Adoption Fee ($) — 0 for free
                </Label>
                <Input
                  min={0}
                  style={fieldInputStyle}
                  className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
                />
              </TextField>

              <TextField
                name="ownerEmail"
                type="email"
                isReadOnly
                value={session?.user?.email || ""}
                className="flex flex-col gap-1.5"
              >
                <Label
                  style={labelStyle}
                  className="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Owner Email
                </Label>
                <Input
                  readOnly
                  style={fieldInputStyle}
                  className="w-full rounded-xl opacity-80 text-sm focus:outline-none"
                />
              </TextField>
            </div>

            <TextField isRequired name="description" className="flex flex-col gap-1.5">
                            <Label
                style={labelStyle}
                className="text-xs font-semibold uppercase tracking-wider opacity-80"
              >
                Description
              </Label>
              <TextArea
                rows={3}
                placeholder="Describe the pet's personality, habits, needs and anything adopters should know..."
                style={fieldInputStyle}
                className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30"
              />
              <FieldError className="text-xs text-red-600" />
            </TextField>

            <div
              style={{ marginTop: "0.75rem" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full"
            >
              <Button
                type="reset"
                variant="secondary"
                style={{
                  backgroundColor: "#F2E8DA",
                  color: "#3B2418",
                  padding: "0.85rem 1.5rem",
                  border: "1px solid rgba(59, 36, 24, 0.25)",
                }}
                className="w-full inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-full hover:opacity-85 transition-opacity cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Form
              </Button>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                style={{
                  backgroundColor: "#8EC5FF",
                  color: "#3B2418",
                  padding: "0.85rem 1.5rem",
                }}
                className="w-full inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                {isSubmitting ? "Publishing..." : "Publish Listing"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}


