// hooks/useGetProductById.ts
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchProductById } from '../api/product';
import { Product } from '../types';

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