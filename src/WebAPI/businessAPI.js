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

const getBusinesses = (queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/businesses?${queryString}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const getBusinessesById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/businesses/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const searchBusiness = (keyword, queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/business/search?keyword=${keyword}${queryString}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const postBusiness = (data) => {
  const { telephone, cellphone, store_name, store_address, remark, price } =
    data;
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("telephone", telephone);
  formData.append("cellphone", cellphone);
  formData.append("store_name", store_name);
  formData.append("store_address", store_address);
  formData.append("remark", remark);
  formData.append("price", price);

  return fetch(`${BASE_URL}/businesses`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

const updateBusiness = (id, updatedData) => {
  const { telephone, cellphone, store_name, store_address, remark, price } =
    updatedData;
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("telephone", telephone);
  formData.append("cellphone", cellphone);
  formData.append("store_name", store_name);
  formData.append("store_address", store_address);
  formData.append("remark", remark);
  formData.append("price", price);
  return fetch(`${BASE_URL}/businesses/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

export {
  getBusinesses,
  getBusinessesById,
  searchBusiness,
  postBusiness,
  updateBusiness,
};
