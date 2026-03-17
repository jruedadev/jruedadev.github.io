import { useQuery } from '@tanstack/react-query';
import { databases, databaseId, sectionsCollectionId } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface Section {
  $id: string;
  page_slug: string;
  key: string;
  title?: string;
  subtitle?: string;
  body?: string;
  media_url?: string;
  order?: number;
  locale?: string;
  paragraphs?: string[];
}

export const useSections = (pageSlug: string = 'index') => {
  return useQuery({
    queryKey: ['sections', pageSlug],
    queryFn: async () => {
      const response = await databases.listDocuments(databaseId, sectionsCollectionId, [
        Query.equal('page_slug', pageSlug),
        Query.limit(100),
      ] as any);
      return (response.documents as any as Section[]).sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
    },
  });
};

export default useSections;
