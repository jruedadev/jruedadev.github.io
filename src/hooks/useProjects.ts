import { useQuery } from '@tanstack/react-query';
import { databases, databaseId, projectsCollectionId } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Project {
  $id: string;
  title: string;
  description_es: string;
  description_en: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  image_ids?: string[];
  category_slugs?: string[];
  featured: boolean;
  order: number;
  $createdAt: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        projectsCollectionId,
        [
          Query.orderAsc('order'),
          Query.limit(100),
        ]
      );
      return response.documents as unknown as Project[];
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        databaseId,
        projectsCollectionId,
        [
          Query.equal('featured', true),
          Query.orderAsc('order'),
          Query.limit(10),
        ]
      );
      return response.documents as unknown as Project[];
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ['project', id],
    enabled: !!id,
    queryFn: async () => {
      const response = await databases.getDocument(
        databaseId,
        projectsCollectionId,
        id!
      );
      return response as unknown as Project;
    },
    staleTime: 1000 * 60 * 10,
  });
};