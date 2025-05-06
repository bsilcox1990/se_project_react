import { baseUrl, sendRequest } from "./api";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const signUp = (userData) => {
  return sendRequest({
    url: `${baseUrl}/signup`,
    options: {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    },
  });
};

export const signIn = (email, password) => {
  return sendRequest({
    url: `${baseUrl}/signin`,
    options: {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email, password }),
    },
  });
};

export const getUserInfo = (token) => {
  return sendRequest({
    url: `${baseUrl}/users/me`,
    options: {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    },
  });
};
