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
