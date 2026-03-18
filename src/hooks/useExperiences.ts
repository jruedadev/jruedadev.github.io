import { useQuery } from '@tanstack/react-query';
import { databases, databaseId, experiencesCollectionId } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Experience {
  $id: string;
  company: string;
  position_es: string;
  position_en: string;
  description_es: string;
  description_en: string;
  technologies: string[];
  company_url?: string;
  start_date: string;
  end_date?: string;
  order: number;
}

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        experiencesCollectionId,
        [
          Query.orderAsc('order'),
          Query.limit(20),
        ]
      );
      return response.documents as unknown as Experience[];
    },
    staleTime: 1000 * 60 * 10,
  });
};