async function apiFetch(route, body) {
    console.log(route, body)
  const response = await fetch(`http://127.0.0.1:8000/api/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}

const api = {
  setupSubscription(data) {
    return apiFetch('dashboard/create_web_subscriber/', { data });
  },
  createSquad(data) {
    return apiFetch('dashboard/create_web_squad/', { data });
  },
};

export default api;
