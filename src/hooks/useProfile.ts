import { useQuery } from '@tanstack/react-query';
import { databases, databaseId, profileCollectionId } from '@/lib/appwrite';

export interface Profile {
  $id: string;
  name: string;
  title_es: string;
  title_en: string;
  bio_es: string;
  bio_en: string;
  email: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  years_experience: number;
  projects_count: number;
  clients_count: number;
  photo_id?: string;
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        profileCollectionId
      );
      return response.documents[0] as unknown as Profile;
    },
    staleTime: 1000 * 60 * 10, // 10 min cache
  });
};