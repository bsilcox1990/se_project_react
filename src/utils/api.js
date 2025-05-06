export const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export function sendRequest({ url, options }) {
  return fetch(url, options).then(checkResponse);
}

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function getItems() {
  return sendRequest({ url: `${baseUrl}/items`, options: headers });
}

export function addItems(item, token) {
  return sendRequest({
    url: `${baseUrl}/items`,
    options: {
      method: "POST",
      headers: { ...headers, authorization: `Bearer ${token}` },
      body: JSON.stringify(item),
    },
  });
}

export function deleteItem(id, token) {
  return sendRequest({
    url: `${baseUrl}/items/${id}`,
    options: {
      method: "DELETE",
      headers: { ...headers, authorization: `Bearer ${token}` },
    },
  });
}
