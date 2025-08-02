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