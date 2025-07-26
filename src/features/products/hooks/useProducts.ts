// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product";
import { Product } from "../types";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};