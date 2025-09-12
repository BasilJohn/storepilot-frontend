// features/auth/api/product.ts
import productApi from "../../../lib/axios/api";
import { Product, ProductListResponse, ProductMediaWithAsset } from "../types";

// Function to fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await productApi.get<Product[]>("/product/getAllProducts");
  return res.data;
};

// Function to create a new product
export const createProduct = async (data: Omit<Product, "id">) => {
    const response = await productApi.post("/product/createProduct", data);
    return response.data;
};

// Function to delete a product by ID
export const deleteProduct = async (id: string) => {
  const response = await productApi.delete(`/product/deleteProduct/${id}`);
  return response.data;
}

// Function to update a product by ID
export const updateProduct = async (id: string, data: Partial<Product>) => {
  const response = await productApi.put(`/product/updateProduct/${id}`, data);
  return response.data;
};

// Function to fetch a product by ID`
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await productApi.get(`/product/getProductById/${id}`);
  return res.data as Product;
};

export async function createMediaUpload(params: {
  contentType: string;
  ext?: string;
  visibility?: "private" | "public";
  folder?: string;
  originalFileName?: string;
}) {
  const { data } = await productApi.post("/mediaProduct/createMediaUpload", params);
  return data as { uploadUrl: string; media: { id: string } };
}

export async function markMediaUploaded(id: string, size?: number) {
  const { data } = await productApi.post(`/mediaProduct/markMediaUploaded/${id}`, { size });
  return data;
}

// Link a media asset to a product
export async function attachProductMedia(
  productId: string,
  body: { mediaId: string; role?: "main" | "gallery"; sortOrder?: number }
) {
  const { data } = await productApi.post(`/productMedia/attachProductMedia/${productId}/media`, body);
  return data;
}

// Update link row (set main, update sortOrder, change role)
export async function updateProductMedia(
  productId: string,
  mediaId: string,
  body: { role?: "main" | "gallery"; sortOrder?: number; makeMain?: boolean }
) {
  const { data } = await productApi.patch(`/productMedia/updateProductMedia/${productId}/media/${mediaId}`, body);
  return data;
}

export const getProductMedia = async (productId: string): Promise<ProductMediaWithAsset[]> => {
  const { data } = await productApi.get(`/productMedia/getProductMedia/${productId}/media`);
  return data as ProductMediaWithAsset[];
};

// Reorder gallery
export async function reorderProductMedia(productId: string, mediaIds: string[]) {
  const { data } = await productApi.post(`/productMedia/reorderProductMedia/${productId}/media`, {
    mediaIds,
  });
  return data;
}

// (optional) detach a media asset from product
export async function detachProductMedia(productId: string, mediaId: string) {
  const { data } = await productApi.delete(`/productMedia/detachProductMedia/${productId}/media/${mediaId}`);
  return data;
}

// Function to fetch all products
export const getProductsList = async (): Promise<ProductListResponse> => {
  const res = await productApi.get<ProductListResponse>("/productMedia/getProductsList");
  return res.data;
};

