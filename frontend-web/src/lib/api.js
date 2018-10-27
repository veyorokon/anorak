async function apiFetch(route, body) {
    console.log(route, body)
  const response = await fetch(`https://staging.squadup.xyz/api/${route}`, {
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
};

export default api;
