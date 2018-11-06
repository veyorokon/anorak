async function apiFetch(route, body) {
  console.log(route, body);
  // const response = await fetch(`https://dj.staging.squadup.xyz/api/${route}`, {
  const response = await fetch(`http://localhost:8000/api/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}

const api = {
  setupSubscription(data) {
    return apiFetch('dashboard/web/create_subscriber/', data);
  },
  createSquad(data) {
    return apiFetch('dashboard/web/create_squad/', data);
  },
  getSquadPrice(data) {
    return apiFetch('dashboard/squad/price/', data);
  },
  createUser(data) {
    return apiFetch('users/web/creation/', data);
  }
};

export default api;
