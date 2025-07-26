import axios from "axios";

const productApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL,
  withCredentials: true,
});

export default productApi;