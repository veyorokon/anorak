async function apiFetch(route, body, authToken) {
  console.log(route, body);
  // const response = await fetch(`https://dj.staging.squadup.xyz/api/${route}`, {
  const response = await fetch(`http://localhost:8000/api/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${authToken}`
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

  createFacebookUser(data) {
    return apiFetch('users/web/facebook/auth/', data);
  },
  getUserDashboard(data, authToken) {
    return apiFetch('users/web/dashboard/', data, authToken);
  }
};

export default api;
