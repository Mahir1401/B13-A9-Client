const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createPet = async (petData, token) => {
  const res = await fetch(`${API_URL}/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add pet');
  return data;
};

export const updatePet = async (id, petData, token) => {
  const res = await fetch(`${API_URL}/pets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update pet');
  return data;
};

export const deletePet = async (id, token) => {
  const res = await fetch(`${API_URL}/pets/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete pet');
  return data;
};

export const submitAdoptionRequest = async (requestData, token) => {
  const res = await fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit adoption request');
  return data;
};

export const cancelAdoptionRequest = async (id, token) => {
  const res = await fetch(`${API_URL}/requests/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to cancel request');
  return data;
};

export const updateRequestStatus = async (id, status, token) => {
  const res = await fetch(`${API_URL}/requests/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update request status');
  return data;
};
