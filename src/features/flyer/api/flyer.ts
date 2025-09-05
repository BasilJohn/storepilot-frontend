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

export async function createMediaUpload(params: {
  contentType: string;
  ext?: string;
  visibility?: "private" | "public";
  folder?: string;
  originalFileName?: string;
}) {
  const { data } = await flyerApi.post("/media/createMediaUpload", params);
  return data as { uploadUrl: string; media: { id: string } };
}

export async function markMediaUploaded(id: string, size?: number) {
  const { data } = await flyerApi.post(`/media/markMediaUploaded/${id}`, { size });
  return data;
}


export async function createFlyer(body: {
  title: string;
  mediaId: string;
  weekLabel?: string;
  startsAt?: string | Date;
  endsAt?: string | Date;
  status?: "pending" | "published" | "archived";
}) {
  const { data } = await flyerApi.post("/flyer/createFlyer", body);
  return data;
}

export async function updateFlyer(
  flyerId: string,
  body: Partial<{
    title: string;
    mediaId: string;
    weekLabel?: string;
    startsAt?: string | Date;
    endsAt?: string | Date;
    status?: "pending" | "published" | "archived";
  }>
) {
  const { data } = await flyerApi.put(`/flyer/updateFlyer/${flyerId}`, body);
  return data;
}

