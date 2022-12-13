import BASE_URL from "../constants/apiurl";
import { getAuthToken } from "../utils/auth";

const getQueryString = (queryParameters) => {
  const { page, sort, order, limit } = queryParameters || {};
  let queryString = "";
  if (page) queryString += `&page=${page}`;
  if (sort) queryString += `&sort=${sort}`;
  if (order) queryString += `&order=${order}`;
  if (limit) queryString += `&limit=${limit}`;
  return queryString;
};

const getMembers = (queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/members?${queryString}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const getMembersById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/members/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const searchMember = (keyword, queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/member/search?keyword=${keyword}${queryString}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const postMember = (data) => {
  const { telephone, cellphone, address, remark, frequency, isRequest } = data;
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("telephone", telephone);
  formData.append("cellphone", cellphone);
  formData.append("address", address);
  formData.append("remark", remark);
  formData.append("frequency", frequency);
  formData.append("isRequest", isRequest);

  return fetch(`${BASE_URL}/members`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

const updateMember = (id, updatedData) => {
  const { telephone, cellphone, address, remark, frequency, isRequest } =
    updatedData;
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("telephone", telephone);
  formData.append("cellphone", cellphone);
  formData.append("address", address);
  formData.append("remark", remark);
  formData.append("frequency", frequency);
  formData.append("isRequest", isRequest);
  return fetch(`${BASE_URL}/members/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

export { getMembers, getMembersById, searchMember, postMember, updateMember };
