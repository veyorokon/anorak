async function apiFetch(route, body) {
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
  sendCreateSquadRequest(user, form) {
    return apiFetch('dashboard/create_squad/', { user, form });
  },
  requestPhoneVerificationCode(number) {
    return apiFetch('phone_verification_codes/', {
      phone_number: number,
      isRequestingCode: 1,
    });
  },
  sendPhoneVerificationCode(number, code) {
    return apiFetch('phone_verification_codes/', {
      phone_number: number,
      code: code,
      isRequestingCode: 0,
    });
  },
  requestUserDashboard(user) {
    return apiFetch('dashboard/user_dashboard/', {
      user: user,
    });
  },
  sendRegistrationRequest(sessionToken, number) {
    return apiFetch(`users/creation/?session_token=${sessionToken}`, {
      user: {
        phone_number: number,
      },
      session_token: sessionToken,
    });
  },
  sendLogoutRequest(user) {
    return apiFetch('users/logout/', user);
  },
  requestAutoTokenLogin(credentials) {
    return apiFetch('users/token_login/', credentials);
  },
};

export default api;
