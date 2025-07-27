// hooks/useCreateProduct.ts
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import productApi from "../../../lib/axios/product";
import { Product } from "../types";

export const useCreateProduct = () => {
  const toast = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Omit<Product, "id">) => {
      const response = await productApi.post("/product/createProduct", data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Product added",
        description: "The product was successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/products");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to create product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return mutation;
};
