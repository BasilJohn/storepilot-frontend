import axios from "axios";

const orderApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ORDER_SERVICE_URL,
  withCredentials: true,
});

export default orderApi;