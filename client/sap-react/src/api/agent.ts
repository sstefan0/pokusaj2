import axios, { AxiosResponse } from "axios";
import { store } from "../store/configureStore";
axios.defaults.baseURL = "http://localhost:5133/api/";
const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
const Auth = {
  login: (values: any) => request.post("Account/login", values),
  register: (values: any) => request.post("Account/register", values),
  currentUser: () => request.get("Account/currentUser"),
};
const Products = {
  getAllProducts: () => request.get("Products/getProducts"),
  addProduct: (values: any) => request.post("Products/addProduct", values),
  getProductById: (id: number) => request.get(`Products/getProductById/${id}`),
  deleteProductById: (id: number) =>
    request.delete(`Products/deleteProductById/${id}`),
};
const agent = {
  Auth,
  Products,
};
export default agent;
