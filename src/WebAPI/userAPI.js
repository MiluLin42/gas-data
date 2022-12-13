import BASE_URL from "../constants/apiurl";
import { getAuthToken } from "../utils/auth";

export const register = ({ username, password }) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  return fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken() || "";
  return fetch(`${BASE_URL}/users/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updatePassword = (oldPassword, newPassword, confirmPassword) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/password`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
      confirmPassword,
    }),
  }).then((res) => res.json());
};
