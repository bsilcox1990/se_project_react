import { baseUrl, sendRequest } from "./api";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const signUp = (name, avatar, email, password) => {
  return sendRequest({
    url: `${baseUrl}/signup`,
    options: {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ name, avatar, email, password }),
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
