import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
  withCredentials: true,
});

export default authApi;