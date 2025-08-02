// useUpdateProduct.ts
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { updateProduct } from '../api/product';
import { Product } from '../types';

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