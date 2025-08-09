import flyerApi from "../../../lib/axios/product";
import { UploadFlyerResponse, FlyerStatus } from "../types";

export async function getFlyerStatus(): Promise<FlyerStatus> {
  const { data } = await flyerApi.get<FlyerStatus>("/flyers/status");
  return data;
}

export async function uploadFlyer(file: File): Promise<UploadFlyerResponse> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await flyerApi.post<UploadFlyerResponse>("/flyers", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
}