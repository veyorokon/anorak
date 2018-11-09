async function apiFetch(route, body, authToken) {
  console.log(route, body);
  // const response = await fetch(`https://dj.staging.squadup.xyz/api/${route}`, {
  const response = await fetch(`http://localhost:8000/api/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${authToken}`
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InZleW9yb2tvbkBnbWFpbC5jb20iLCJleHAiOjE1NDE3MjQzMjUsImVtYWlsIjoidmV5b3Jva29uQGdtYWlsLmNvbSJ9.YxC-imjQ4PFQrjpj61d2Ns4a5kZolU16UfromSG_36U
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
  createUser(data) {
    return apiFetch('users/web/creation/', data);
  },
  getUserDashboard(data, authToken) {
    return apiFetch('users/web/dashboard/', data, authToken);
  }
};

export default api;
