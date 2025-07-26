// features/auth/api/login.ts
import api from "../../../lib/axios";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}
