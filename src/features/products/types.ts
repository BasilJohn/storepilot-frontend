// src/features/products/types.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  unit?: string;
  status?: "in_stock" | "out_of_stock";
}

export interface ProductListResponse {
  items: Product[];
  totalCount: number;
  page: number;
  total: number;
  totalPages: number;
}

export type SaveOrUpdateProductInput = {
  file: File;
  productId?: string; // for update
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  unit: string;
  status?: "in_stock" | "out_of_stock";
};


export type MediaAsset = {
  id: string;
  bucket: string;
  objectKey: string;
  fileName?: string | null;
  mimeType: string;
  size?: number | null;
  visibility: "private" | "public";
  status: "pending" | "uploaded" | "deleted";
  publicUrl?: string | null;
  url?: string | null;       // enriched for frontend (presigned/public)
  createdAt: string;
  updatedAt: string;
};

export type ProductMediaWithAsset = {
  id: string;
  productId: string;
  mediaId: string;
  role: "main" | "gallery";
  sortOrder: number;
  media: MediaAsset | null;
};