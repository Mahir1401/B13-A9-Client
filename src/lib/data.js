export const getAllPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`);
  const data = await res.json();
  return data;
};

export const getPetById = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`);
  const data = await res.json();
  return data;
}