export type FlyerStatus = { active: boolean; url?: string | null; lastUpdatedAt?: string | null };

export type UploadFlyerResponse = {
  id: string;
  url: string;
  active: boolean;
  size: number;
  mimetype: string;
};