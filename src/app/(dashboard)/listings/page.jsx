"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Label, Modal, TextArea, TextField } from "@heroui/react";
import { Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { getMyListings } from "@/lib/pets/data";
import { deletePet, updatePet } from "@/lib/pets/action";
import RequestsModal from "@/components/RequestsModal";
import Loading from "@/components/Loading";

const fieldInputClass =
  "w-full rounded-xl border border-border bg-field p-2.5 text-sm text-field-foreground focus:outline-none focus:ring-2 focus:ring-focus";

const fieldLabelClass = "text-xs font-semibold text-foreground/80";

export default function ListingPage() {
  const { data: session } = useSession();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [deletingPet, setDeletingPet] = useState(null);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;

    const loadListings = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const data = await getMyListings(email, tokenData?.token);
        setPets(data.pets || []);
      } catch (err) {
        toast.error(err.message || "Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [session?.user?.email]);

  const totalCount = pets.length;
  const availableCount = pets.filter((p) => p.status !== "Adopted").length;
  const adoptedCount = pets.filter((p) => p.status === "Adopted").length;

  const handleApproved = (petId) => {
    setPets((prev) =>
      prev.map((p) => (p._id === petId ? { ...p, status: "Adopted" } : p))
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingPet) return;

    try {
      const { data: tokenData } = await authClient.token();
      await updatePet(editingPet._id, editingPet, tokenData?.token);
      setPets((prev) =>
        prev.map((p) => (p._id === editingPet._id ? editingPet : p))
      );
      toast.success("Pet updated!");
      setEditingPet(null);
    } catch (err) {
      toast.error(err.message || "Failed to update pet");
    }
  };

  const handleDelete = async () => {
    if (!deletingPet) return;

    try {
      const { data: tokenData } = await authClient.token();
      await deletePet(deletingPet._id, tokenData?.token);
      setPets((prev) => prev.filter((p) => p._id !== deletingPet._id));
      toast.success("Pet deleted");
      setDeletingPet(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete pet");
    }
  };

  return (
    <section className="min-h-screen w-full bg-background px-6 pb-16 pt-10 text-foreground">
      <div className="mx-auto max-w-[1000px]">
        <h1 className="mb-6 font-serif text-3xl font-bold">My Listings</h1>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-surface p-4 text-center">
            <p className="text-xs text-surface-foreground/70">Total Listings</p>
            <p className="font-serif text-2xl font-bold text-surface-foreground">
              {totalCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4 text-center">
            <p className="text-xs text-surface-foreground/70">Available</p>
            <p className="font-serif text-2xl font-bold text-surface-foreground">
              {availableCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4 text-center">
            <p className="text-xs text-surface-foreground/70">Adopted</p>
            <p className="font-serif text-2xl font-bold text-surface-foreground">
              {adoptedCount}
            </p>
          </div>
        </div>

        {loading ? (
          <Loading fullScreen={false} />
        ) : pets.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-8 text-center">
            <p className="mb-4 text-sm text-surface-foreground/85">
              You haven&apos;t listed any pets yet.
            </p>
            <Link
              href="/add-pet"
              className="inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              Add a Pet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-background">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="truncate font-serif text-xl font-bold text-surface-foreground">
                        {pet.name}
                      </h2>
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                        {pet.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-surface-foreground">
                      ${pet.fee}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-separator pt-2">
                  <Button
                    size="sm"
                    onPress={() => setSelectedPetId(pet._id)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground"
                  >
                    <FileText className="size-3.5" />
                    Requests
                  </Button>

                  <Button
                    size="sm"
                    onPress={() => setEditingPet({ ...pet })}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Button>

                  <Link
                    href={`/pets/${pet._id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground"
                  >
                    <Eye className="size-3.5" />
                    View
                  </Link>

                  <Button
                    size="sm"
                    onPress={() => setDeletingPet(pet)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-danger/15 px-3.5 py-1.5 text-xs font-semibold text-danger"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <RequestsModal
        petId={selectedPetId}
        open={Boolean(selectedPetId)}
        onClose={() => setSelectedPetId(null)}
        onApproved={handleApproved}
      />

      <Modal
        isOpen={Boolean(editingPet)}
        onOpenChange={(open) => !open && setEditingPet(null)}
      >
        <Modal.Backdrop className="bg-brown/45 backdrop-blur-sm">
          <Modal.Container>
            <Modal.Dialog className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-overlay p-6 text-overlay-foreground">
              <Modal.CloseTrigger className="cursor-pointer rounded-full border border-border bg-background p-1.5 text-foreground transition-opacity hover:opacity-80" />
              <Modal.Header>
                <Modal.Heading className="font-serif text-xl font-bold text-foreground">
                  Edit Pet
                </Modal.Heading>
              </Modal.Header>

              {editingPet && (
                <form onSubmit={handleUpdate} className="mt-3 flex flex-col gap-3">
                  <TextField isRequired>
                    <Label className={fieldLabelClass}>Pet Name</Label>
                    <Input
                      value={editingPet.name || ""}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, name: e.target.value })
                      }
                      className={fieldInputClass}
                    />
                  </TextField>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Species</Label>
                      <Input
                        value={editingPet.species || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, species: e.target.value })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Breed</Label>
                      <Input
                        value={editingPet.breed || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, breed: e.target.value })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Age</Label>
                      <Input
                        type="number"
                        value={editingPet.age ?? 0}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, age: Number(e.target.value) })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Gender</Label>
                      <Input
                        value={editingPet.gender || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, gender: e.target.value })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                  </div>

                  <TextField isRequired>
                    <Label className={fieldLabelClass}>Image URL</Label>
                    <Input
                      value={editingPet.image || ""}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, image: e.target.value })
                      }
                      className={fieldInputClass}
                    />
                  </TextField>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Health Status</Label>
                      <Input
                        value={editingPet.healthStatus || ""}
                        onChange={(e) =>
                          setEditingPet({
                            ...editingPet,
                            healthStatus: e.target.value,
                          })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Vaccination</Label>
                      <Input
                        value={editingPet.vaccinationStatus || ""}
                        onChange={(e) =>
                          setEditingPet({
                            ...editingPet,
                            vaccinationStatus: e.target.value,
                          })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Location</Label>
                      <Input
                        value={editingPet.location || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, location: e.target.value })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className={fieldLabelClass}>Adoption Fee ($)</Label>
                      <Input
                        type="number"
                        value={editingPet.fee ?? 0}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, fee: Number(e.target.value) })
                        }
                        className={fieldInputClass}
                      />
                    </TextField>
                  </div>

                  <TextField isRequired>
                    <Label className={fieldLabelClass}>Description</Label>
                    <TextArea
                      rows={3}
                      value={editingPet.bio || ""}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, bio: e.target.value })
                      }
                      className={fieldInputClass}
                    />
                  </TextField>

                  <Button
                    type="submit"
                    className="mt-2 w-full cursor-pointer rounded-full bg-accent py-2.5 font-semibold text-accent-foreground"
                  >
                    Save Changes
                  </Button>
                </form>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal
        isOpen={Boolean(deletingPet)}
        onOpenChange={(open) => !open && setDeletingPet(null)}
      >
        <Modal.Backdrop className="bg-brown/45 backdrop-blur-sm">
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-sm rounded-3xl border border-border bg-overlay p-6 text-overlay-foreground">
              <Modal.CloseTrigger className="cursor-pointer rounded-full border border-border bg-background p-1.5 text-foreground transition-opacity hover:opacity-80" />
              <Modal.Header>
                <Modal.Heading className="font-serif text-xl font-bold text-foreground">
                  Delete {deletingPet?.name}?
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="mt-2 text-sm text-overlay-foreground/85">
                Are you sure you want to delete this pet listing? This cannot be undone.
              </Modal.Body>
              <Modal.Footer className="mt-4 flex gap-2">
                <Button
                  onPress={() => setDeletingPet(null)}
                  className="flex-1 cursor-pointer rounded-full border border-border bg-background py-2 font-semibold text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleDelete}
                  className="flex-1 cursor-pointer rounded-full bg-danger py-2 font-semibold text-danger-foreground"
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </section>
  );
}