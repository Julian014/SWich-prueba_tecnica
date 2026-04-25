export const registerRequest = async (email, password) => {
  const res = await fetch("https://soluxinnovations.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    ...data,
  };
};

export const loginRequest = async (email, password) => {
  const res = await fetch("https://soluxinnovations.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    ...data,
  };
};
