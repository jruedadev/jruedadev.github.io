import { useQuery } from '@tanstack/react-query';
import { databases, databaseId, certificationsCollectionId } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Certification {
  $id: string;
  title_es: string;
  title_en: string;
  issuer: string;
  year: number;
  credential_url?: string;
  image_id?: string;
  order: number;
}

export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        certificationsCollectionId,
        [
          Query.orderAsc('order'),
          Query.limit(50),
        ]
      );
      return response.documents as unknown as Certification[];
    },
    staleTime: 1000 * 60 * 10,
  });
};