export const getAllPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`);
  const data = await res.json();
  return data;
};

export const getPetById = async (id,token) => {
  console.log(token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`,{
    headers:{
      authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  return data;
}