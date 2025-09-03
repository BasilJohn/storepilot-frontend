import flyerApi from "../../../lib/axios/api";
import { FlyerStatus, Flyer } from "../types";

export const getAllFlyers = async (): Promise<Flyer[]> => {
  const res = await flyerApi.get<Flyer[]>("/flyer/getAllFlyers");
  return res.data;
};

export const getFlyerStatus = async (): Promise<FlyerStatus> => {
  const { data } = await flyerApi.get<FlyerStatus>("/flyer/status");
  return data;
};

export const createFlyer = async (data: Omit<Flyer, "id">) => {
  const response = await flyerApi.post("/flyer/createFlyer", data);
  return response.data;
};

export const updateFlyer = async (id: string, data: Partial<Flyer>) => {
  const response = await flyerApi.put(`/flyer/updateFlyer/${id}`, data);
  return response.data;
};
