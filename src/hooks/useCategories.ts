import { useQuery } from '@tanstack/react-query';
import { databases, databaseId } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Category {
  $id: string;
  name_es: string;
  name_en: string;
  slug: string;
  image_id?: string;
  order: number;
}

const categoriesCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_CATEGORIES;

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        categoriesCollectionId,
        [Query.orderAsc('order')]
      );
      return response.documents as unknown as Category[];
    },
    staleTime: 1000 * 60 * 10,
  });
};

// Helper para obtener el nombre traducido de una categoría por slug
export const getCategoryName = (
  slug: string,
  categories: Category[],
  locale: string
): string => {
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return slug;
  return locale === 'es' ? cat.name_es : cat.name_en;
};