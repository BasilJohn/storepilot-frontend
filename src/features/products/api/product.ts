// features/auth/api/product.ts
import productApi from "../../../lib/axios/product";
import { Product } from "../types";

// Function to fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await productApi.get("/product/getAllProducts");
  return res.data as Product[];
};

// Function to create a new product
export const createProduct = async (data: Omit<Product, "id">) => {
  const res = await productApi.post("/product/createProduct", data);
  return res.data;
};
