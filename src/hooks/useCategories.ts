import { useQuery } from '@tanstack/react-query';
import { databases, databaseId } from '@/lib/appwrite';

interface Category {
  $id: string;
  slug?: string;
  name: string;
  description: string;
  $createdAt: string;
  $updatedAt: string;
}

const categoriesCollectionId = 'categories'; // Ajustar según tu colección

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        categoriesCollectionId,
        [] as any
      );
      return response.documents as any as Category[];
    },
  });
};