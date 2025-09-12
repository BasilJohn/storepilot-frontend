// src/hooks/useProducts.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, createProduct, fetchProductById, updateProduct, deleteProduct, createMediaUpload, markMediaUploaded, attachProductMedia,getProductMedia } from "../api/product";
import { Product, ProductMediaWithAsset, SaveOrUpdateProductInput } from "../types";

export const PRODUCT_KEYS = {
  status: ["product", "status"] as const,
  products: ["product"] as const,
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

// Hook to create a new product
export const useCreateProduct = () => {
  const toast = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createProduct,
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

export const useGetProductById = () => {
  const router = useRouter();
  const { id } = router.query;

  const isValidId = typeof id === 'string' && id.length > 0;

  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id as string),
    enabled: isValidId, // prevents running until id is ready
    retry: 1,
  });
};

export const useUpdateProduct = () => {
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Product>;
    }) => await updateProduct(id, data),
    onSuccess: () => {

      toast({
        title: 'Product updated',
        description: 'The product was successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/products');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to update product.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
};

// Hook to delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

export function useSaveProduct() {
  const toast = useToast();
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    // 👇 the whole upload + create/update pipeline
    mutationFn: async (input: SaveOrUpdateProductInput) => {
      const { file , productId, name, description, price, status, imageUrl, unit } = input;
      
      let product;
      // 1) Create or update the product
      if (productId) {
        product = await updateProduct(productId, {
          id: productId,
          name: name,
          price: price,
          unit: unit,
          description: description,
          imageUrl: imageUrl,
          status: status,
        });
      } else {
        product = await createProduct({
          name: name,
          price: price,
          unit: unit,
          description: description,
          imageUrl: imageUrl,
          status: status,
        });
      }
      
      // 2) Ask backend for presigned PUT
      const ext = (file.name.match(/\.\w+$/)?.[0] || "").toLowerCase();
      const visibility = "private"; // or set to the appropriate value required by your backend
      const { uploadUrl, media } = await createMediaUpload({
        contentType: file.type,
        ext,
        visibility,
        folder: "products",
        originalFileName: file.name,
      });

      // 3) Upload binary directly to S3/MinIO (IMPORTANT: use fetch with Content-Type)
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) {
        const text = await putRes.text().catch(() => "");
        throw new Error(`Upload failed (${putRes.status}) ${text}`);
      }

      //4) (optional) mark media uploaded with size
      await markMediaUploaded(media.id, file.size);

      //5) Link media to product as main image
      await attachProductMedia(product.id, { mediaId: media.id, role: "main" });
    },

    onSuccess: (_data, variables) => {
      toast({
        title: variables.productId ? "Product updated" : "Product created",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      // refresh lists that show products
      qc.invalidateQueries({ queryKey: PRODUCT_KEYS.products });
      router.push("/products");
    },

    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save flyer";
      toast({ title: "Error", description: msg, status: "error", duration: 3500, isClosable: true });
    },
  });
}

export function useProductMedia(productId: string) {
  return useQuery<ProductMediaWithAsset[]>({
    queryKey: ["product", productId, "media"],
    queryFn: () => getProductMedia(productId),
  });
}