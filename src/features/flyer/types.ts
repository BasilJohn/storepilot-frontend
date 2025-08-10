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

export type CreateFlyerPayload = {
  fileUrl: string;
  status: "draft" | "published" | "archived";
  isActive: boolean;
};
