import axios from "axios";

const flyerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLYER_SERVICE_URL,
  withCredentials: true,
});

export default flyerApi;