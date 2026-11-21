const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllPets = async ({ search = '', species = '', sort = '' } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (species && species !== 'All') params.append('species', species);
  if (sort) params.append('sort', sort);

  const queryString = params.toString();
  const url = queryString ? `${API_URL}/pets?${queryString}` : `${API_URL}/pets`;

  const res = await fetch(url, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
};

export const getPetById = async (id, token) => {
  const res = await fetch(`${API_URL}/pets/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch pet details');
  return res.json();
};

export const getMyListings = async (email, token) => {
  const res = await fetch(`${API_URL}/my-listings/${email}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch your pet listings');
  return res.json();
};

export const getMyRequests = async (email, token) => {
  const res = await fetch(`${API_URL}/my-requests/${email}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch your adoption requests');
  return res.json();
};

export const getPetRequests = async (petId, token) => {
  const res = await fetch(`${API_URL}/pet-requests/${petId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch requests for this pet');
  return res.json();
};
