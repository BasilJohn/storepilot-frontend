export type FlyerStatus = "draft" | "published" | "archived";

export type UploadFlyerResponse = {
  id: string;
  url: string;
  active: boolean;
  size: number;
  mimetype: string;
};

export interface Flyer {
  id?: string;
  fileName: string;
  fileUrl: string;
  mimeType?: string;
  size?: number;
  isActive: boolean;
  status: FlyerStatus;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface SaveFlyerInput {
  file: File;
  title: string;
  weekLabel?: string;
  startsAt?: string | Date;
  endsAt?: string | Date;
  visibility?: "private" | "public";
};

export type SaveOrUpdateInput =
  | (SaveFlyerInput & { flyerId?: undefined })   // create
  | (SaveFlyerInput & { flyerId: string });      // update


export type FlyerWithUrl = {
  id: string;
  title: string;
  weekLabel?: string | null;
  status: "draft" | "published" | "archived";
  startsAt?: string | null;   // ISO string
  endsAt?: string | null;     // ISO string
  createdAt: string;
  updatedAt: string;

  media: {
    id: string;
    mimeType: string;
    size?: number | null;
    url: string;              // ✅ always present, signed URL or public URL
  } | null;
};  