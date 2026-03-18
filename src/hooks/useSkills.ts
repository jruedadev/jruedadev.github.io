import { useQuery } from '@tanstack/react-query';
import { databases, databaseId, skillsCollectionId } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Skill {
  $id: string;
  name: string;
  category: 'backend' | 'frontend' | 'tools';
  order: number;
  visible: boolean;
}

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        skillsCollectionId,
        [
          Query.equal('visible', true),
          Query.orderAsc('order'),
          Query.limit(100),
        ]
      );
      return response.documents as unknown as Skill[];
    },
    staleTime: 1000 * 60 * 10,
  });
};