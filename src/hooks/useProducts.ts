import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { databases, databaseId, collectionId } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface Product {
  $id: string;
  name: string;
  slug: string;
  type: string;
  featured: boolean;
  image_url?: string;
  description?: string;
  category: {
    $id: string;
    slug?: string;
    name: string;
    description: string;
  };
  $createdAt: string;
  $updatedAt: string;
}

// Función helper para shuffle usando Fisher-Yates
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useFeaturedProducts = (limit: number = 4) => {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.equal('featured', true),
          Query.limit(500), // Obtener todos los destacados
          Query.select(['*', 'category.*']),
        ] as any
      );
      // Shuffle y retornar solo los del límite
      const shuffled = shuffleArray(response.documents as any as Product[]);
      return shuffled.slice(0, limit);
    },
  });
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.limit(100),
          Query.select(['*', 'category.*']),
        ] as any
      );
      return response.documents as any as Product[];
    },
  });
};

export const useInfiniteProducts = (pageSize: number = 12) => {
  return useInfiniteQuery({
    queryKey: ['infiniteProducts'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.offset(pageParam),
          Query.limit(pageSize),
          Query.select(['*', 'category.*']),
        ] as any
      );
      return {
        documents: response.documents as any as Product[],
        total: response.total,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      const currentOffset = pages.length * pageSize;
      return currentOffset < lastPage.total ? currentOffset : undefined;
    },
    initialPageParam: 0,
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['product', slug],
    enabled: !!slug,
    queryFn: async () => {
      if (!slug) throw new Error('slug is required');
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.equal('slug', slug),
          Query.select(['*', 'category.*']),
        ] as any
      );
      if (response.documents.length === 0) throw new Error('Product not found');
      return response.documents[0] as any as Product;
    },
  });
};