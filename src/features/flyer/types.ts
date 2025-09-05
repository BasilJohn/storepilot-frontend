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