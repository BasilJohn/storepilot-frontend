// src/features/products/types.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  unit?: string;
  description?: string;
  imageUrl?: string;
  status?: "in_stock" | "out_of_stock";
}