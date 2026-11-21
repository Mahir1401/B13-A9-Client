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
    <section
      style={{
        padding: "2.5rem 1.5rem 4rem",
        backgroundColor: "#F2E8DA",
        color: "#3B2418",
      }}
      className="min-h-screen w-full"
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 className="font-[Fraunces] text-3xl font-bold mb-6">
          My Listings
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#F9F4ED] border border-[#3B2418]/15 text-center">
            <p className="text-xs opacity-70">Total Listings</p>
            <p className="font-[Fraunces] text-2xl font-bold">{totalCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F9F4ED] border border-[#3B2418]/15 text-center">
            <p className="text-xs opacity-70">Available</p>
            <p className="font-[Fraunces] text-2xl font-bold">{availableCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F9F4ED] border border-[#3B2418]/15 text-center">
            <p className="text-xs opacity-70">Adopted</p>
            <p className="font-[Fraunces] text-2xl font-bold">{adoptedCount}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm">Loading your listings...</p>
        ) : pets.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#F9F4ED] border border-[#3B2418]/15 text-center">
            <p className="text-sm mb-4">You haven&apos;t listed any pets yet.</p>
            <Link
              href="/add-pet"
              className="inline-block px-5 py-2.5 rounded-full bg-[#8EC5FF] text-[#3B2418] text-sm font-semibold"
            >
              Add a Pet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="p-5 rounded-3xl bg-[#F9F4ED] border border-[#3B2418]/15 flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#F2E8DA] shrink-0">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      sizes="80px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-[Fraunces] text-xl font-bold truncate">
                        {pet.name}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8EC5FF] text-[#3B2418]">
                        {pet.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mt-1">${pet.fee}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#3B2418]/10">
                  <Button
                    size="sm"
                    onPress={() => setSelectedPetId(pet._id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8EC5FF] text-[#3B2418] text-xs font-semibold cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Requests
                  </Button>

                  <Button
                    size="sm"
                    onPress={() => setEditingPet({ ...pet })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2E8DA] text-[#3B2418] text-xs font-semibold cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Button>

                  <Link
                    href={`/pets/${pet._id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2E8DA] text-[#3B2418] text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>

                  <Button
                    size="sm"
                    onPress={() => setDeletingPet(pet)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-lg w-full p-6 rounded-3xl bg-[#F9F4ED] text-[#3B2418] max-h-[90vh] overflow-y-auto">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold font-[Fraunces]">
                  Edit Pet
                </Modal.Heading>
              </Modal.Header>

              {editingPet && (
                <form onSubmit={handleUpdate} className="flex flex-col gap-3 mt-3">
                  <TextField isRequired>
                    <Label className="text-xs font-semibold">Pet Name</Label>
                    <Input
                      value={editingPet.name || ""}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, name: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                    />
                  </TextField>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Species</Label>
                      <Input
                        value={editingPet.species || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, species: e.target.value })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Breed</Label>
                      <Input
                                                value={editingPet.breed || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, breed: e.target.value })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Age</Label>
                      <Input
                        type="number"
                        value={editingPet.age ?? 0}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, age: Number(e.target.value) })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Gender</Label>
                      <Input
                        value={editingPet.gender || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, gender: e.target.value })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                  </div>

                  <TextField isRequired>
                    <Label className="text-xs font-semibold">Image URL</Label>
                    <Input
                      value={editingPet.image || ""}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, image: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                    />
                  </TextField>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Health Status</Label>
                      <Input
                        value={editingPet.healthStatus || ""}
                        onChange={(e) =>
                          setEditingPet({
                            ...editingPet,
                            healthStatus: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Vaccination</Label>
                      <Input
                        value={editingPet.vaccinationStatus || ""}
                        onChange={(e) =>
                          setEditingPet({
                            ...editingPet,
                            vaccinationStatus: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Location</Label>
                      <Input
                        value={editingPet.location || ""}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, location: e.target.value })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                    <TextField isRequired>
                      <Label className="text-xs font-semibold">Adoption Fee ($)</Label>
                      <Input
                        type="number"
                        value={editingPet.fee ?? 0}
                        onChange={(e) =>
                          setEditingPet({ ...editingPet, fee: Number(e.target.value) })
                        }
                        className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                      />
                    </TextField>
                  </div>

                  <TextField isRequired>
                    <Label className="text-xs font-semibold">Description</Label>
                    <TextArea
                      rows={3}
                      value={editingPet.bio || ""}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, bio: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#F2E8DA] text-sm"
                    />
                  </TextField>

                  <Button
                    type="submit"
                    className="w-full mt-2 rounded-full bg-[#8EC5FF] text-[#3B2418] font-semibold cursor-pointer"
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
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-sm w-full p-6 rounded-3xl bg-[#F9F4ED] text-[#3B2418]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold font-[Fraunces]">
                  Delete {deletingPet?.name}?
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="text-sm mt-2">
                Are you sure you want to delete this pet listing? This cannot be undone.
              </Modal.Body>
              <Modal.Footer className="flex gap-2 mt-4">
                <Button
                  onPress={() => setDeletingPet(null)}
                  className="flex-1 rounded-full bg-[#F2E8DA] text-[#3B2418] font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleDelete}
                  className="flex-1 rounded-full bg-red-600 text-white font-semibold cursor-pointer"
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
